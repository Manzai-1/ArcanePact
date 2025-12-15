import { ActionButton } from "../../../components/actionButton/ActionButton";
import PopupModal from "../../../components/popupModal/PopupModal";
import { ClientState } from "../../../models/IArcanePact";
import { sendApplication } from "../../../services/arcanePactServices";
import InvitePlayers from "../invitePlayers/InvitePlayers";
import { PlayerList } from "../playerList/PlayerList";
import styles from './campaignModal.module.css';

export const CampaignModal = ({campaign, handleCloseModal}) => {
    const isOwner = campaign.clientState === ClientState.Owner;
    const isApplicant = campaign.clientState === ClientState.Applied;
    const isAwaitingSignature = campaign.clientState === ClientState.AwaitingSignature;
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
                    handleClick={()=>{console.log('SIGN')}}
                />}
                {isDiscovery &&<ActionButton
                    label={'Apply'}
                    handleClick={()=>{sendApplication(campaign.id)}}
                />}
            </div>
        </PopupModal>
    );
}