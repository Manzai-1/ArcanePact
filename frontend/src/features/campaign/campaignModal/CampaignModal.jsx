import { ActionButton } from "../../../components/actionButton/ActionButton";
import PopupModal from "../../../components/popupModal/PopupModal";
import { CampaignState, ClientState, VoteType } from "../../../models/IArcanePact";
import { addVote, sendApplication, signCampaign, withdrawCollateral, withdrawFees } from "../../../services/arcanePactServices";
import InvitePlayers from "../invitePlayers/InvitePlayers";
import { PlayerList } from "../playerList/PlayerList";
import styles from './campaignModal.module.css';

export const CampaignModal = ({campaign, handleCloseModal}) => {
    const isOwner = campaign.clientState === ClientState.Owner;
    const isApplicant = campaign.clientState === ClientState.Applied;
    const isAwaitingSignature = campaign.clientState === ClientState.AwaitingSignature;
    const isJoined = campaign.clientState === ClientState.Signed;
    const isCompleted = campaign.state === CampaignState.Completed;
    const isDiscovery = campaign.clientState === ClientState.None;

    return (
        <PopupModal onClose={handleCloseModal}>
            <h2>{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>{campaign.id}</p>

            { isOwner &&<InvitePlayers campaignId={campaign.id}/> }

            <PlayerList campaign={campaign}/>
            
            <div className={styles.root}>
                {isAwaitingSignature &&<ActionButton
                    label={'Sign'}
                    handleClick={()=>{signCampaign(campaign.id, campaign.gamemasterFee, campaign.collateral)}}
                />}
                {isDiscovery &&<ActionButton
                    label={'Apply'}
                    handleClick={()=>{sendApplication(campaign.id)}}
                />}
                {(isJoined || isOwner) &&<ActionButton
                    label={'Vote Start'}
                    handleClick={()=>{addVote(campaign.id, VoteType.StartCampaign)}}
                />}
                {(isJoined || isOwner) &&<ActionButton
                    label={'Vote Stop'}
                    handleClick={()=>{addVote(campaign.id, VoteType.StopCampaign)}}
                />}
                {(isJoined && isCompleted) &&<ActionButton
                    label={'Withdraw Collateral'}
                    handleClick={()=>{withdrawCollateral(campaign.id)}}
                />}
                {(isOwner && isCompleted) &&<ActionButton
                    label={'Withdraw Fees'}
                    handleClick={()=>{withdrawFees(campaign.id)}}
                />}
            </div>
        </PopupModal>
    );
}