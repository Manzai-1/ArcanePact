import { GraphQLClient } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import { CAMPAIGNS_WITH_PLAYERS_AND_VOTES, PLAYERS_WITH_CAMPAIGNS_AND_REVIEWS } from "./documents";
import { INTERVAL, SUBGRAPH_URL } from "./config";

const client = new GraphQLClient(SUBGRAPH_URL);

export function useCampaignPlayerQuery(first = 1000, skip = 0) {
    return useQuery({
        queryKey: ["campaigns", first, skip],
        queryFn: async () => {
            const data = await client.request<{ campaigns: any[] }>(CAMPAIGNS_WITH_PLAYERS_AND_VOTES, {
                first,
                skip,
            });
            return data.campaigns;
        },
        refetchInterval: INTERVAL,
    });
}

export function usePlayerCampaignQuery(first = 1000, skip = 0) {
    return useQuery({
        queryKey: ["players", first, skip],
        queryFn: async () => {
            const data = await client.request<{ players: any[] }>(PLAYERS_WITH_CAMPAIGNS_AND_REVIEWS, {
                first,
                skip,
            });
            return data.players;
        },
        refetchInterval: INTERVAL,
    });
}