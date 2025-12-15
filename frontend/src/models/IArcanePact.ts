export enum CampaignState {
    Initialized,
    Running,
    Completed
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
    Applied,
    AwaitingSignature,
    Rejected
}

export enum ApplicationDecision {
    Approved,
    Rejected
}

export interface ApplicationReview {
    address: string;
    decision: ApplicationDecision;
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