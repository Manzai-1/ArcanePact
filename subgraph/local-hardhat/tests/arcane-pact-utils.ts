import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
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
} from "../generated/ArcanePact/ArcanePact"

export function createCampaignCreatedEvent(
  campaignId: BigInt,
  owner: Address,
  campaignState: i32,
  participantCount: BigInt,
  config: ethereum.Tuple
): CampaignCreated {
  let campaignCreatedEvent = changetype<CampaignCreated>(newMockEvent())

  campaignCreatedEvent.parameters = new Array()

  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignState",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(campaignState))
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "participantCount",
      ethereum.Value.fromUnsignedBigInt(participantCount)
    )
  )
  campaignCreatedEvent.parameters.push(
    new ethereum.EventParam("config", ethereum.Value.fromTuple(config))
  )

  return campaignCreatedEvent
}

export function createCampaignParticipantCountChangedEvent(
  campaignId: BigInt,
  participantCount: BigInt
): CampaignParticipantCountChanged {
  let campaignParticipantCountChangedEvent =
    changetype<CampaignParticipantCountChanged>(newMockEvent())

  campaignParticipantCountChangedEvent.parameters = new Array()

  campaignParticipantCountChangedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  campaignParticipantCountChangedEvent.parameters.push(
    new ethereum.EventParam(
      "participantCount",
      ethereum.Value.fromUnsignedBigInt(participantCount)
    )
  )

  return campaignParticipantCountChangedEvent
}

export function createLockedCollateralWithdrawnEvent(
  campaignId: BigInt,
  withdrawnAmount: BigInt,
  currentlyLockedAmount: BigInt
): LockedCollateralWithdrawn {
  let lockedCollateralWithdrawnEvent =
    changetype<LockedCollateralWithdrawn>(newMockEvent())

  lockedCollateralWithdrawnEvent.parameters = new Array()

  lockedCollateralWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  lockedCollateralWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawnAmount",
      ethereum.Value.fromUnsignedBigInt(withdrawnAmount)
    )
  )
  lockedCollateralWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "currentlyLockedAmount",
      ethereum.Value.fromUnsignedBigInt(currentlyLockedAmount)
    )
  )

  return lockedCollateralWithdrawnEvent
}

export function createLockedFeesWithdrawnEvent(
  campaignId: BigInt,
  withdrawnAmount: BigInt,
  currentlyLockedAmount: BigInt
): LockedFeesWithdrawn {
  let lockedFeesWithdrawnEvent = changetype<LockedFeesWithdrawn>(newMockEvent())

  lockedFeesWithdrawnEvent.parameters = new Array()

  lockedFeesWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  lockedFeesWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "withdrawnAmount",
      ethereum.Value.fromUnsignedBigInt(withdrawnAmount)
    )
  )
  lockedFeesWithdrawnEvent.parameters.push(
    new ethereum.EventParam(
      "currentlyLockedAmount",
      ethereum.Value.fromUnsignedBigInt(currentlyLockedAmount)
    )
  )

  return lockedFeesWithdrawnEvent
}

export function createNewVoteAddedEvent(
  campaignId: BigInt,
  voteType: i32,
  player: Address
): NewVoteAdded {
  let newVoteAddedEvent = changetype<NewVoteAdded>(newMockEvent())

  newVoteAddedEvent.parameters = new Array()

  newVoteAddedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  newVoteAddedEvent.parameters.push(
    new ethereum.EventParam(
      "voteType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(voteType))
    )
  )
  newVoteAddedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return newVoteAddedEvent
}

export function createPlayerLockedCollateralEvent(
  campaignId: BigInt,
  player: Address,
  collateral: BigInt
): PlayerLockedCollateral {
  let playerLockedCollateralEvent =
    changetype<PlayerLockedCollateral>(newMockEvent())

  playerLockedCollateralEvent.parameters = new Array()

  playerLockedCollateralEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  playerLockedCollateralEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  playerLockedCollateralEvent.parameters.push(
    new ethereum.EventParam(
      "collateral",
      ethereum.Value.fromUnsignedBigInt(collateral)
    )
  )

  return playerLockedCollateralEvent
}

export function createReviewAddedEvent(
  campaignId: BigInt,
  recipient: Address,
  sender: Address,
  review: ethereum.Tuple
): ReviewAdded {
  let reviewAddedEvent = changetype<ReviewAdded>(newMockEvent())

  reviewAddedEvent.parameters = new Array()

  reviewAddedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )
  reviewAddedEvent.parameters.push(
    new ethereum.EventParam("review", ethereum.Value.fromTuple(review))
  )

  return reviewAddedEvent
}

export function createUpdatedCampaignPlayerEvent(
  campaignId: BigInt,
  player: Address,
  playerState: i32
): UpdatedCampaignPlayer {
  let updatedCampaignPlayerEvent =
    changetype<UpdatedCampaignPlayer>(newMockEvent())

  updatedCampaignPlayerEvent.parameters = new Array()

  updatedCampaignPlayerEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  updatedCampaignPlayerEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  updatedCampaignPlayerEvent.parameters.push(
    new ethereum.EventParam(
      "playerState",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(playerState))
    )
  )

  return updatedCampaignPlayerEvent
}

export function createUpdatedCampaignStateEvent(
  campaignId: BigInt,
  campaignState: i32
): UpdatedCampaignState {
  let updatedCampaignStateEvent =
    changetype<UpdatedCampaignState>(newMockEvent())

  updatedCampaignStateEvent.parameters = new Array()

  updatedCampaignStateEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  updatedCampaignStateEvent.parameters.push(
    new ethereum.EventParam(
      "campaignState",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(campaignState))
    )
  )

  return updatedCampaignStateEvent
}

export function createUpdatedLockedFeesEvent(
  campaignId: BigInt,
  totalLockedFees: BigInt
): UpdatedLockedFees {
  let updatedLockedFeesEvent = changetype<UpdatedLockedFees>(newMockEvent())

  updatedLockedFeesEvent.parameters = new Array()

  updatedLockedFeesEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  updatedLockedFeesEvent.parameters.push(
    new ethereum.EventParam(
      "totalLockedFees",
      ethereum.Value.fromUnsignedBigInt(totalLockedFees)
    )
  )

  return updatedLockedFeesEvent
}
