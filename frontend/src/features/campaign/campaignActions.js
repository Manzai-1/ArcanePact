// import { Campaign, CampaignState } from "../../models/IArcanePact";

// export const getCampaignActions = (campaign, address) => {
//     const actions = [];

//     const isGamemaster = campaign.owner === address;
//     const isOpen = campaign.state === CampaignState.Initialized;
//     const isParticipant = campaign.playerList?.includes(viewerAddress ?? "");
//     const hasInvite = campaign.invitedList?.includes(viewerAddress ?? "");
//     const hasPendingApplication = campaign.applications?.includes(viewerAddress ?? "");

//     if (!address) return actions;

//     if (!isGamemaster && isOpen && !isParticipant && !hasPendingApplication && !hasInvite) {
//         actions.push("apply");
//     }

//     if (!isGamemaster && hasPendingApplication) {
//         actions.push("cancelApplication");
//     }

//     if (!isGamemaster && hasInvite) {
//         actions.push("acceptInvite", "rejectInvite");
//     }

//     if (isGamemaster && isOpen) {
//         actions.push("start");
//     }

//     if (isGamemaster && campaign.state === CampaignState.Running) {
//         actions.push("end");
//     }
// }