import campaignDefault from '../../../assets/default_campaign.jpg';
import { InfoSection } from '../../../components/infoSection/InfoSection';
import { UseGraph } from '../../../data/graph/useGraph';

export const CampaignInfoSection = ({ campaignId }) => {
    const { campaigns, isLoading, error } = UseGraph();
    if(isLoading || error || !campaigns) return (<div>Error</div>);
    
    const campaign = campaigns.find(c => c.id === campaignId);

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