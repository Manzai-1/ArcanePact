import { useState } from "react";
import { ApplicationDecision, ClientState, PlayerState } from "../../../models/IArcanePact";
import { reviewApplication } from "../../../services/arcanePactServices";

const headers = [
    { name: 'stateText', value: 'State' },
    { name: 'id', value: 'Player Address' },
    { name: 'likes', value: '⬆' },
    { name: 'dislikes', value: '⬇' }
];

export const usePlayerList = (campaign) => {
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const canReviewApplication = 
        selectedPlayer &&
        selectedPlayer.state === PlayerState.Applied && 
        campaign.clientState === ClientState.Owner;
    
    const rejectApplication = () => submitReview(ApplicationDecision.Rejected);
    const approveApplication = () => submitReview(ApplicationDecision.Approved);
    const submitReview = (decision) => reviewApplication(campaign.id, selectedPlayer.id, decision);


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