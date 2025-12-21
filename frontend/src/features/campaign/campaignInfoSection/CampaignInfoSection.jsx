import campaignDefault from '../../../assets/default_campaign.jpg';
import styles from './campaignInfoSection.module.css';

export const CampaignInfoSection = ({ campaign }) => {

    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={campaignDefault} />
            </div>
            <div className='styles.text'>
                <h2>{campaign.title}</h2>
                <h3>{campaign.description}</h3>
                <h3>{campaign.stateText}</h3>
                <h3>{campaign.participantCount}  Joined</h3>
                <h3>{campaign.feeEth}  Fee</h3>
                <h3>{campaign.collateralEth}  Collateral</h3>
            </div>
        </div>
    )
}