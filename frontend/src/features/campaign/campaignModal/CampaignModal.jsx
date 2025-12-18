import { ActionButton } from "../../../components/actionButton/ActionButton";
import PopupModal from "../../../components/popupModal/PopupModal";
import Table from "../../../components/table/Table";
import { VoteType } from "../../../models/IArcanePact";
import { addVote, sendApplication, signCampaign, withdrawCollateral, withdrawFees } from "../../../services/arcanePactServices";
import InvitePlayers from "../invitePlayers/InvitePlayers";
import { PlayerList } from "../playerList/PlayerList";
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

                <Table
                    headers={[{name: 'score', value: 'Score'}, {name: 'comment', value: 'Comment'}]}
                    rows={model.viewPlayer.reviews}
                />
            </PopupModal>}
            {!model.viewPlayer &&<PopupModal onClose={handleCloseModal}>
                <h2>{campaign.title}</h2>
                <p>{campaign.description}</p>
                <p>{campaign.id}</p>

                { model.canInvite &&<InvitePlayers campaignId={campaign.id}/> }

                <PlayerList campaign={campaign} handleViewPlayer={model.handleViewPlayer}/>
                
                <div className={styles.root}>
                    {model.canSign &&<ActionButton
                        label={'Sign'}
                        handleClick={()=>{signCampaign(campaign.id, campaign.gamemasterFee, campaign.collateral)}}
                    />}
                    {model.canApply &&<ActionButton
                        label={'Apply'}
                        handleClick={()=>{sendApplication(campaign.id)}}
                    />}
                    {(model.canVote) &&<ActionButton
                        label={'Vote Start'}
                        handleClick={()=>{addVote(campaign.id, VoteType.StartCampaign)}}
                    />}
                    {(model.canVote) &&<ActionButton
                        label={'Vote Stop'}
                        handleClick={()=>{addVote(campaign.id, VoteType.StopCampaign)}}
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