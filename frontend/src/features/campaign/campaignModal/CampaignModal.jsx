import { ActionButton } from "../../../components/actionButton/ActionButton";
import PopupModal from "../../../components/popupModal/PopupModal";
import Table from "../../../components/table/Table";
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader";
import { PlayerInfoSection } from "../../player/playerInfoSection/PlayerInfoSection";
import { ReviewPlayer } from "../../player/reviewPlayer/ReviewPlayer";
import { CampaignInfoSection } from "../campaignInfoSection/CampaignInfoSection";
import { CampaignPlayerView } from "../campaignPlayerView/CampaignPlayerView";
import { VotesView } from "../votesView/VotesView";
import styles from './campaignModal.module.css';
import { useCampaignModal } from "./useCampaignModal";

export const CampaignModal = ({campaign, handleCloseModal}) => {
    const model = useCampaignModal(campaign);

    return (
        <>
            {model.viewPlayer &&<PopupModal onClose={model.closeViewPlayer}>
                <PlayerInfoSection player={model.viewPlayer}/>
                <TableSectionWithHeader header={'Reviews'} aria={'Review Section'}>
                {model.rows &&<Table headers={model.headers} rows={model.rows}/>}
                {!model.rows &&<>No reviews available..</>}
                {model.canReview &&<ReviewPlayer campaign={campaign} player={model.viewPlayer}/>}
                </TableSectionWithHeader>
            </PopupModal>}
            {!model.viewPlayer &&<PopupModal onClose={handleCloseModal}>
                <CampaignInfoSection campaign={campaign}/>
                <CampaignPlayerView campaign={campaign} handleViewPlayer={model.handleViewPlayer}/>
                <VotesView campaign={campaign}/>
                
                <div className={styles.root}>
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
                </div>
            </PopupModal>}
        </>
    );
}