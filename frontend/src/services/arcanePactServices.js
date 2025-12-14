import { ethers } from "ethers";
import { getBrowserProvider, getSigner } from "./blockchainClient";
import { contractAddress, abi } from "../config/arcanePact";

async function getReader() {
  const provider = getBrowserProvider();
  return new ethers.Contract(contractAddress, abi, provider);
}

async function getWriter() {
  const signer = await getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
}

// Example: READ function
export async function readStoredValue() {
  const contract = await getReader();
  return await contract.storedValue(); // example solidity `storedValue` public variable
}

// Example: WRITE function
export async function setStoredValue(newValue) {
  const contract = await getWriter();
  const tx = await contract.setStoredValue(newValue);
  return tx; // UI can wait for tx.wait()
}

export const newCampaign = async (campaign) => {
    const contract = await getWriter();
    const tx = await contract.newCampaign(campaign);
    return tx; 
}

export const invitePlayers = async (campaignId, addresses) => {
    const contract = await getWriter();
    const tx = await contract.invitePlayers(campaignId, addresses);
    return tx; 
}