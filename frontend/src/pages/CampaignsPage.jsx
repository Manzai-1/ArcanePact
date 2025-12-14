import { useState } from "react";
import Table from "../components/table/Table"
import styles from './campaignsPage.module.css';
import { TabsDiv } from "../components/tabsDiv/TabsDiv";
import { NewCampaign } from "../features/campaign/newCampaign/NewCampaign";
import { newCampaign } from "../services/arcanePactServices";
import { CampaignModal } from "../features/campaign/campaignModal/CampaignModal";
import { UseGraph } from "../data/graph/useGraph";

const headers = [
  {name: 'state', value: 'State'},
  {name: 'title', value: 'Title'},
  {name: 'description', value: 'Description'},
  {name: 'gamemasterFee', value: 'Fee'},
  {name: 'collateral', value: 'Collateral'}
]


const CampaignsPage = () => {
  const [activeCampaign, setActiveCampaign] = useState(null);

  const { owned, joined, pending, discover, isLoading, error } = UseGraph();

  if (isLoading) return <div>Loading…</div>;
  if (error) return <pre>{String(error)}</pre>;

  const tabs = [
    {
      label: "Owned",
      content: <Table headers={headers} rows={owned} action={(ind)=>{
        setActiveCampaign(owned[ind]);
      }} />
    },
    {
      label: "Joined",
      content: <Table headers={headers} rows={joined} action={(ind)=>{
        setActiveCampaign(joined[ind]);
      }} />
    },
    {
      label: "Pending",
      content: <Table headers={headers} rows={pending} action={(ind)=>{
        setActiveCampaign(pending[ind]);
      }} />
    },
    {
      label: "Discover",
      content: <Table headers={headers} rows={discover} action={(ind)=>{
        setActiveCampaign(discover[ind]);
      }} />
    },
    {
      label: "Create New",
      content: <NewCampaign onSubmit={newCampaign}/>
    }
  ];

  const handleCloseModal = () => {
    setActiveCampaign(null)
  }
  
  return (
    <>
      {activeCampaign && (
        <CampaignModal campaign={activeCampaign} handleCloseModal={handleCloseModal}/>
      )}
      <div className={styles.container}>
        <TabsDiv tabs={tabs}/>
      </div>
    </>
  );
};

export default CampaignsPage;