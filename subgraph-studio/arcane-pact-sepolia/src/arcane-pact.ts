import {
  CampaignCreated as CampaignCreatedEvent,
  CampaignParticipantCountChanged as CampaignParticipantCountChangedEvent,
  LockedCollateralWithdrawn as LockedCollateralWithdrawnEvent,
  LockedFeesWithdrawn as LockedFeesWithdrawnEvent,
  NewVoteAdded as NewVoteAddedEvent,
  PlayerLockedCollateral as PlayerLockedCollateralEvent,
  ReviewAdded as ReviewAddedEvent,
  UpdatedCampaignPlayer as UpdatedCampaignPlayerEvent,
  UpdatedCampaignState as UpdatedCampaignStateEvent,
  UpdatedLockedFees as UpdatedLockedFeesEvent
} from "../generated/ArcanePact/ArcanePact"
import {
  CampaignCreated,
  CampaignParticipantCountChanged,
  LockedCollateralWithdrawn,
  LockedFeesWithdrawn,
  NewVoteAdded,
  PlayerLockedCollateral,
  ReviewAdded,
  UpdatedCampaignPlayer,
  UpdatedCampaignState,
  UpdatedLockedFees
} from "../generated/schema"

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.owner = event.params.owner
  entity.campaignState = event.params.campaignState
  entity.participantCount = event.params.participantCount
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

export function handleCampaignParticipantCountChanged(
  event: CampaignParticipantCountChangedEvent
): void {
  let entity = new CampaignParticipantCountChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.participantCount = event.params.participantCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLockedCollateralWithdrawn(
  event: LockedCollateralWithdrawnEvent
): void {
  let entity = new LockedCollateralWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.withdrawnAmount = event.params.withdrawnAmount
  entity.currentlyLockedAmount = event.params.currentlyLockedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLockedFeesWithdrawn(
  event: LockedFeesWithdrawnEvent
): void {
  let entity = new LockedFeesWithdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.withdrawnAmount = event.params.withdrawnAmount
  entity.currentlyLockedAmount = event.params.currentlyLockedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewVoteAdded(event: NewVoteAddedEvent): void {
  let entity = new NewVoteAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.voteType = event.params.voteType
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerLockedCollateral(
  event: PlayerLockedCollateralEvent
): void {
  let entity = new PlayerLockedCollateral(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.player = event.params.player
  entity.collateral = event.params.collateral

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReviewAdded(event: ReviewAddedEvent): void {
  let entity = new ReviewAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.recipient = event.params.recipient
  entity.sender = event.params.sender
  entity.review_score = event.params.review.score
  entity.review_comment = event.params.review.comment

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedCampaignPlayer(
  event: UpdatedCampaignPlayerEvent
): void {
  let entity = new UpdatedCampaignPlayer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.player = event.params.player
  entity.playerState = event.params.playerState

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedCampaignState(
  event: UpdatedCampaignStateEvent
): void {
  let entity = new UpdatedCampaignState(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.campaignState = event.params.campaignState

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedLockedFees(event: UpdatedLockedFeesEvent): void {
  let entity = new UpdatedLockedFees(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.totalLockedFees = event.params.totalLockedFees

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
