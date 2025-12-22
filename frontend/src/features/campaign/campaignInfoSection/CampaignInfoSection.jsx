import campaignDefault from '../../../assets/default_campaign.jpg';
import { InfoSection } from '../../../components/infoSection/InfoSection';

export const CampaignInfoSection = ({ campaign }) => {
    const items = [
        {label: 'State', value: campaign.stateText},
        {label: 'Joined', value: campaign.participantCount},
        {label: 'Fee', value: campaign.feeEth},
        {label: 'Collateral', value: campaign.collateralEth}
    ]

    const footer = {
        label: 'Description',
        value: campaign.description
    }

    return (
        <InfoSection 
            img={campaignDefault} 
            title={campaign.title}
            items={items}
            footer={footer}
        />
    )
}