// Author: Manzai-1
// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.28;

contract ArcanePact {
    uint256 private nextId;
    bool private locked;

    enum CampaignState {
        Initialized,
        Running,
        Completed
    }
    enum PlayerState {
        None,
        Applied,
        Rejected,
        AwaitingSignature,
        Signed
    }
    enum ApplicationDecision {
        Approved,
        Rejected
    }
    enum VoteType {
        StartCampaign,
        StopCampaign
    }
    enum ReviewScore {
        Positive,
        Negative
    }

    struct ApplicationReview {
        address applicant;
        ApplicationDecision decision;
    }
    struct Player {
        PlayerState state;
        uint256 lockedCollateral;
    }
    struct Campaign {
        address owner;
        CampaignState state;
        bool inviteOnly;
        uint256 collateral;
        uint256 gamemasterFee;
        uint256 lockedFees;
        uint256 participantCount;
    }
    struct NewCampaignConfig {
        string title;
        string description;
        bool inviteOnly;
        uint256 gamemasterFee;
        uint256 collateral;
    }
    struct Review {
        ReviewScore score;
        string comment;
    }

    event CampaignCreated(
        uint256 indexed campaignId, 
        address indexed owner, 
        CampaignState indexed campaignState, 
        uint256 participantCount,
        NewCampaignConfig config
    );
    
    event UpdatedCampaignPlayer(
        uint256 indexed campaignId,
        address indexed player,
        PlayerState indexed playerState
    );

    event CampaignParticipantCountChanged(
        uint256 indexed campaignId,
        uint256 participantCount
    );

    event PlayerLockedCollateral(
        uint256 indexed campaignId,
        address indexed player,
        uint256 collateral
    );

    event UpdatedLockedFees(
        uint256 indexed campaignId,
        uint256 totalLockedFees
    );

    event NewVoteAdded(
        uint256 indexed campaignId,
        VoteType voteType,
        address player
    );

    // not added to subgraph.yaml yet
    event UpdatedCampaignState(
        uint256 indexed campaignId,
        CampaignState campaignState
    );

    event LockedFeesWithdrawn(
        uint256 indexed campaignId,
        uint256 withdrawnAmount,
        uint256 currentlyLockedAmount
    );

    event LockedCollateralWithdrawn(
        uint256 indexed campaignId,
        uint256 withdrawnAmount,
        uint256 currentlyLockedAmount
    );

    event ReviewAdded(
        uint256 indexed campaignId,
        address indexed recipient,
        address indexed sender,
        Review review
    );

    error FunctionNotFound();
    error PaymentDataMissing();
    error NotOwner(address caller);
    error CampaignLocked(uint256 campaignId);
    error CampaignDoesNotExist(uint256 campaignId);
    error PlayerExistsInCampaign(uint256 campaignId, address player);
    error CampaignIsInviteOnly(uint256 campaignId);
    error ApplicantDoesNotExist(uint256 campaignId, address applicant);
    error ApplicantAlreadyRejected(uint256 campaignId, address applicant);
    error ApplicantAlreadyApproved(uint256 campaignId, address applicant);
    error PlayerNotAwaitingSignature(uint256 campaignId, address player);
    error PlayerHasNotSigned(uint256 campaignId, address player);
    error IncorrectTransactionValue(uint256 gamemasterFee, uint256 collateral, uint256 received);
    error HasAlreadyVoted(uint256 campaignId, address player, VoteType voteType);
    error CampaignNotCompleted(uint256 campaignId);
    error HasNoLockedFees(uint256 campaignId);
    error BlockedDueToReEntrancy(uint256 campaignId, address caller);
    error TransferFailed(uint256 amount, address recipient);
    error HasNoLockedCollateral(uint256 campaignId, address player);
    error AlreadyReviewed(uint256 campaignId, address receiver, address caller);
    error CannotReviewSelf();

    mapping(uint256 => Campaign) internal campaigns;
    mapping(uint256 => mapping(address => Player)) internal campaignPlayers;
    mapping(uint256 => mapping(VoteType => uint256)) internal campaignVoteCount; 
    mapping(uint256 => mapping(VoteType => mapping(address => bool))) internal campaignHasVoted;
    mapping(uint256 => mapping(address => mapping(address => bool))) internal playerHasReviewed;

    constructor () {
        nextId = 1;
    }

    fallback() external payable {
        revert FunctionNotFound();
    }

    receive() external payable {
        revert PaymentDataMissing();
    }

    function newCampaign (NewCampaignConfig calldata config) external{
        uint256 campaignId = nextId++;
        Campaign storage campaign = campaigns[campaignId];
        
        campaign.owner = msg.sender;
        campaign.state = CampaignState.Initialized;
        campaign.inviteOnly = config.inviteOnly;
        campaign.collateral = config.collateral;
        campaign.gamemasterFee = config.gamemasterFee;
        campaign.lockedFees = 0;
        campaign.participantCount = 1;

        emit CampaignCreated(campaignId, msg.sender, campaign.state, campaign.participantCount,config);
    }

    function invitePlayers (uint256 campaignId, address[] calldata addresses) external {
        Campaign storage campaign = campaigns[campaignId];

        checkCampaignExists(campaign.owner, campaignId); 
        checkIsOwner(campaign.owner, msg.sender);
        checkIfCampaignLocked(campaign.state, campaignId);

        for(uint256 i = 0; i < addresses.length; i++) {
            address adr = addresses[i];
            Player storage player = campaignPlayers[campaignId][adr];

            checkPlayerAlreadyInCampaign(player.state, campaignId, adr);

            player.state = PlayerState.AwaitingSignature;
            emit UpdatedCampaignPlayer(campaignId, adr, player.state);
        }
    }

    function campaignApplication (uint256 campaignId) external {
        address applicant = msg.sender;

        Campaign storage campaign = campaigns[campaignId];
        checkCampaignExists(campaign.owner, campaignId); 
        checkCampaignInviteOnly(campaign.inviteOnly, campaignId);
        checkIfCampaignLocked(campaign.state, campaignId);

        Player storage player = campaignPlayers[campaignId][applicant];
        checkPlayerAlreadyInCampaign(player.state, campaignId, applicant);
        
        player.state = PlayerState.Applied;
        emit UpdatedCampaignPlayer(campaignId, applicant, player.state);
    }

    function reviewApplications(uint256 campaignId, ApplicationReview[] calldata reviews) external {
        Campaign storage campaign = campaigns[campaignId];

        checkCampaignExists(campaign.owner, campaignId); 
        checkIsOwner(campaign.owner, msg.sender);
        checkIfCampaignLocked(campaign.state, campaignId);

        for(uint256 i = 0; i < reviews.length; i++){
            ApplicationDecision decision = reviews[i].decision;
            address applicant = reviews[i].applicant;

            Player storage player = campaignPlayers[campaignId][applicant];

            checkApplicantExists(player.state, campaignId, applicant); 
        
            if(decision == ApplicationDecision.Approved){
                checkApplicantAlreadyApproved(player.state, campaignId, applicant);
                player.state = PlayerState.AwaitingSignature;
                emit UpdatedCampaignPlayer(campaignId, applicant, player.state);
            } else {
                checkApplicantAlreadyRejected(player.state, campaignId, applicant);
                player.state = PlayerState.Rejected;
                emit UpdatedCampaignPlayer(campaignId, applicant, player.state);
            }
        }
    }

    function signCampaign(uint256 campaignId) external payable {
        Campaign storage campaign = campaigns[campaignId];

        checkCampaignExists(campaign.owner, campaignId);
        checkIfCampaignLocked(campaign.state, campaignId);

        Player storage player = campaignPlayers[campaignId][msg.sender];
        checkPlayerAwaitingSignature(player.state, campaignId, msg.sender);

        uint256 collateral = campaign.collateral;
        uint256 gamemasterFee = campaign.gamemasterFee;
        checkTransactionValue(gamemasterFee, collateral, msg.value);

        campaign.lockedFees += campaign.gamemasterFee;
        player.lockedCollateral += campaign.collateral;
        player.state = PlayerState.Signed;

        campaign.participantCount += 1;

        emit UpdatedCampaignPlayer(campaignId, msg.sender, player.state);
        emit CampaignParticipantCountChanged(campaignId, campaign.participantCount);
        emit PlayerLockedCollateral(campaignId, msg.sender, collateral);
        emit UpdatedLockedFees(campaignId, campaign.lockedFees);
    }

    //can be optimized with bit shifting / bitmasks
    function addVote(uint256 campaignId, VoteType voteType) external {
        Campaign storage campaign = campaigns[campaignId];

        checkCampaignExists(campaign.owner, campaignId);
        checkIfCampaignLocked(campaign.state, campaignId);

        if(campaign.owner != msg.sender){
            Player storage player = campaignPlayers[campaignId][msg.sender];
            checkPlayerSigned(player.state, campaignId, msg.sender);
        }

        if(campaignHasVoted[campaignId][voteType][msg.sender]){
            revert HasAlreadyVoted(campaignId, msg.sender, voteType);
        }

        campaignVoteCount[campaignId][voteType] += 1;
        campaignHasVoted[campaignId][voteType][msg.sender] = true;

        emit NewVoteAdded(campaignId, voteType, msg.sender);

        if(campaignVoteCount[campaignId][voteType] > (campaign.participantCount / 2)){
            if(voteType == VoteType.StartCampaign){
                campaign.state = CampaignState.Running;
                emit UpdatedCampaignState(campaignId, campaign.state);
            }

            if(voteType == VoteType.StopCampaign){
                campaign.state = CampaignState.Completed;
                emit UpdatedCampaignState(campaignId, campaign.state);
            }
        }
    }

    function withdrawFees(uint256 campaignId) external {
        Campaign storage campaign = campaigns[campaignId];

        checkCampaignExists(campaign.owner, campaignId);
        checkIsOwner(campaign.owner, msg.sender);
        checkIfCampaignCompleted(campaign.state, campaignId);
        checkHasLockedFees(campaign.lockedFees, campaignId);

        if(locked) revert BlockedDueToReEntrancy(campaignId, msg.sender);
        locked = true;

        uint256 amountToTransfer = campaign.lockedFees;
        campaign.lockedFees = 0;
        transferFunds(amountToTransfer, msg.sender);

        locked = false;

        emit LockedFeesWithdrawn(campaignId, amountToTransfer, campaign.lockedFees);
    }

    function withdrawCollateral(uint256 campaignId) external {
        Campaign storage campaign = campaigns[campaignId];

        checkCampaignExists(campaign.owner, campaignId);
        checkIfCampaignCompleted(campaign.state, campaignId);

        Player storage player = campaignPlayers[campaignId][msg.sender];
        checkPlayerSigned(player.state, campaignId, msg.sender);
        checkHasLockedCollateral(player.lockedCollateral, campaignId, msg.sender);

        if(locked) revert BlockedDueToReEntrancy(campaignId, msg.sender);
        locked = true;

        uint256 amountToTransfer = player.lockedCollateral;
        player.lockedCollateral = 0;
        transferFunds(amountToTransfer, msg.sender);

        locked = false;

        emit LockedCollateralWithdrawn(campaignId, amountToTransfer, player.lockedCollateral);
    }

    function addReview(uint256 campaignId, address recipient, Review calldata review) external {
        if(recipient == msg.sender) revert CannotReviewSelf();

        Campaign storage campaign = campaigns[campaignId];

        checkCampaignExists(campaign.owner, campaignId);
        checkIfCampaignCompleted(campaign.state, campaignId);


        if(campaign.owner != msg.sender){
            Player storage player = campaignPlayers[campaignId][msg.sender];
            checkPlayerSigned(player.state, campaignId, msg.sender);
        }

        if(campaign.owner != recipient){
            Player storage player = campaignPlayers[campaignId][recipient];
            checkPlayerSigned(player.state, campaignId, msg.sender);
        }

        checkAlreadyReviewed(
            playerHasReviewed[campaignId][msg.sender][recipient], 
            campaignId,
            recipient,
            msg.sender
        );

        playerHasReviewed[campaignId][msg.sender][recipient] = true;

        emit ReviewAdded(campaignId, recipient, msg.sender, review);
    }

    function transferFunds(uint256 amount, address recipient) private {
        (bool ok, ) = payable(recipient).call{value: amount}("");
        if(!ok) revert TransferFailed(amount, recipient);
    }

    function checkIsOwner(address owner, address sender) internal pure {
        if(owner != sender) revert NotOwner(sender);
    }

    function checkCampaignExists(address owner, uint256 campaignId) internal pure {
        if(owner == address(0)) revert CampaignDoesNotExist(campaignId);
    }

    function checkApplicantExists(PlayerState state, uint256 campaignId, address applicant) internal pure {
        if(state == PlayerState.None) revert ApplicantDoesNotExist(campaignId, applicant);
    }

    function checkApplicantAlreadyApproved(PlayerState state, uint256 campaignId, address applicant) internal pure {
        if(state == PlayerState.AwaitingSignature) revert ApplicantAlreadyApproved(campaignId, applicant);
    }

    function checkApplicantAlreadyRejected(PlayerState state, uint256 campaignId, address applicant) internal pure {
        if(state == PlayerState.Rejected) revert ApplicantAlreadyRejected(campaignId, applicant);
    }

    function checkCampaignInviteOnly(bool inviteOnly, uint256 campaignId) internal pure {
        if(inviteOnly) revert CampaignIsInviteOnly(campaignId);
    }

    function checkPlayerAlreadyInCampaign(PlayerState state, uint256 campaignId, address player) internal pure {
        if(state != PlayerState.None) revert PlayerExistsInCampaign(campaignId, player);
    }

    function checkPlayerAwaitingSignature(PlayerState state, uint256 campaignId, address player) internal pure {
        if(state != PlayerState.AwaitingSignature) revert PlayerNotAwaitingSignature(campaignId, player);
    }

    function checkPlayerSigned(PlayerState state, uint256 campaignId, address player) internal pure {
        if(state != PlayerState.Signed) revert PlayerHasNotSigned(campaignId, player);
    }

    function checkIfCampaignLocked(CampaignState state, uint256 campaignId) internal pure {
        if(state != CampaignState.Initialized) revert CampaignLocked(campaignId);
    }

    function checkIfCampaignCompleted(CampaignState state, uint256 campaignId) internal pure {
        if(state != CampaignState.Completed) revert CampaignNotCompleted(campaignId);
    }

    function checkTransactionValue(uint256 fee, uint256 collateral, uint256 received) internal pure {
        if(received != (fee + collateral)) revert IncorrectTransactionValue(fee, collateral, received);
    }

    function checkAlreadyVoted(bool hasVoted, uint256 campaignId, address player, VoteType voteType) internal pure {
        if(hasVoted) revert HasAlreadyVoted(campaignId, player, voteType);
    }

    function checkHasLockedFees(uint256 lockedFees, uint256 campaignId) internal pure {
        if(!(lockedFees > 0)) revert HasNoLockedFees(campaignId);
    }

    function checkHasLockedCollateral(uint256 lockedColalteral, uint256 campaignId, address player) internal pure {
        if(!(lockedColalteral > 0)) revert HasNoLockedCollateral(campaignId, player);
    }

    function checkAlreadyReviewed(bool hasReviewed, uint256 campaignId, address recipient, address caller) internal pure {
        if(hasReviewed) revert AlreadyReviewed(campaignId, recipient, caller);
    }
}