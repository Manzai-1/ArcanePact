import { useContext } from "react";
import { ClientState, VoteType } from "../../../models/IArcanePact";
import { TxContext } from "../../../providers/TxProvider";

const headers = [
    { name: 'voteName', value: 'Type' },
    { name: 'voteCount', value: 'Voted' },
    { name: 'required', value: 'Required' }
];

export const useVotesView = (campaign) => {
    const { sendTx } = useContext(TxContext);

    const rows = campaign.votes.map(vote => {
        const voteName = vote.voteName;
        const voteCount = vote.voteCount;
        const required = Math.ceil(+campaign.participantCount / 2);

        return { voteName, voteCount, required };
    })

    const voteStartCampaign = () => sendTx('addVote', [campaign.id, VoteType.StartCampaign]);
    const voteStopCampaign  = () => sendTx('addVote', [campaign.id, VoteType.StopCampaign]);

    return {
        headers,
        rows,
        canVote: campaign.clientState === ClientState.Signed || campaign.clientState === ClientState.Owner,
        voteStartCampaign,
        voteStopCampaign
    }
}