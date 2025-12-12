import { useContext, useState } from "react";
import Table from "../components/table/Table"
import styles from './campaignsPage.module.css';
import { StorageContext } from "../providers/StorageProvider";
import { useAccount } from "wagmi";
import { TabsDiv } from "../components/tabsDiv/TabsDiv";
import { NewCampaign } from "../features/campaign/newCampaign/NewCampaign";
import { newCampaign } from "../services/arcanePactServices";
import { CampaignModal } from "../features/campaign/campaignModal/CampaignModal";

const headers = [
  {name: 'state', value: 'State'},
  {name: 'title', value: 'Title'},
  {name: 'description', value: 'Description'},
  {name: 'gamemasterFee', value: 'Fee'},
  {name: 'collateral', value: 'Collateral'}
]


const CampaignsPage = () => {
  const [activeCampaign, setActiveCampaign] = useState(null);

  const { campaigns } = useContext(StorageContext);
  const { address } = useAccount();

  const owned = campaigns.filter(campaign => campaign.gamemaster === address);
  const joined = [];
  const pending = [];
  const discover = campaigns.filter(campaign => campaign.gamemaster != address && !campaign.inviteOnly);

  const tabs = [
    {
      label: "Owned",
      content: <Table headers={headers} rows={owned || []} action={(ind)=>{
        setActiveCampaign(owned[ind]);
      }} />
    },
    {
      label: "Joined",
      content: <Table headers={headers} rows={joined || []} action={(ind)=>{
        setActiveCampaign(joined[ind]);
      }} />
    },
    {
      label: "Pending",
      content: <Table headers={headers} rows={pending || []} action={(ind)=>{
        setActiveCampaign(pending[ind]);
      }} />
    },
    {
      label: "Discover",
      content: <Table headers={headers} rows={discover || []} action={(ind)=>{
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