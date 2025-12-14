import { useMemo } from "react";
import { useCampaignPlayersQuery, useCampaignsQuery } from "./queries";
import { useAccount } from "wagmi";
import { ClientState, PlayerState } from "../../models/IArcanePact";


export const UseGraph = () => {
    const { address } = useAccount();
    const clientAdr = address.toLowerCase();

    const campaignsQuery = useCampaignsQuery(100, 0);
    const campaignPlayersQuery = useCampaignPlayersQuery(100, 0);

    const lists = useMemo(() => {
        const campaigns = campaignsQuery.data ?? [];
        const campaignPlayers = campaignPlayersQuery.data ?? [];

        // const playersByCampaignId = new Map();

        // for (const cp of campaignPlayers){
        //     const campaignId = cp.campaign.id;
        //     const playerId = cp.player.id;
        //     const state = cp.state;

        //     if (!playersByCampaignId.has(campaignId)) {
        //         playersByCampaignId.set(campaignId, []);
        //     }

        //     playersByCampaignId.get(campaignId).push({
        //         playerId,
        //         state,
        //     });
        // }

        if(!clientAdr) return {
            owned: [], 
            joined: [], 
            pending: [], 
            discover: campaigns.filter(c =>  !c.inviteOnly)
                .map(c => ({...c, clientState: ClientState.None}))
        };

        const owned = campaigns.filter(
            campaign => campaign.owner.toLowerCase() === clientAdr
        ).map(c => ({...c, clientState: ClientState.Owner}));

        const joined =campaigns.filter(
            campaign => campaignPlayers.filter(
                campaignPlayer => campaignPlayer.campaign.id === campaign.id
                && campaignPlayer.player.id.toLowerCase() === clientAdr
                && (
                    campaignPlayer.state === PlayerState.Signed ||
                    campaignPlayer.state === PlayerState.InSession
                )
        ).length > 0).map(c => ({...c, clientState: ClientState.Joined}));

        const pending = campaigns.filter(
            campaign => campaignPlayers.filter(
                campaignPlayer => campaignPlayer.campaign.id === campaign.id
                && campaignPlayer.player.id.toLowerCase() === address.toLowerCase()
                && (
                    campaignPlayer.state === PlayerState.Applied
                    || campaignPlayer.state === PlayerState.AwaitingSignature
                )
        ).length > 0).map(c => ({...c, clientState: ClientState.Pending}));

        const discover = campaigns.filter(
            campaign => campaign.owner.toLowerCase() != address.toLowerCase() 
            && !campaign.inviteOnly
        ).map(c => ({...c, clientState: ClientState.None}));

        return { owned, joined, pending, discover,  };
    }, [campaignsQuery.data, campaignPlayersQuery.data, address]);

    return {
        ...lists,
        address,
        isLoading: campaignsQuery.isLoading || campaignPlayersQuery.isLoading,
        error: campaignsQuery.error || campaignPlayersQuery.error,
  };
}