import { useEffect, useState } from "react";
import { GraphQLClient, gql } from "graphql-request";

const SUBGRAPH_URL = "http://localhost:8000/subgraphs/name/my-subgraph";
const client = new GraphQLClient(SUBGRAPH_URL);

// Replace CampaignCreated with your actual entity name from schema.graphql
const QUERY = gql`
  query Latest($first: Int!) {
    campaignCreateds(first: $first, orderBy: blockNumber, orderDirection: desc) {
      id
      campaignId
      owner
      blockNumber
    }
    _meta {
      block {
        number
      }
    }
  }
`;

export function useCampaignCreatedFeed(pollMs = 2000) {
  const [items, setItems] = useState<any[]>([]);
  const [indexedBlock, setIndexedBlock] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;

    async function fetchOnce() {
      const data = await client.request(QUERY, { first: 20 });
      if (!alive) return;
      setItems(data.campaignCreateds ?? []);
      setIndexedBlock(data._meta?.block?.number ?? null);
    }

    fetchOnce();
    const id = setInterval(fetchOnce, pollMs);

    return () => {
      alive = false;
      clearInterval(id);
    };
  }, [pollMs]);

  return { items, indexedBlock };
}

export const EventIndexer = () => {
  const { items, indexedBlock } = useCampaignCreatedFeed(2000);

  return (
    <div style={{ padding: 16 }}>
      <h2>Subgraph feed</h2>
      <div>Indexed block: {indexedBlock ?? "…"}</div>

      <ul>
        {items.map((e) => (
          <li key={e.id}>
            campaignId={e.campaignId} owner={e.owner} block={e.blockNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}

// import { ethers } from "ethers";
// import { newCampaign } from "./arcanePactServices";
// import { abi, contractAddress } from "../config/arcanePact";
// import { useContext, useEffect } from "react";
// import { StorageContext } from "../providers/StorageProvider";
// import { Campaign, CampaignState } from "../models/IArcanePact";

// export const EventIndexer = () => {
//     const { addCampaign, updateCampaignPlayers, updatePlayerCampaigns } = useContext<any>(StorageContext);

//     useEffect(() => {
//         async function listenToEvents() {
//         const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//         const contract = new ethers.Contract(contractAddress, abi, provider);

//         contract.on("*", (...rawArgs) => {
//             const event = rawArgs[rawArgs.length - 1];
//             const parsed: any = contract.interface.parseLog(event.log);

//             switch(parsed.name) {
//                 case "CampaignCreated": 
//                     addCampaign(mapNewCampaign(parsed.args));
//                     break;
//                 case "InvitationAdded": 
//                     addCampaign(mapNewCampaign(parsed.args));
//                     break;
//                 default:
//                     console.log('Not identified Event: ', parsed.name);
//                     break;
//             }
//         });
//         }

//         listenToEvents();
//     }, []);

//     return (
//         <>
//             <button 
//             onClick={(e)=>{
//                 newCampaign({
//                 title: 'Blablabla',
//                 description: 'My new campaign',
//                 inviteOnly: true,
//                 gamemasterFee: 0,
//                 collateral: 0
//                 }).then((tx)=> {
//                 console.log(tx);
//                 })
//             }}
//             >
//                 New Campaign
//             </button>
//         </>
//     );
// }

// const mapNewCampaign = (args: any): Campaign => {
//     return  {
//         campaignId:     args[0],
//         gamemaster:     args[1],
//         title:          args[2][0],
//         description:    args[2][1],
//         inviteOnly:     args[2][2],
//         gamemasterFee:  args[2][3],
//         collateral:     args[2][4],
//         state:          CampaignState.Initialized
//     }
// }

// const mapNewCampaignPlayer = (args: any) => {

// }

