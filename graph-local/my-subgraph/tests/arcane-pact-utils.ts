import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ApplicationAdded,
  ApplicationAproved,
  ApplicationRejected,
  CampaignCreated,
  InvitationAdded
} from "../generated/ArcanePact/ArcanePact"

export function createApplicationAddedEvent(
  campaignId: BigInt,
  player: Address
): ApplicationAdded {
  let applicationAddedEvent = changetype<ApplicationAdded>(newMockEvent())

  applicationAddedEvent.parameters = new Array()

  applicationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  applicationAddedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return applicationAddedEvent
}

export function createApplicationAprovedEvent(
  campaignId: BigInt,
  player: Address
): ApplicationAproved {
  let applicationAprovedEvent = changetype<ApplicationAproved>(newMockEvent())

  applicationAprovedEvent.parameters = new Array()

  applicationAprovedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  applicationAprovedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return applicationAprovedEvent
}

export function createApplicationRejectedEvent(
  campaignId: BigInt,
  player: Address
): ApplicationRejected {
  let applicationRejectedEvent = changetype<ApplicationRejected>(newMockEvent())

  applicationRejectedEvent.parameters = new Array()

  applicationRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  applicationRejectedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return applicationRejectedEvent
}

export function createCampaignCreatedEvent(
  campaignId: BigInt,
  owner: Address,
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
    new ethereum.EventParam("config", ethereum.Value.fromTuple(config))
  )

  return campaignCreatedEvent
}

export function createInvitationAddedEvent(
  campaignId: BigInt,
  player: Address
): InvitationAdded {
  let invitationAddedEvent = changetype<InvitationAdded>(newMockEvent())

  invitationAddedEvent.parameters = new Array()

  invitationAddedEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  invitationAddedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return invitationAddedEvent
}
