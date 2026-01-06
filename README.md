# Arcane Pact

Arcane Pact is a decentralized application (dApp) that enables gamemasters and players to create, join, and manage online tabletop RPG campaigns in a trustless way. The system uses Ethereum smart contracts to enforce campaign rules, collateral-based commitment, and transparent campaign history.

The project consists of:
- Solidity smart contracts deployed on Ethereum Sepolia
- A React-based frontend hosted on Vercel
- Off-chain indexing via a GraphQL subgraph hosted on Goldsky

---

## Live Links

- **Hosted Frontend (Vercel):**  
  https://arcane-pact.vercel.app/

- **Verified Smart Contract (Etherscan – Sepolia):**  
  https://sepolia.etherscan.io/address/0xA78146FEd62Db4C10Db46eCd2c69396C9Ab45d0d

- **Goldsky Hosted Subgraph:**  
  https://api.goldsky.com/api/public/project_cmjjyectf9b3x01u8hkz5aewf/subgraphs/arcane-pact/1.0.4/gn

---

## Project Overview

The goal of Arcane Pact is to reduce friction and uncertainty when playing long-running RPG campaigns with strangers online. Players are required to lock collateral when joining a campaign, which is released upon successful completion. Gamemasters receive a predefined fee once the campaign ends.

Campaign data is stored on-chain and indexed off-chain to enable efficient querying while keeping the smart contracts simple and gas-efficient.

---

## Architecture

### Smart Contracts
- Written in **Solidity**
- Deployed on **Ethereum Sepolia**
- Designed with indexing in mind using emitted events
- Extensively tested using **Hardhat** and **Chai**
- Verified on Etherscan

### Frontend
- Built with React
- Hosted on Vercel
- Uses a feature-first folder structure
- Logic separated from presentation using custom hooks
- Global state handled via context providers
- Blockchain interaction handled with **Wagmi** and **RainbowKit**
- Subgraph data queried using **React Query** (`useQuery` / `useQueries`)

### Indexing
- Off-chain indexing via **GraphQL**
- Subgraph hosted on **Goldsky**
- Used to query campaign, player, voting and review data efficiently

---

## Core Features

- Wallet-based authentication (MetaMask)
- Campaign creation with configurable rules
- Player invitations and subscriptions
- Collateral-based commitment
- Campaign state transitioning via majority based voting
- Player name registration mapped to wallet addresses
- Transparent player engagement history via likes / dislikes and comments

---

## Development Notes

- Campaign duration is specified in blocks rather than timestamps
- Voting logic uses a strict majority to prevent funds from being locked
- Extensive smart contract test coverage (~96.5% line coverage)
- The frontend has very limited accessibility and responsiveness (MVP scope)

---

## Local Development

### Prerequisites
- Node.js
- MetaMask
- Sepolia ETH for testing

### Frontend
```bash
npm install
npm run dev
```

### Smart Contracts
```bash
npm install
npx hardhat test
npx hardhat deploy --network sepolia
```

### Subgraph (Goldsky)

The subgraph is intended to be run using the **poap-subgraph** setup. Clone the poap-subgraph repository from GitHub and replace the following files with the ones from this project:

- `subgraph.yaml`
- `schema.graphql`
- `src/mapping.ts`

Then follow the poap-subgraph README to generate, build, and deploy the subgraph to your own Goldsky account:

```bash
npm install
npm run codegen
npm run build
npm run deploy