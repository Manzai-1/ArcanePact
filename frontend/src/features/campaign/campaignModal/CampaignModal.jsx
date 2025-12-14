import PopupModal from "../../../components/popupModal/PopupModal";
import InvitePlayers from "../invitePlayers/InvitePlayers";

export const CampaignModal = ({campaign, handleCloseModal}) => {
    console.log('Active:', campaign);
    return (
        <PopupModal onClose={handleCloseModal}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>{campaign.id}</p>
            <InvitePlayers campaignId={campaign.id}/>
        </PopupModal>
    );
}