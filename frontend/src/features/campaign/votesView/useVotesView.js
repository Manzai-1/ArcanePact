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
    if(!sendTx) return null;

    const rows = campaign.votes.map((vote,i) => {
        const count = +campaign.participantCount;
        const required = Math.floor(count / 2) +1;

        const voteName = vote.voteName;
        const voteCount = vote.voteCount;

        return { voteName, voteCount, required, id: i };
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