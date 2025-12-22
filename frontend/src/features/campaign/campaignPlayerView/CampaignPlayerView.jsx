import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader"
import InvitePlayers from "../invitePlayers/InvitePlayers"
import { PlayerList } from "../playerList/PlayerList"
import { useCampaignPlayerView } from "./useCampaignPlayerView"


export const CampaignPlayerView = ({campaign, handleViewPlayer}) => {
    const model = useCampaignPlayerView(campaign);

    return (
        <TableSectionWithHeader header={'Players'} aria={'Campaign Players Section'}>
            { model.canInvite &&<InvitePlayers campaignId={campaign.id}/> }
            { model.hasPlayers &&<PlayerList campaign={campaign} handleViewPlayer={handleViewPlayer}/>}
        </TableSectionWithHeader>
    )
}