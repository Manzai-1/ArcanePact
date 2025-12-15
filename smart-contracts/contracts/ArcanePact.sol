// Author: Manzai-1
// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.28;

contract ArcanePact {
    uint256 private nextId;


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
        Signed,
        InSession
    }
    enum ApplicationDecision {
        Approved,
        Rejected
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
    }
    struct NewCampaignConfig {
        string title;
        string description;
        bool inviteOnly;
        uint256 gamemasterFee;
        uint256 collateral;
    }
    
    mapping(uint256 => Campaign) internal campaigns;
    mapping(uint256 => mapping(address => Player)) internal campaignPlayers;

    event CampaignCreated(
        uint256 indexed campaignId, 
        address indexed owner, 
        CampaignState indexed campaignState, 
        NewCampaignConfig config
    );
    event ApplicationAdded(
        uint256 indexed campaignId,
        address indexed player,
        PlayerState indexed playerState
    );
    event ApplicationAproved(
        uint256 indexed campaignId,
        address indexed player,
        PlayerState indexed playerState
    );
    event ApplicationRejected(
        uint256 indexed campaignId,
        address indexed player,
        PlayerState indexed playerState
    );
    event InvitationAdded(
        uint256 indexed campaignId,
        address player,
        PlayerState indexed playerState
    );
    event PlayerSigned(
        uint256 indexed campaignId,
        address indexed player,
        PlayerState indexed playerState
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
    error IncorrectTransactionValue(uint256 gamemasterFee, uint256 collateral, uint256 received);

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

        emit CampaignCreated(campaignId, msg.sender, campaign.state, config);
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
            emit InvitationAdded(campaignId, adr, player.state);
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
        emit ApplicationAdded(campaignId, applicant, player.state);
    }

    function ReviewApplications(uint256 campaignId, ApplicationReview[] calldata reviews) external {
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
                emit ApplicationAproved(campaignId, applicant, player.state);
            } else {
                checkApplicantAlreadyRejected(player.state, campaignId, applicant);
                player.state = PlayerState.Rejected;
                emit ApplicationRejected(campaignId, applicant, player.state);
            }
        }
    }

    function SignCampaign(uint256 campaignId) external payable {
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

        emit PlayerSigned(campaignId, msg.sender, player.state);
        emit PlayerLockedCollateral(campaignId, msg.sender, collateral);
        emit UpdatedLockedFees(campaignId, campaign.lockedFees);
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

    function checkIfCampaignLocked(CampaignState state, uint256 campaignId) internal pure {
        if(state != CampaignState.Initialized) revert CampaignLocked(campaignId);
    }

    function checkTransactionValue(uint256 fee, uint256 collateral, uint256 received) internal pure {
        if(received != (fee + collateral)) revert IncorrectTransactionValue(fee, collateral, received);
    }
}