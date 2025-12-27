import { useState } from "react";
import { UseGraph } from "../../../data/graph/useGraph";
import { CampaignState, ClientState } from "../../../models/IArcanePact";

export const headers = [
  { name: 'clientStateText', value: 'Role' },
  { name: 'title', value: 'Title' },
  { name: 'feeEth', value: 'Fee' },
  { name: 'collateralEth', value: 'Collateral' },
  { name: 'participantCount', value: 'Joined' }
];

export const historyHeaders = [
  { name: 'stateText', value: 'State' },
  { name: 'clientStateText', value: 'Role' },
  { name: 'title', value: 'Title' },
  { name: 'feeEth', value: 'Fee' },
  { name: 'collateralEth', value: 'Collateral' },
  { name: 'participantCount', value: 'Joined' }
];

export const filteredTables = (campaigns) => ({
  running: campaigns.filter(campaign => 
    campaign.state === CampaignState.Running && 
    (
      campaign.clientState === ClientState.Signed ||
      campaign.clientState === ClientState.Owner
    )
  ),
  pending: campaigns.filter(campaign =>
      campaign.state === CampaignState.Initialized && 
      campaign.clientState !== ClientState.None && 
      campaign.clientState !== ClientState.Rejected
  ),
  discover: campaigns.filter(campaign =>
    campaign.clientState === ClientState.None &&
    campaign.state === CampaignState.Initialized
  ),
  history: campaigns.filter(campaign =>
    campaign.clientState === ClientState.Rejected ||
    (
      campaign.clientState !== ClientState.None &&
      campaign.state === CampaignState.Completed
    )
  )
});

export const useCampaignScreen = () => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const { campaigns, isLoading, error } = UseGraph();
  if (isLoading || error) return { isLoading, error };

  const { running, pending, discover, history } = filteredTables(campaigns);

  const tabs = [
    { label: 'Running', rows: running, type: 'table', headers },
    { label: 'Pending', rows: pending, type: 'table', headers },
    { label: 'Discover', rows: discover, type: 'table', headers },
    { label: 'History', rows: history, type: 'table', headers: historyHeaders },
    { label: 'Create New Campaign', type: 'form' }
  ];

  return {
    isLoading,
    error,
    tabs,
    selectedCampaign,
    setSelectedCampaign,
    closeModal: () => { setSelectedCampaign(null) },
  }
}