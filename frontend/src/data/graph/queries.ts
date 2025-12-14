import { GraphQLClient } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { CAMPAIGN_PLAYERS_QUERY, CAMPAIGNS_QUERY, PLAYERS_QUERY } from "./documents";
import { INTERVAL, SUBGRAPH_URL } from "./config";

const client = new GraphQLClient(SUBGRAPH_URL);

export function useCampaignsQuery(first = 50, skip = 0) {
    return useQuery({
        queryKey: ["campaigns", first, skip],
        queryFn: async () => {
            const data = await client.request<{ campaigns: any[] }>(CAMPAIGNS_QUERY, {
                first,
                skip,
            });
            return data.campaigns;
        },
        refetchInterval: INTERVAL,
    });
}

export function usePlayersQuery(first = 50, skip = 0) {
    return useQuery({
        queryKey: ["players", first, skip],
        queryFn: async () => {
            const data = await client.request<{ players: any[] }>(PLAYERS_QUERY, {
                first,
                skip,
            });
            return data.players;
        },
        refetchInterval: INTERVAL,
    });
}

export function useCampaignPlayersQuery(first = 50, skip = 0) {
    return useQuery({
        queryKey: ["campaignPlayers", first, skip],
        queryFn: async () => {
            const data = await client.request<{ campaignPlayers: any[] }>(CAMPAIGN_PLAYERS_QUERY, {
                first,
                skip,
            });
            return data.campaignPlayers;
        },
        refetchInterval: INTERVAL,
    });
}