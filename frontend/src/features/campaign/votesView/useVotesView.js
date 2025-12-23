import { useContext } from "react";
import { ClientState, VoteType } from "../../../models/IArcanePact";
import { TxContext } from "../../../providers/TxProvider";
import { UseGraph } from "../../../data/graph/useGraph";

const headers = [
    { name: 'voteName', value: 'Type' },
    { name: 'voteCount', value: 'Voted' },
    { name: 'required', value: 'Required' }
];

export const useVotesView = (campaignId) => {
    const { sendTx } = useContext(TxContext);
    const { campaigns, isLoading, error } = UseGraph();
    if(isLoading || error || !campaigns || !sendTx) return null;

    const campaign = campaigns.find(c => c.id === campaignId);

    const rows = campaign.votes.map((vote,i) => {
        const voteName = vote.voteName;
        const voteCount = vote.voteCount;
        const required = Math.ceil(+campaign.participantCount / 2);

        return { voteName, voteCount, required, id: i };
    })

    const voteStartCampaign = () => sendTx('addVote', [campaignId, VoteType.StartCampaign]);
    const voteStopCampaign  = () => sendTx('addVote', [campaignId, VoteType.StopCampaign]);

    return {
        headers,
        rows,
        canVote: campaign.clientState === ClientState.Signed || campaign.clientState === ClientState.Owner,
        voteStartCampaign,
        voteStopCampaign
    }
}