import { CampaignState, ClientState } from "../../../models/IArcanePact"


export const useCampaignPlayerView = (campaign, viewPlayer) => {
    return {
        canInvite: 
            campaign.clientState === ClientState.Owner && 
            campaign.state === CampaignState.Initialized,
        canReview: 
            viewPlayer && 
            campaign.state === CampaignState.Completed && 
            campaign.ClientState === CampaignState.Signed,
        hasPlayers: campaign.players.length > 0
    }
}