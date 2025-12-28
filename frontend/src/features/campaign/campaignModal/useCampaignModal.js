import { CampaignState, ClientState } from "../../../models/IArcanePact";
import { useContext, useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";
import { TxContext } from "../../../providers/TxProvider";
import { useAccount } from "wagmi";
import { formatEther } from 'viem';

export const useCampaignModal = (campaignId) => {
    const { address } = useAccount();
    const { campaigns, players, isLoading, error } = UseGraph();
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const { sendTx } = useContext(TxContext);

    if(isLoading || error || !sendTx ) return null;
    const clientAdr = address ? address.toLowerCase() : null;
    const campaign = campaigns.find(c => c.id === campaignId);

    const handleViewPlayer = (player) => {
        setSelectedPlayerId(player.id);
    }

    const selectedPlayer = players.find(player => player.id === selectedPlayerId);

    const txValue = BigInt(campaign.gamemasterFee) + BigInt(campaign.collateral);

    const handleSign = () => sendTx('signCampaign', [campaign.id], txValue);
    const handleApply = () => sendTx('campaignApplication', [campaign.id]);
    const handleWithdrawCollateral = () => sendTx('withdrawCollateral', [campaign.id]);
    const handleWithdrawFees = () => sendTx('withdrawFees', [campaign.id]);

    const actions = [];
    if(campaign.clientState === ClientState.AwaitingSignature) {
        actions.push({ label: 'Sign', handleClick: handleSign, disabled: false });
    }
    if(campaign.clientState === ClientState.None && campaign.state === CampaignState.Initialized){
        actions.push({ label: 'Apply', handleClick: handleApply, disabled: false});
    }
    if(clientAdr && campaign.clientState === ClientState.Signed && campaign.state === CampaignState.Completed){
        const lockedCollateral = (campaign.players.find(p => p.id === clientAdr) ?? []).lockedCollateral;

        actions.push({
            label: `Withdraw Collateral [ ${formatEther(lockedCollateral)} Ξ ]`,
            handleClick: handleWithdrawCollateral,
            disabled: +lockedCollateral === 0
        })
    }
    if(campaign.clientState === ClientState.Owner && campaign.state === CampaignState.Completed){
        const fees = campaign.lockedFees;

        actions.push({
            label: `Withdraw Fees [ ${formatEther(fees)} Ξ ]`,
            handleClick: handleWithdrawFees,
            disabled: +fees === 0
        })
    }

    // const reviewId = selectedPlayerId ? campaignId+'-'+clientAdr+'-'+selectedPlayerId.toLowerCase() : '';
    const canReview = 
            selectedPlayerId && 
            campaign.state === CampaignState.Completed && 
            campaign.ClientState === CampaignState.Signed &&
            selectedPlayerId !== clientAdr &&
            !players.find(p => p.id === selectedPlayerId).reviews.find(r =>
                r.campaignId === campaignId && 
                r.sender.toLowerCase() === clientAdr
            );

    return {
        actions,
        canInvite: campaign.clientState === ClientState.Owner,
        canReview,
        handleViewPlayer,
        selectedPlayerId,
        closeViewPlayer: ()=>{setSelectedPlayerId(null)},
        selectedPlayer,
        campaign
    };
}

