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
    const campaign = model.campaign;
    
    if(!model) return <>Error</>

    return (
        <>
            {model.viewPlayerId &&<PopupModal onClose={model.closeViewPlayer}>
                <PlayerInfoSection playerId={model.viewPlayerId}/>
                <TableSectionWithHeader header={'Reviews'} aria={'Review Section'}>
                <PlayerReviews playerId={model.viewPlayerId} />
                {model.canReview &&<ReviewPlayer campaignId={campaignId} playerId={model.viewPlayerId}/>}
                </TableSectionWithHeader>
            </PopupModal>}
            {!model.viewPlayerId &&<PopupModal onClose={handleCloseModal}>
                <CampaignInfoSection campaignId={campaignId}/>
                <CampaignPlayerView campaignId={campaignId} handleViewPlayer={model.handleViewPlayer}/>
                <VotesView campaignId={campaignId}/>
                
                <TableSection aria={'section for available campaign actions'}>
                    {model.canSign &&<ActionButton
                        label={'Sign'}
                        handleClick={model.handleSign}
                    />}
                    {model.canApply &&<ActionButton label={'Apply'}
                        handleClick={model.handleApply}
                    />}
                    {(model.canWithdrawCollateral) &&<ActionButton
                        label={'Withdraw Collateral'}
                        handleClick={model.handleWithdrawCollateral}
                    />}
                    {(model.canWithdrawFees) &&<ActionButton
                        label={'Withdraw Fees'}
                        handleClick={model.handleWithDrawFees}
                    />}
                </TableSection>
            </PopupModal>}
        </>
    );
}