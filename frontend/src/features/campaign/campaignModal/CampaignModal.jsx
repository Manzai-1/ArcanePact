import { ActionButton } from "../../../components/actionButton/ActionButton";
import PopupModal from "../../../components/popupModal/PopupModal";
import { CampaignState, ClientState, VoteType } from "../../../models/IArcanePact";
import { addVote, sendApplication, signCampaign, withdrawCollateral, withdrawFees } from "../../../services/arcanePactServices";
import InvitePlayers from "../invitePlayers/InvitePlayers";
import { PlayerList } from "../playerList/PlayerList";
import styles from './campaignModal.module.css';
import { getCapabilities } from "./useCampaignModal";

export const CampaignModal = ({campaign, handleCloseModal}) => {
    console.log('CAMPAIGN MODAL: ', campaign);
    const capabilities = getCapabilities(campaign);

    return (
        <PopupModal onClose={handleCloseModal}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>{campaign.id}</p>

            { capabilities.canInvite &&<InvitePlayers campaignId={campaign.id}/> }

            <PlayerList campaign={campaign}/>
            
            <div className={styles.root}>
                {capabilities.canSign &&<ActionButton
                    label={'Sign'}
                    handleClick={()=>{signCampaign(campaign.id, campaign.gamemasterFee, campaign.collateral)}}
                />}
                {capabilities.canApply &&<ActionButton
                    label={'Apply'}
                    handleClick={()=>{sendApplication(campaign.id)}}
                />}
                {(capabilities.canVote) &&<ActionButton
                    label={'Vote Start'}
                    handleClick={()=>{addVote(campaign.id, VoteType.StartCampaign)}}
                />}
                {(capabilities.canVote) &&<ActionButton
                    label={'Vote Stop'}
                    handleClick={()=>{addVote(campaign.id, VoteType.StopCampaign)}}
                />}
                {(capabilities.canWithdrawCollateral) &&<ActionButton
                    label={'Withdraw Collateral'}
                    handleClick={()=>{withdrawCollateral(campaign.id)}}
                />}
                {(capabilities.canWithdrawFees) &&<ActionButton
                    label={'Withdraw Fees'}
                    handleClick={()=>{withdrawFees(campaign.id)}}
                />}
            </div>
        </PopupModal>
    );
}