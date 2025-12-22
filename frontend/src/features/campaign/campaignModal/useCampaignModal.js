import { CampaignState, ClientState } from "../../../models/IArcanePact";
import { useContext, useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";
import { TxContext } from "../../../providers/TxProvider";

export const useCampaignModal = (campaign) => {
    const { players, isLoading, error } = UseGraph();
    const [viewPlayer, setViewPlayer] = useState(null);
    const { sendTx } = useContext(TxContext);

    if(isLoading || error || !sendTx) return null;

    const handleViewPlayer = (player) => {
        setViewPlayer(players.find(p => p.id === player.id));
    }

    const txValue = BigInt(campaign.gamemasterFee) + BigInt(campaign.collateral);

    const handleSign = () => sendTx('signCampaign', [campaign.id], txValue);
    const handleApply = () => sendTx('campaignApplication', [campaign.id]);
    const handleWithdrawCollateral = () => sendTx('withdrawCollateral', [campaign.id]);
    const handleWithDrawFees = () => sendTx('withdrawFees', [campaign.id]);

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
        closeViewPlayer: ()=>{setViewPlayer(null)},
        handleSign,
        handleApply,
        handleWithdrawCollateral,
        handleWithDrawFees,
    };
}

