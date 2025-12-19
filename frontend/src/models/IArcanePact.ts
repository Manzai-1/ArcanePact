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
    Signed
}

export enum ClientState {
    None,
    Applied,
    Rejected,
    AwaitingSignature,
    Signed,
    Owner
}
// export enum ClientState {
//     None,
//     Owner,
//     Joined,
//     Applied,
//     AwaitingSignature,
//     Rejected
// }

export enum ApplicationDecision {
    Approved,
    Rejected
}

export enum VoteType {
    StartCampaign,
    StopCampaign
}

export enum ReviewScore {
    Positive,
    Negative
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