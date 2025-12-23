import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader"
import InvitePlayers from "../invitePlayers/InvitePlayers"
import { PlayerList } from "../playerList/PlayerList"
import { useCampaignPlayerView } from "./useCampaignPlayerView"


export const CampaignPlayerView = ({campaignId, handleViewPlayer}) => {
    const model = useCampaignPlayerView(campaignId);
    if(!model) return (<div>Error</div>);

    return (
        <TableSectionWithHeader header={'Players'} aria={'Campaign Players Section'}>
            { model.canInvite &&<InvitePlayers campaignId={campaignId}/> }
            { model.hasPlayers &&<PlayerList campaignId={campaignId} handleViewPlayer={handleViewPlayer}/>}
        </TableSectionWithHeader>
    )
}