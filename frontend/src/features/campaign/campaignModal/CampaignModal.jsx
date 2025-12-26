import { ActionButton } from "../../../components/buttons/ActionButton";
import PopupModal from "../../../components/popupModal/PopupModal";
import { TableSection } from "../../../components/tableSection/TableSection";
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader";
import { PlayerInfoSection } from "../../player/playerInfoSection/PlayerInfoSection";
import { PlayerReviews } from "../../player/playerReviews/PlayerReviews";
import { ReviewPlayer } from "../../player/reviewPlayer/ReviewPlayer";
import { CampaignInfoSection } from "../campaignInfoSection/CampaignInfoSection";
import { CampaignPlayerView } from "../campaignPlayerView/CampaignPlayerView";
import { VotesView } from "../votesView/VotesView";
import { useCampaignModal } from "./useCampaignModal";

export const CampaignModal = ({campaignId, handleCloseModal}) => {
    const model = useCampaignModal(campaignId);

    if(!model) return <>Error</>
    const campaign = model.campaign;

    return (
        <>
            {model.selectedPlayerId &&<PopupModal onClose={model.closeViewPlayer}>
                <PlayerInfoSection player={model.selectedPlayer}/>
                <TableSectionWithHeader header={'Reviews'} aria={'Review Section'}>
                <PlayerReviews player={model.selectedPlayer} />
                {model.canReview &&<ReviewPlayer campaign={campaign} player={model.selectedPlayer}/>}
                </TableSectionWithHeader>
            </PopupModal>}
            {!model.selectedPlayerId &&<PopupModal onClose={handleCloseModal}>
                <CampaignInfoSection campaign={campaign}/>
                <CampaignPlayerView campaign={campaign} handleViewPlayer={model.handleViewPlayer}/>
                <VotesView campaign={campaign}/>
                
                <TableSection aria={'section for available campaign actions'}>
                    {model.actions.map((action, i) => (<ActionButton
                        key={i}
                        label={action.label}
                        handleClick={action.handleClick}
                        disabled={action.disabled}
                    />))}
                </TableSection>
            </PopupModal>}
        </>
    );
}