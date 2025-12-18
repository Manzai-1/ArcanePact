import { useAccount } from "wagmi";
import { CampaignState, ClientState } from "../../../models/IArcanePact";

export const getCapabilities = (campaign) => {
    const { address } = useAccount();

    return {
        canInvite: campaign.clientState === ClientState.Owner,
        canSign: campaign.clientState === ClientState.AwaitingSignature,
        canApply: campaign.clientState === ClientState.None && campaign.state === CampaignState.Initialized,
        canVote: campaign.clientState === ClientState.Signed || campaign.owner === address,
        canWithdrawCollateral: campaign.clientState === ClientState.Signed && campaign.state === CampaignState.Completed,
        canWithdrawFees: campaign.owner === address && campaign.state === CampaignState.Completed
    };
}

