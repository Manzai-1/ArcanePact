// src/mapping.ts
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  CampaignCreated,
  UpdatedCampaignPlayer,
} from "../generated/ArcanePact/ArcanePact";

import { Campaign, Player, CampaignPlayer } from "../generated/schema";

function ensurePlayer(id: string): void {
  let player = Player.load(id);
  if (player == null) {
    player = new Player(id);
    player.save();
  }
}

function setCampaignPlayerState(
  campaign: string,
  player: string,
  state: i32,
): void {
  const id = campaign+'-'+player;

  let cp = CampaignPlayer.load(id);
  if (cp == null) {
    cp = new CampaignPlayer(id);
    cp.campaign = campaign;
    cp.player = player;
  }

  cp.state = state;
  cp.save();
}

export function handleCampaignCreated(event: CampaignCreated): void {
  const id = event.params.campaignId.toString();

  let campaign = Campaign.load(id);
  if (campaign == null) {
    campaign = new Campaign(id);
  }

  campaign.owner = event.params.owner;
  campaign.state = event.params.campaignState;

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

  ensurePlayer(playerAddress);
  setCampaignPlayerState(campaign, playerAddress, playerState);
}

