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
        NotAdded,
        Applied,
        PendingSignature,
        Signed,
        InSession
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

    event NewCampaignCreated(
        uint256 indexed campaignId, 
        address indexed owner, 
        NewCampaignConfig config
    );

    event NewInvitationAdded(
        uint256 indexed campaignId,
        address player
    );

    error NotOwner(address caller);
    error CampaignClosedForInvites(uint256 campaignId);
    error CampaignDoesNotExist(uint256 campaignId);
    error PlayerAlreadyExists(uint256 campaignId, address player);


    constructor () {
        nextId = 1;
    }

    function newCampaign (NewCampaignConfig calldata config) external{
        uint256 campaignId = nextId++;
        Campaign storage campaign = campaigns[campaignId];
        
        campaign.owner = msg.sender;
        campaign.state = CampaignState.Initialized;
        campaign.inviteOnly = config.inviteOnly;

        emit NewCampaignCreated(campaignId, msg.sender, config);
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

            if(player.state != PlayerState.NotAdded) 
                revert PlayerAlreadyExists(campaignId, adr);
                
            player.state = PlayerState.PendingSignature;
            emit NewInvitationAdded(campaignId, adr);
        }
    }
}