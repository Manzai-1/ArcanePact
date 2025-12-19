import { ClientState, VoteType } from "../../../models/IArcanePact";

const headers = [
    { name: 'voteName', value: 'Type' },
    { name: 'voteCount', value: 'Voted' },
    { name: 'required', value: 'Required' }
];

export const useVotesView = (campaign) => {
    console.log('VOTE CAMPAIGN',campaign);
    const rows = campaign.votes.map(vote => {
        const voteName = vote.voteName;
        const voteCount = vote.voteCount;
        const required = Math.ceil(+campaign.participantCount / 2);

        return { voteName, voteCount, required };
    })

    const voteStartCampaign = () => addVote(campaign.id, VoteType.StartCampaign);
    const voteStopCampaign  = () => addVote(campaign.id, VoteType.StopCampaign);

    return {
        headers,
        rows,
        canVote: campaign.clientState === ClientState.Signed || campaign.clientState === ClientState.Owner,
        voteStartCampaign,
        voteStopCampaign
    }
}