import { ethers, formatEther } from "ethers";
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

export const sendApplication = async (campaignId) => {
    const contract = await getWriter();
    const tx = await contract.campaignApplication(campaignId);
    return tx; 
}

export const reviewApplication = async (campaignId, applicant, decision) => {
    const contract = await getWriter();
    const tx = await contract.reviewApplication(campaignId, applicant, decision);
    return tx; 
}

export const signCampaign = async (campaignId, gamemasterFee, collateral) => {
    const fee = BigInt(gamemasterFee);
    const col = BigInt(collateral);
    const value = fee + col;

    const contract = await getWriter();
    const tx = await contract.signCampaign(campaignId, {value});
    return tx; 
}

export const addVote = async (campaignId, voteType) => {
    const contract = await getWriter();
    const tx = await contract.addVote(campaignId, voteType);
    return tx; 
}

export const withdrawFees = async (campaignId) => {
    const contract = await getWriter();
    const tx = await contract.withdrawFees(campaignId);
    return tx; 
}

export const withdrawCollateral = async (campaignId) => {
    const contract = await getWriter();
    const tx = await contract.withdrawCollateral(campaignId);
    return tx; 
}

export const addReview = async (campaignId, playerId, score, comment) => {
    const contract = await getWriter();
    const tx = await contract.addReview(
      campaignId,
      playerId,
      {score, comment}
    );
    return tx; 
}