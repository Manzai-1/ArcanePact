import { BigInt } from "@graphprotocol/graph-ts";
import {
  CampaignCreated,
  UpdatedCampaignPlayer,
  CampaignParticipantCountChanged,
  LockedCollateralWithdrawn,
  LockedFeesWithdrawn,
  NewVoteAdded,
  PlayerLockedCollateral,
  ReviewAdded,
  UpdatedCampaignState,
  UpdatedLockedFees
} from "../generated/ArcanePact/ArcanePact";

import { Campaign, Player, CampaignPlayer } from "../generated/schema";

export function handleCampaignCreated(event: CampaignCreated): void {
  const id = event.params.campaignId.toString();

  let campaign = Campaign.load(id);
  if (campaign == null) {
    campaign = new Campaign(id);
  }

  campaign.owner = event.params.owner;
  campaign.state = event.params.campaignState;
  campaign.participantCount = event.params.participantCount;
  campaign.lockedFees = event.params.lockedFees;

  const config = event.params.config;
  campaign.title = config.title;
  campaign.description = config.description;
  campaign.inviteOnly = config.inviteOnly;
  campaign.gamemasterFee = config.gamemasterFee;
  campaign.collateral = config.collateral;

  campaign.save();
}

export function handleCampaignPlayerUpdated(event: UpdatedCampaignPlayer): void {
  const campaign = event.params.campaignId.toString();
  const playerAddress = event.params.player.toHexString().toLowerCase();
  const playerState = event.params.playerState;

  let player = Player.load(playerAddress);
  if (player == null) {
    player = new Player(playerAddress);
    player.save();
  }

  const id = campaign+'-'+playerAddress;

  let campaignPlayer = CampaignPlayer.load(id);
  if (campaignPlayer == null) {
    campaignPlayer = new CampaignPlayer(id);
    campaignPlayer.campaign = campaign;
    campaignPlayer.player = playerAddress;
    campaignPlayer.lockedCollateral = BigInt.zero();
  }

  campaignPlayer.state = playerState;
  campaignPlayer.save();
}

export function handleUpdateParticipantCount(event: CampaignParticipantCountChanged): void {
  const id = event.params.campaignId.toString();

  let campaign = Campaign.load(id);
  if (campaign == null) {
    return;
  }

  campaign.participantCount = event.params.participantCount;
  campaign.save();
}

export function handleUpdatedLockedFees(event: UpdatedLockedFees): void {
  const id = event.params.campaignId.toString();

  let campaign = Campaign.load(id);
  if (campaign == null) {
    return;
  }

  campaign.lockedFees = event.params.totalLockedFees;
  campaign.save();
}

export function handlePlayerLockedCollateral(event: PlayerLockedCollateral): void {
  const campaign = event.params.campaignId.toString();
  const playerAddress = event.params.player.toHexString().toLowerCase();

  let player = Player.load(playerAddress);
  if (player == null) {
    return;
  }

  const id = campaign+'-'+playerAddress;

  let campaignPlayer = CampaignPlayer.load(id);
  if (campaignPlayer == null) {
    return;
  }

  campaignPlayer.lockedCollateral = event.params.collateral;
  campaignPlayer.save();
}

export function handleNewVoteAdded(event: NewVoteAdded): void {
  
}

export function handleUpdatedCampaignState(event: UpdatedCampaignState): void {
  const id = event.params.campaignId.toString();

  let campaign = Campaign.load(id);
  if (campaign == null) {
    return;
  }

  campaign.state = event.params.campaignState;
  campaign.save();
}

export function handleLockedCollateralWithdrawn(event: LockedCollateralWithdrawn): void {

}

export function handleLockedFeesWithdrawn(event: LockedFeesWithdrawn): void {

}

export function handleReviewAdded(event: ReviewAdded): void {

}
