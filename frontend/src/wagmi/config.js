import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia } from 'wagmi/chains';


export const wagmiConfig = getDefaultConfig({
  appName: 'ArcanePact',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [hardhat, sepolia],
  ssr: false
});