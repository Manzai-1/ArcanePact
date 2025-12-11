import { ethers } from "ethers";

export function getBrowserProvider() {
  if (!window.ethereum) {
    throw new Error("No crypto wallet found");
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner() {
  const provider = getBrowserProvider();
  return await provider.getSigner();
}