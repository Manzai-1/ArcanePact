import { ethers } from "ethers";
import { newCampaign } from "../services/arcanePactServices";
import { abi, contractAddress } from "../config/arcanePact";
import { useEffect } from "react";

const CampaignsPage = () => {

    useEffect(() => {
      async function listenToEvents() {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = new ethers.Contract(contractAddress, abi, provider);

        console.log("Listening for ALL contract events...");

        // Listen for ANY event emitted by the contract
        contract.on("*", (...rawArgs) => {
          // Ethers v6 passes event data as (...args, event)
          const event = rawArgs[rawArgs.length - 1];
          
          // Parse the log to extract event name + values
          const parsed = contract.interface.parseLog(event.log);
          

          console.log("Block:", event.log.blockNumber);
          console.log("Name:", parsed.name);
          console.log("CampaignId:", parsed.args[0]);
          console.log("Gamemaster:", parsed.args[1]);
          console.log("Values:", {
            title: parsed.args[2][0],
            description: parsed.args[2][1],
            inviteOnly: parsed.args[2][2],
            gamemasterFee: parsed.args[2][3],
            collateral: parsed.args[2][4]

          });
        });
      }

      listenToEvents();
    }, []);

  return (
    <>
      <h1>CAMPAIGNS PAGE</h1>
      <button 
        onClick={(e)=>{
          newCampaign({
            title: 'Blablabla',
            description: 'My new campaign',
            inviteOnly: true,
            gamemasterFee: 0,
            collateral: 0
          }).then((tx)=> {
            console.log(tx);
          })
        }}
      >
          Click me
      </button>
    </>
  );
};

export default CampaignsPage;