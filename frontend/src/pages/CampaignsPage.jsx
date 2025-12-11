import { useContext } from "react";
import Table from "../components/table/Table"
import styles from './campaignsPage.module.css';
import { StorageContext } from "../providers/StorageProvider";

const rows = [
  {
    title: "Goblin Hunt",
    description: "Clear out the goblin raiders that have overrun the Western Woods.",
    fee: "20 GP",
    collateral: "5 GP",
    gamemaster: "Arvel the Wise",
    state: "Open",
  },
  {
    title: "Escort the Merchant Caravan",
    description: "Safely guide the merchant wagons through the perilous Blackstone Canyon.",
    fee: "50 GP",
    collateral: "10 GP",
    gamemaster: "Mira Stormcloak",
    state: "Pending",
  },
  {
    title: "Retrieve the Sunken Relic",
    description: "A sacred relic lies beneath Lake Miredeep. Dive into the depths and return it.",
    fee: "75 GP",
    collateral: "15 GP",
    gamemaster: "Thalos Riversong",
    state: "Open",
  },
  {
    title: "Slay the Clockwork Beast",
    description: "A rogue steam-powered monstrosity is terrorizing Brassbend Village.",
    fee: "120 GP",
    collateral: "25 GP",
    gamemaster: "Professor Gearwright",
    state: "Closed",
  },
  {
    title: "Investigate the Whispering Crypt",
    description: "Strange voices echo from the ancient catacombs. Discover their source.",
    fee: "40 GP",
    collateral: "8 GP",
    gamemaster: "Elysia Moonshade",
    state: "Pending",
  },
  {
    title: "Defend the Arcane Observatory",
    description: "Hostile forces approach the observatory. Hold them back until dawn.",
    fee: "90 GP",
    collateral: "20 GP",
    gamemaster: "Archmage Solanar",
    state: "Open",
  }
];

const headers = [
  {name: 'state', value: 'State'},
  {name: 'title', value: 'Title'},
  {name: 'description', value: 'Description'},
  {name: 'gamemasterFee', value: 'Fee'},
  {name: 'collateral', value: 'Collateral'},
  {name: 'gamemaster', value: 'GameMaster'},
]


const CampaignsPage = () => {
  const { campaigns } = useContext(StorageContext);

  console.log(campaigns);
  return (
    <>
      <div className={styles.container}>
        <Table headers={headers} rows={campaigns || []}/>
      </div>
    </>
  );
};

export default CampaignsPage;