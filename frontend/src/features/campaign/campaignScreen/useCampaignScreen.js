import { useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";
import { ClientState } from "../../../models/IArcanePact";
import { newCampaign } from "../../../services/arcanePactServices";

export const headers = [
  {name: 'stateText', value: 'State'},
  {name: 'title', value: 'Title'},
  {name: 'description', value: 'Description'},
  {name: 'gamemasterFee', value: 'Fee'},
  {name: 'collateral', value: 'Collateral'}
]

export const filteredTables = (campaigns) => ({
    owned:      campaigns.filter(campaign => campaign.clientState === ClientState.Owner),
    joined:     campaigns.filter(campaign => campaign.clientState === ClientState.joined),
    pending:    campaigns.filter(campaign => 
        campaign.clientState === ClientState.AwaitingSignature || 
        campaign.clientState === ClientState.Applied
    ),
    discover:   campaigns.filter(campaign => campaign.clientState === ClientState.None),
});

export const useCampaignScreen = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  const { campaigns, isLoading, error } = UseGraph();
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
    submitNewCampaign: newCampaign
  }
}