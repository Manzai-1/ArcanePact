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
      lastBlock

      players(first: 1000, orderBy: id, orderDirection: asc) {
        id
        state
        lockedCollateral
        player {
          id
          name
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
      name
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
        sender {
          id
        }
        campaign {
          id
          title
        }
      }
    }
  }
`;