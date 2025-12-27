import { useContext } from "react";
import { CampaignState, ClientState, VoteType } from "../../../models/IArcanePact";
import { TxContext } from "../../../providers/TxProvider";
import { useAccount } from "wagmi";

const headers = [
    { name: 'voteName', value: 'Type' },
    { name: 'voteCount', value: 'Voted' },
    { name: 'required', value: 'Required' }
];

export const useVotesView = (campaign) => {
    const { sendTx } = useContext(TxContext);
    const { address } = useAccount();

    if(!sendTx) return null;

    const rows = campaign.votes.map((vote,i) => {
        const count = +campaign.participantCount;
        const required = Math.floor(count / 2) +1;

        const voteName = vote.voteName;
        const voteCount = vote.voteCount;

        return { voteName, voteCount, required, id: i };
    })

    const canVote = campaign.clientState === ClientState.Signed || campaign.clientState === ClientState.Owner;
    const voteStartCampaign = () => sendTx('addVote', [campaign.id, VoteType.StartCampaign]);
    const voteStopCampaign  = () => sendTx('addVote', [campaign.id, VoteType.StopCampaign]);
    const disableVoteStart = !address || (campaign.state !== CampaignState.Initialized) || 
        (campaign.votes.find(v => v.voteType === VoteType.StartCampaign) ?? []).voters.includes(address.toLocaleLowerCase());
    const disableVoteStop = !address || (campaign.state !== CampaignState.Running) || 
        (campaign.votes.find(v => v.voteType === VoteType.StopCampaign) ?? []).voters.includes(address.toLocaleLowerCase());

    const actions = [
        { label: 'Vote Start', handleClick: voteStartCampaign, disabled: disableVoteStart },
        { label: 'Vote Stop', handleClick: voteStopCampaign, disabled: disableVoteStop }
    ];

    return {
        actions,
        headers,
        rows,
        canVote,
    }
}