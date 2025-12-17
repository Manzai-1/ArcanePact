import { useMemo } from "react";
import { useCampaignPlayersQuery, useCampaignsQuery } from "./queries";
import { useAccount } from "wagmi";
import { CampaignState, ClientState, PlayerState } from "../../models/IArcanePact";


export const UseGraph = () => {
    const { address } = useAccount();
    const clientAdr = address.toLowerCase();

    const campaignsQuery = useCampaignsQuery(100, 0);
    const campaignPlayersQuery = useCampaignPlayersQuery(100, 0);

    const lists = useMemo(() => {
        const campaigns = (campaignsQuery.data ?? []).map(campaign => ({
            ...campaign,
            stateText: CampaignState[campaign.state]
        }));
        const campaignPlayers = (campaignPlayersQuery.data ?? []).map(cp => ({
            ...cp,
            stateText: PlayerState[cp.state]
        }));

        console.log("RUNNING USE GRAPH");

        const playersByCampaignId = new Map();

        for (const cp of campaignPlayers){
            const campaignId = cp.campaign.id;
            const id = cp.player.id;
            const state = cp.state;
            const stateText = cp.stateText;

            if (!playersByCampaignId.has(campaignId)) {
                playersByCampaignId.set(campaignId, []);
            }

            playersByCampaignId.get(campaignId).push({
                id,
                state,
                stateText
            });
        }

        if(!clientAdr) return {
            owned: [], 
            joined: [], 
            pending: [], 
            discover: campaigns.filter(c =>  !c.inviteOnly)
                .map(c => ({...c, clientState: ClientState.None})),
            playersByCampaignId
        };

        const owned = campaigns.filter(
            campaign => campaign.owner.toLowerCase() === clientAdr
        ).map(c => ({...c, clientState: ClientState.Owner}));

        const joined =campaigns.filter(
            campaign => campaignPlayers.filter(
                campaignPlayer => campaignPlayer.campaign.id === campaign.id
                && campaignPlayer.player.id.toLowerCase() === clientAdr
                && campaignPlayer.state === PlayerState.Signed
        ).length > 0).map(c => ({...c, clientState: ClientState.Joined}));

        const pending = campaigns.map(campaign => {
            const campaignPlayer = campaignPlayers.find((cp) => 
                cp.campaign.id === campaign.id &&
                cp.player.id.toLowerCase() === clientAdr &&
                (
                    cp.state === PlayerState.Applied || 
                    cp.state === PlayerState.AwaitingSignature
                ) 
            );

            if(!campaignPlayer) return null;

            const clientState = campaignPlayer.state === PlayerState.Applied ? 
                ClientState.Applied :
                ClientState.AwaitingSignature;

            return {
                ...campaign,
                clientState 
            }
        }).filter(Boolean);


        const discover = campaigns.filter(
            campaign => campaign.owner.toLowerCase() != address.toLowerCase() && 
            !campaign.inviteOnly &&
            (
                !playersByCampaignId.has(campaign.id) || 
                !playersByCampaignId.get(campaign.id)
                    .find((cp) => cp.id.toLowerCase() === clientAdr)
            )
        ).map(c => ({...c, clientState: ClientState.None}));

        return { owned, joined, pending, discover, playersByCampaignId };
    }, [campaignsQuery.data, campaignPlayersQuery.data, address]);

    return {
        ...lists,
        address,
        isLoading: campaignsQuery.isLoading || campaignPlayersQuery.isLoading,
        error: campaignsQuery.error || campaignPlayersQuery.error,
  };
}