import styles from './campaignScreen.module.css';
import { CampaignModal } from "../campaignModal/CampaignModal";
import { TabsDiv } from "../../../components/tabsDiv/TabsDiv";
import Table from "../../../components/table/Table";
import { NewCampaign } from "../newCampaign/NewCampaign";
import { useCampaignScreen } from "./useCampaignScreen";


export const CampaignScreen = () => {
  const model = useCampaignScreen();

  if (model.isLoading) return <div>Loading…</div>;
  if (model.error) return <pre>{String(error)}</pre>;

  return (
    <>
      {model.selectedCampaign &&(
        <CampaignModal campaign={model.selectedCampaign} handleCloseModal={model.closeModal}/>
      )}
      <div className={styles.container}>
        <TabsDiv tabs={model.tabs.map(tab => {
          return tab.type === 'table' ? {
            label: tab.label,
            content: <Table 
              headers={model.headers} 
              rows={tab.rows} 
              action={model.setSelectedCampaign}
            />
          } : 
          {
            label: tab.label,
            content: <NewCampaign onSubmit={model.submitNewCampaign}/>
          }
        })}
        />
      </div>
    </>
  );
};
