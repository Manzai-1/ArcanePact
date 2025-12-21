import { useContext, useState } from "react";
import { ApplicationDecision, ClientState, PlayerState } from "../../../models/IArcanePact";
import { TxContext } from "../../../providers/TxProvider";

const headers = [
    { name: 'stateText', value: 'State' },
    { name: 'id', value: 'Player Address' },
    { name: 'likes', value: '👍🏾' },
    { name: 'dislikes', value: '👎🏾' }
];

export const usePlayerList = (campaign) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const { sendTx } = useContext(TxContext);

    const canReviewApplication = 
        selectedPlayer &&
        selectedPlayer.state === PlayerState.Applied && 
        campaign.clientState === ClientState.Owner;
    
    const rejectApplication = () => submitReview(ApplicationDecision.Rejected);
    const approveApplication = () => submitReview(ApplicationDecision.Approved);
    const submitReview = (decision) => sendTx('reviewApplication', [campaign.id, selectedPlayer.id, decision]);


    return {
        headers,
        selectedPlayer,
        setSelectedPlayer,
        closeModal: () => { setSelectedCampaign(null) },
        canReviewApplication,
        rejectApplication,
        approveApplication
    }
}