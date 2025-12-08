// Author: Manzai-1
// SPDX-License-Identifier: SEE LICENSE IN LICENSE

pragma solidity 0.8.28;

contract ArcanePact {
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
        mapping(address => Player) players;
    }
    
    mapping(uint256 => Campaign) internal campaigns;


    error CampaignIDTaken(uint256 id);

    event NewCampaignCreated(uint256 indexed id, string indexed title, string description, bool inviteOnly);


    function newCampaign (
        uint256 id,
        string memory title,
        string memory description,
        bool inviteOnly
    ) external {
        Campaign storage campaign = campaigns[id];

        if(campaign.owner == address(0)) revert CampaignIDTaken(id);
        
        campaign.owner = msg.sender;
        campaign.state = CampaignState.Initialized;
        campaign.inviteOnly = inviteOnly;

        emit NewCampaignCreated(id, title, description, inviteOnly);
    }
}