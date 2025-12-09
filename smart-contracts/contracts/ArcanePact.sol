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
    error CampaignClosedForInvites(uint256 campaignId);
    error CampaignDoesNotExist(uint256 campaignId);
    error PlayerExistsInCampaign(uint256 campaignId, address player);
    error CampaignIsInviteOnly(uint256 campaignId);


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

        if(campaign.owner == address(0)) 
            revert CampaignDoesNotExist(campaignId);

        if(campaign.owner != msg.sender) 
            revert NotOwner(msg.sender);

        if(campaign.state != CampaignState.Initialized) 
            revert CampaignClosedForInvites(campaignId);

        for(uint256 i = 0; i < addresses.length; i++) {
            address adr = addresses[i];
            Player storage player = campaignPlayers[campaignId][adr];

            if(player.state != PlayerState.None) 
                revert PlayerExistsInCampaign(campaignId, adr);

            player.state = PlayerState.AwaitingSignature;
            emit InvitationAdded(campaignId, adr);
        }
    }

    function campaignApplication (uint256 campaignId) external {
        address adr = msg.sender;

        Campaign storage campaign = campaigns[campaignId];
        if(campaign.owner == address(0)) 
            revert CampaignDoesNotExist(campaignId);
        
        if(campaign.inviteOnly) 
            revert CampaignIsInviteOnly(campaignId);

        Player storage player = campaignPlayers[campaignId][adr];
        if(player.state != PlayerState.None) 
            revert PlayerExistsInCampaign(campaignId, adr);
        
        player.state = PlayerState.Applied;
        emit ApplicationAdded(campaignId, adr);
    }

    function ReviewApplications(uint256 campaignId, ApplicationReview[] calldata reviews) external {

    }
}