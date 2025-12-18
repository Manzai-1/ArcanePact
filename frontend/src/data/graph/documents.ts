import { gql } from "graphql-request";

export const CAMPAIGNS_WITH_PLAYERS_AND_VOTES = gql`
  query CampaignsWithPlayersAndVotes {
    campaigns(first: 1000, orderBy: id, orderDirection: asc) {
      id
      owner
      title
      description
      inviteOnly
      gamemasterFee
      collateral
      state
      lockedFees
      participantCount

      players(first: 1000, orderBy: id, orderDirection: asc) {
        id
        state
        lockedCollateral
        player {
          id
          likes
          dislikes
        }
      }

      votes(first: 1000, orderBy: id, orderDirection: asc) {
        id
        voteType
        player {
          id
        }
      }
    }
  }
`;

export const PLAYERS_WITH_CAMPAIGNS_AND_REVIEWS = gql`
  query PlayersWithCampaignsAndReviews {
    players(first: 1000, orderBy: id, orderDirection: asc) {
      id
      likes
      dislikes

      campaigns(first: 1000, orderBy: id, orderDirection: asc) {
        id
        state
        lockedCollateral
        campaign {
          id
          title
          state
        }
      }

      reviews(first: 1000, orderBy: id, orderDirection: desc) {
        id
        score
        comment
        campaign {
          id
          title
        }
      }
    }
  }
`;

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
      lockedFees
      participantCount
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