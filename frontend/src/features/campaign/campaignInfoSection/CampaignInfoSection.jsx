
export const CampaignInfoSection = ({campaign}) => {

    return (
        <>
            <h1>{campaign.title}</h1>
            <h3>{campaign.description}</h3>
        </>
    )
}