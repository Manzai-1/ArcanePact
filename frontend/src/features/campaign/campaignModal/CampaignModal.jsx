import PopupModal from "../../../components/popupModal/PopupModal";

export const CampaignModal = ({campaign, handleCloseModal}) => {
    return (
        <PopupModal onClose={handleCloseModal}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>{campaign.campaignId}</p>
        </PopupModal>
    );
}