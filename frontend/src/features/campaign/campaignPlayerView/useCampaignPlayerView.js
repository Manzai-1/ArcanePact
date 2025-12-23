import { UseGraph } from "../../../data/graph/useGraph";
import { CampaignState, ClientState } from "../../../models/IArcanePact"


export const useCampaignPlayerView = (campaignId, viewPlayer) => {
    const { campaigns, isLoading, error } = UseGraph();
    if(isLoading || error || !campaigns) return null;

    const campaign = campaigns.find(c => c.id === campaignId);
    
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