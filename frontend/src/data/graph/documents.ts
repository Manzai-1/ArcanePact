import { gql } from "graphql-request";

export const CAMPAIGNS_QUERY = gql`
  query Campaigns($first: Int!, $skip: Int!) {
    campaigns(first: $first, skip: $skip, orderBy: id, orderDirection: desc) {
      id
      owner
      title
      description
      inviteOnly
      gamemasterFee
      collateral
      state
    }
  }
`;

export const PLAYERS_QUERY = gql`
  query Players($first: Int!, $skip: Int!) {
    players(
      first: $first
      skip: $skip
      orderBy: id
      orderDirection: desc
    ) {
      id
    }
  }
`;

export const CAMPAIGN_PLAYERS_QUERY = gql`
  query CampaignPlayers($first: Int!, $skip: Int!) {
    campaignPlayers(
      first: $first
      skip: $skip
      orderBy: id
      orderDirection: desc
    ) {
      id
      state
      player {
        id
      }
      campaign {
        id
      }
    }
  }
`;