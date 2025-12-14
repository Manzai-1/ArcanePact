import PopupModal from "../../../components/popupModal/PopupModal";
import { ClientState } from "../../../models/IArcanePact";
import InvitePlayers from "../invitePlayers/InvitePlayers";
import { PlayerList } from "../playerList/PlayerList";

export const CampaignModal = ({campaign, handleCloseModal}) => {
    const isOwner = () => campaign.clientState === ClientState.Owner;

    return (
        <PopupModal onClose={handleCloseModal}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>{campaign.id}</p>
            { isOwner() &&<InvitePlayers campaignId={campaign.id}/> }
            <PlayerList campaign={campaign}/>
        </PopupModal>
    );
}