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

    event NewCampaignCreated(
        uint256 indexed id, 
        address indexed owner, 
        NewCampaignConfig config
    );


    constructor () {
        nextId = 1;
    }

    function newCampaign (NewCampaignConfig calldata config) external {
        uint256 id = nextId++;
        Campaign storage campaign = campaigns[id];
        
        campaign.owner = msg.sender;
        campaign.state = CampaignState.Initialized;
        campaign.inviteOnly = config.inviteOnly;

        emit NewCampaignCreated(id, msg.sender, config);
    }
}