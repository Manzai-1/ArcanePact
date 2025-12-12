import {
  ApplicationAdded as ApplicationAddedEvent,
  ApplicationAproved as ApplicationAprovedEvent,
  ApplicationRejected as ApplicationRejectedEvent,
  CampaignCreated as CampaignCreatedEvent,
  InvitationAdded as InvitationAddedEvent
} from "../generated/ArcanePact/ArcanePact"
import {
  ApplicationAdded,
  ApplicationAproved,
  ApplicationRejected,
  CampaignCreated,
  InvitationAdded
} from "../generated/schema"

export function handleApplicationAdded(event: ApplicationAddedEvent): void {
  let entity = new ApplicationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApplicationAproved(event: ApplicationAprovedEvent): void {
  let entity = new ApplicationAproved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApplicationRejected(
  event: ApplicationRejectedEvent
): void {
  let entity = new ApplicationRejected(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.owner = event.params.owner
  entity.config_title = event.params.config.title
  entity.config_description = event.params.config.description
  entity.config_inviteOnly = event.params.config.inviteOnly
  entity.config_gamemasterFee = event.params.config.gamemasterFee
  entity.config_collateral = event.params.config.collateral

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInvitationAdded(event: InvitationAddedEvent): void {
  let entity = new InvitationAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
