import { CampaignState, ClientState } from "../../../models/IArcanePact";
import { useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";

export const useCampaignModal = (campaign) => {
    const { players } = UseGraph();
    const [viewPlayer, setViewPlayer] = useState(null);

    const handleViewPlayer = (player) => {
        setViewPlayer(players.find(p => p.id === player.id));
    }

    return {
        canInvite: campaign.clientState === ClientState.Owner,
        canSign: campaign.clientState === ClientState.AwaitingSignature,
        canApply: campaign.clientState === ClientState.None && campaign.state === CampaignState.Initialized,
        canVote: campaign.clientState === ClientState.Signed || campaign.clientState === ClientState.Owner,
        canWithdrawCollateral: campaign.clientState === ClientState.Signed && campaign.state === CampaignState.Completed,
        canWithdrawFees: campaign.clientState === ClientState.Owner && campaign.state === CampaignState.Completed,
        canReview: viewPlayer && 
            campaign.state === CampaignState.Completed && 
            campaign.ClientState === CampaignState.Signed,
        viewPlayer,
        handleViewPlayer,
        closeViewPlayer: ()=>{setViewPlayer(null)}
    };
}

