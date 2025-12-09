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
    }

    struct Campaign {
        address owner;
        CampaignState state;
        bool inviteOnly;
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
        NewCampaignConfig config
    );

    event ApplicationAdded(
        uint256 indexed campaignId,
        address indexed player
    );

    event ApplicationAproved(
        uint256 indexed campaignId,
        address indexed player
    );

    event ApplicationRejected(
        uint256 indexed campaignId,
        address indexed player
    );

    event InvitationAdded(
        uint256 indexed campaignId,
        address player
    );

    error NotOwner(address caller);
    error CampaignLocked(uint256 campaignId);
    error CampaignDoesNotExist(uint256 campaignId);
    error PlayerExistsInCampaign(uint256 campaignId, address player);
    error CampaignIsInviteOnly(uint256 campaignId);
    error ApplicantDoesNotExist(uint256 campaignId, address applicant);
    error ApplicantAlreadyRejected(uint256 campaignId, address applicant);
    error ApplicantAlreadyApproved(uint256 campaignId, address applicant);
    constructor () {
        nextId = 1;
    }

    function newCampaign (NewCampaignConfig calldata config) external{
        uint256 campaignId = nextId++;
        Campaign storage campaign = campaigns[campaignId];
        
        campaign.owner = msg.sender;
        campaign.state = CampaignState.Initialized;
        campaign.inviteOnly = config.inviteOnly;

        emit CampaignCreated(campaignId, msg.sender, config);
    }

    // use if instead of modifier to avoid looking up mapping twice, add to documentation / natspec later
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
            emit InvitationAdded(campaignId, adr);
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
        emit ApplicationAdded(campaignId, applicant);
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
                emit ApplicationAproved(campaignId, applicant);
            } else {
                checkApplicantAlreadyRejected(player.state, campaignId, applicant);
                player.state = PlayerState.Rejected;
                emit ApplicationRejected(campaignId, applicant);
            }
        }
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

    function checkIfCampaignLocked(CampaignState state, uint256 campaignId) internal pure {
        if(state != CampaignState.Initialized) revert CampaignLocked(campaignId);
    }
}