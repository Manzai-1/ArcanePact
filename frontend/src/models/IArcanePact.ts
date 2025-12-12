export enum CampaignState {
    Initialized = "Open",
    Running = "Running",
    Completed = "Closed"
}

enum PlayerState {
    None,
    Applied,
    Rejected,
    AwaitingSignature,
    Signed,
    InSession
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