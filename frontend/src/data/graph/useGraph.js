import { useMemo } from "react";
import { useCampaignPlayersQuery, useCampaignsQuery } from "./queries";
import { useAccount } from "wagmi";
import { PlayerState } from "../../models/IArcanePact";


export const UseGraph = () => {
    const { address } = useAccount();
    const clientAdr = address.toLowerCase();

    const campaignsQuery = useCampaignsQuery(100, 0);
    const campaignPlayersQuery = useCampaignPlayersQuery(100, 0);

    const lists = useMemo(() => {
        const campaigns = campaignsQuery.data ?? [];
        const campaignPlayers = campaignPlayersQuery.data ?? [];

        if(!clientAdr) return {
            owned: [], 
            joined: [], 
            pending: [], 
            discover: campaigns.filter(c =>  !c.inviteOnly)
        };

        const owned = campaigns.filter(
            campaign => campaign.owner.toLowerCase() === clientAdr
        );

        const joined =campaigns.filter(
            campaign => campaignPlayers.filter(
                campaignPlayer => campaignPlayer.campaign.id === campaign.id
                && campaignPlayer.player.id.toLowerCase() === clientAdr
                && (
                    campaignPlayer.state === PlayerState.Signed ||
                    campaignPlayer.state === PlayerState.InSession
                )
        ).length > 0);

        const pending = campaigns.filter(
            campaign => campaignPlayers.filter(
                campaignPlayer => campaignPlayer.campaign.id === campaign.id
                && campaignPlayer.player.id.toLowerCase() === address.toLowerCase()
                && (
                    campaignPlayer.state === PlayerState.Applied
                    || campaignPlayer.state === PlayerState.AwaitingSignature
                )
        ).length > 0);

        const discover = campaigns.filter(
            campaign => campaign.owner.toLowerCase() != address.toLowerCase() 
            && !campaign.inviteOnly
        );

        return { owned, joined, pending, discover,  };
    }, [campaignsQuery.data, campaignPlayersQuery.data]);

    return {
        ...lists,
        address,
        isLoading: campaignsQuery.isLoading || campaignPlayersQuery.isLoading,
        error: campaignsQuery.error || campaignPlayersQuery.error,
  };
}