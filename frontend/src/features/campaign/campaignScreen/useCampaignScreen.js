import { useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";
import { CampaignState, ClientState } from "../../../models/IArcanePact";

export const headers = [
  {name: 'stateText', value: 'State'},
  {name: 'title', value: 'Title'},
  {name: 'feeEth', value: 'Fee'},
  {name: 'collateralEth', value: 'Collateral'},
  {name: 'participantCount', value: 'Joined'}
]

export const filteredTables = (campaigns) => ({
    owned:      campaigns.filter(campaign => campaign.clientState === ClientState.Owner),
    joined:     campaigns.filter(campaign => campaign.clientState === ClientState.Signed),
    pending:    campaigns.filter(campaign => 
        (campaign.clientState === ClientState.AwaitingSignature || 
        campaign.clientState === ClientState.Applied ) &&
        campaign.state === CampaignState.Initialized
    ),
    discover:   campaigns.filter(campaign => 
      campaign.clientState === ClientState.None &&
      campaign.state === CampaignState.Initialized
    ),
});

export const useCampaignScreen = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const { campaigns, isLoading, error } = UseGraph();
  if(isLoading || error ) return {isLoading, error};

  const { owned, joined, pending, discover } = filteredTables(campaigns);

  const tabs = [
    {label: 'Owned',    rows: owned, type:'table'},
    {label: 'Joined',   rows: joined, type:'table'},
    {label: 'Pending',  rows: pending, type:'table'},
    {label: 'Discover', rows: discover, type:'table'},
    {label: 'Create New Campaign', type:'form'}
  ];

  return {
    isLoading,
    error,
    headers,
    tabs,
    selectedCampaign,
    setSelectedCampaign,
    closeModal: ()=>{setSelectedCampaign(null)},
  }
}