import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader"
import InvitePlayers from "../invitePlayers/InvitePlayers"
import { PlayerList } from "../playerList/PlayerList"
import { useCampaignPlayerView } from "./useCampaignPlayerView"


export const CampaignPlayerView = ({campaign, handleViewPlayer}) => {
    const model = useCampaignPlayerView(campaign);

    return (
        <TableSectionWithHeader header={'Players'} aria={'Campaign Players Section'}>
            { model.hasPlayers &&<PlayerList campaign={campaign} handleViewPlayer={handleViewPlayer}/>}
            { model.canInvite &&<InvitePlayers campaignId={campaign.id}/> }
            { !model.hasPlayers &&<>No players have been added yet.</>}
        </TableSectionWithHeader>
    )
}