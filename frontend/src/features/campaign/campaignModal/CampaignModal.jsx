import { ActionButton } from "../../../components/actionButton/ActionButton";
import PopupModal from "../../../components/popupModal/PopupModal";
import Table from "../../../components/table/Table";
import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader";
import { sendApplication, signCampaign, withdrawCollateral, withdrawFees } from "../../../services/arcanePactServices";
import { ReviewPlayer } from "../../player/reviewPlayer/ReviewPlayer";
import { CampaignPlayerView } from "../campaignPlayerView/CampaignPlayerView";
import InvitePlayers from "../invitePlayers/InvitePlayers";
import { PlayerList } from "../playerList/PlayerList";
import { VotesView } from "../votesView/VotesView";
import styles from './campaignModal.module.css';
import { useCampaignModal } from "./useCampaignModal";

export const CampaignModal = ({campaign, handleCloseModal}) => {
    const model = useCampaignModal(campaign);

    return (
        <>
            {model.viewPlayer &&<PopupModal onClose={model.closeViewPlayer}>
                <h2>{model.viewPlayer.id}</h2>
                <p>{model.viewPlayer.likes}</p>
                <p>{model.viewPlayer.dislikes}</p>

                <TableSectionWithHeader header={'Reviews'} aria={'Review Section'}>
                <Table
                    headers={[{name: 'score', value: 'Score'}, {name: 'comment', value: 'Comment'}]}
                    rows={model.viewPlayer.reviews}
                />
                {model.canReview &&<ReviewPlayer campaign={campaign} player={model.viewPlayer}/>}
                </TableSectionWithHeader>
            </PopupModal>}
            {!model.viewPlayer &&<PopupModal onClose={handleCloseModal}>
                <h2>{campaign.title}</h2>
                <p>{campaign.description}</p>
                <p>{campaign.id}</p>

                <CampaignPlayerView campaign={campaign} handleViewPlayer={model.handleViewPlayer}/>
                <VotesView campaign={campaign}/>
                
                <div className={styles.root}>
                    {model.canSign &&<ActionButton
                        label={'Sign'}
                        handleClick={()=>{signCampaign(campaign.id, campaign.gamemasterFee, campaign.collateral)}}
                    />}
                    {model.canApply &&<ActionButton
                        label={'Apply'}
                        handleClick={()=>{sendApplication(campaign.id)}}
                    />}
                    {(model.canWithdrawCollateral) &&<ActionButton
                        label={'Withdraw Collateral'}
                        handleClick={()=>{withdrawCollateral(campaign.id)}}
                    />}
                    {(model.canWithdrawFees) &&<ActionButton
                        label={'Withdraw Fees'}
                        handleClick={()=>{withdrawFees(campaign.id)}}
                    />}
                </div>
            </PopupModal>}
        </>
    );
}