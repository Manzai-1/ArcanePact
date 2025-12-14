export enum CampaignState {
    Initialized = "Open",
    Running = "Running",
    Completed = "Closed"
}

export enum PlayerState {
    None,
    Applied,
    Rejected,
    AwaitingSignature,
    Signed,
    InSession
}

export enum ClientState {
    None,
    Owner,
    Joined,
    Pending,
    Rejected
}

enum ApplicationDecision {
    Approved,
    Rejected
}

export interface Campaign {
    campaignId: number;
    title: string;
    description: string;
    inviteOnly: boolean;
    gamemasterFee: number;
    collateral: number;
    gamemaster: string;
    state: CampaignState;
}

export interface NewCampaignConfig {
    title: string;
    description: string;
    inviteOnly: boolean;
    gamemasterFee: number;
    collateral: number;
}

export interface CampaignPlayer {
    address: string;
    state: PlayerState;
}