import { ethers } from "ethers";
import { newCampaign } from "./arcanePactServices";
import { abi, contractAddress } from "../config/arcanePact";
import { useContext, useEffect } from "react";
import { StorageContext } from "../providers/StorageProvider";

export const EventIndexer = () => {
    const { addCampaign } = useContext(StorageContext);


    useEffect(() => {
        async function listenToEvents() {
        const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = new ethers.Contract(contractAddress, abi, provider);

        contract.on("*", (...rawArgs) => {
            const event = rawArgs[rawArgs.length - 1];
            const parsed = contract.interface.parseLog(event.log);

            switch(parsed.name) {
                case "CampaignCreated": 
                    addCampaign(mapNewCampaign(parsed.args));
                    break;

                default:
                    console.log('Not identified Event: ', parsed.name);
                    break;
            }

            // console.log("Block:", event.log.blockNumber);
            // console.log("Name:", parsed.name);
            // console.log("CampaignId:", parsed.args[0]);
            // console.log("Gamemaster:", parsed.args[1]);
            // console.log("Values:", {
            //     title: parsed.args[2][0],
            //     description: parsed.args[2][1],
            //     inviteOnly: parsed.args[2][2],
            //     gamemasterFee: parsed.args[2][3],
            //     collateral: parsed.args[2][4]
            // });
        });
        }

        listenToEvents();
    }, []);

    return (
        <>
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
                New Campaign
            </button>
        </>
    );
}

const mapNewCampaign = (args) => {
    return  {
        campaignId:     args[0],
        gamemaster:     args[1],
        title:          args[2][0],
        description:    args[2][1],
        inviteOnly:     args[2][2],
        gamemasterFee:  args[2][3],
        collateral:     args[2][4]
    }
}