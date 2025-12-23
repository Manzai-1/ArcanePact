import { useContext, useState } from "react";
import { ApplicationDecision, ClientState, PlayerState } from "../../../models/IArcanePact";
import { TxContext } from "../../../providers/TxProvider";
import { UseGraph } from "../../../data/graph/useGraph";

const headers = [
    { name: 'stateText', value: 'State' },
    { name: 'id', value: 'Player Address' },
    { name: 'likes', value: 'Likes' },
    { name: 'dislikes', value: 'Dislikes' }
];

export const usePlayerList = (campaignId) => {
    const [selectedPlayerId, setSelectedPlayerId] = useState(null);
    const { sendTx } = useContext(TxContext);
    const { players, campaigns, isLoading, error } = UseGraph();

    if(isLoading || error || !sendTx || !players || !campaigns) return null;
    const campaign = campaigns.find(c => c.id === campaignId);

    const canReviewApplication = 
        selectedPlayerId &&
        players.find(player => player.id === selectedPlayerId).state === PlayerState.Applied && 
        campaign.clientState === ClientState.Owner;
    
    const rejectApplication = () => submitReview(ApplicationDecision.Rejected);
    const approveApplication = () => submitReview(ApplicationDecision.Approved);
    const submitReview = (decision) => sendTx('reviewApplication', [campaign.id, selectedPlayer.id, decision]);


    return {
        headers,
        selectedPlayerId,
        setSelectedPlayerId,
        closeModal: () => { setSelectedCampaign(null) },
        canReviewApplication,
        rejectApplication,
        approveApplication,
        players: campaign.players
    }
}