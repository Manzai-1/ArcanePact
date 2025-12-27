import { useCampaignPlayerQuery, usePlayerCampaignQuery } from "./queries";
import { useAccount } from "wagmi";
import { CampaignState, ClientState, PlayerState, VoteType } from "../../models/IArcanePact";
import { formatEther } from "ethers";

export const UseGraph = () => {
    const { address } = useAccount();
    const clientAdr = address ? address.toLowerCase() : null;

    const campaignPlayerQuery = useCampaignPlayerQuery(60000, 0);
    const playerCampaignQuery = usePlayerCampaignQuery(60000, 0);

    const noTrailingZero = (value) => value.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");

    const players = (playerCampaignQuery.data ?? []).map(player => {
        const campaigns = (player.campaigns ?? []).map(campaignPlayer => ({
            campaignId: campaignPlayer.campaign.id,
            campaignState: campaignPlayer.campaign.state,
            campaignStateText: CampaignState[campaignPlayer.campaign.state],
            playerState: campaignPlayer.state,
            playerStateText: PlayerState[campaignPlayer.state]
        }))

        const reviews = (player.reviews ?? []).map(review => ({
            campaignId: review.campaign.id,
            campaignTitle: review.campaign.title,
            score: review.score,
            comment: review.comment,
            sender: review.sender.id
        }))

        return {
            name: player.name,
            id: player.id,
            likes: player.likes,
            dislikes: player.dislikes,
            campaigns,
            reviews
        }
    });

    const campaigns = (campaignPlayerQuery.data ?? []).map(campaign => {
        const stateText = CampaignState[campaign.state];

        const campaignPlayers = (campaign.players ?? []).map(cp => ({
            name: cp.player.name,
            id: cp.player.id,
            lockedCollateral: cp.lockedCollateral,
            state: cp.state,
            stateText: PlayerState[cp.state],
            likes: cp.player.likes,
            dislikes: cp.player.dislikes
        }));

        const owner = players.find(player => player.id === campaign.owner);
        if (owner) campaignPlayers.push({
            name: owner.name,
            id: owner.id,
            lockedCollateral: 0,
            state: PlayerState.Owner,
            stateText: 'Owner',
            likes: owner.likes,
            dislikes: owner.dislikes
        });

        const voteTypeCount = Object.values(VoteType).filter(v => typeof v === 'number').length;
        const votes = [];
        for (let i = 0; i < voteTypeCount; i++) {
            const filteredVotes = (campaign.votes ?? []).filter(vote => vote.voteType === i);
            const voteCount = filteredVotes.length;
            const voters = filteredVotes.map(v => v.player.id);
            votes.push({
                voteType: i,
                voteName: VoteType[i],
                voteCount,
                voters
            });
        }

        let clientState = ClientState.None;
        if (campaign.owner.toLowerCase() === clientAdr) {
            clientState = ClientState.Owner;
        } else {
            const clientPlayer = campaignPlayers.find(
                player => player.id.toLowerCase() === clientAdr
            );
            if (clientPlayer) clientState = clientPlayer.state;
        }

        return {
            ...campaign,
            feeEth: `${noTrailingZero(formatEther(campaign.gamemasterFee))} Ξ`,
            collateralEth: `${noTrailingZero(formatEther(campaign.collateral))} Ξ`,
            clientState,
            clientStateText: ClientState[clientState],
            stateText,
            players: campaignPlayers,
            votes
        }
    });


    let lockedFees = 0;
    let unlockedFees = 0;
    let lockedCollateral = 0;
    let unlockedCollateral = 0;

    campaigns.forEach(campaign => {
        const isOwner = campaign.clientState === ClientState.Owner;
        const isCompleted = campaign.state === CampaignState.Completed
        const isJoined = !isCompleted && campaign.clientState === ClientState.Signed;

        if (isOwner && isCompleted) {
            unlockedFees += +campaign.lockedFees;
        }
        if (isOwner && !isCompleted) {
            lockedFees += +campaign.lockedFees;
        }
        if (isJoined && isCompleted) {
            unlockedCollateral +=
                +campaign.players.find(p => p.id.toLowerCase() === clientAdr)
                    .lockedCollateral;
        }
        if (isJoined && !isCompleted) {
            lockedCollateral +=
                +campaign.players.find(p => p.id.toLowerCase() === clientAdr)
                    .lockedCollateral;
        }
    })

    const profileData = {
        lockedFees: `${formatEther(lockedFees)} Ξ`,
        unlockedFees: `${formatEther(unlockedFees)} Ξ`,
        lockedCollateral: `${formatEther(lockedCollateral)} Ξ`,
        unlockedCollateral: `${formatEther(unlockedCollateral)} Ξ`,
    }

    // console.log('lockedFees: ', lockedFees);
    // console.log('unlockedFees: ', unlockedFees);
    // console.log('lockedCollateral: ', lockedCollateral);
    // console.log('unlockedCollateral: ', unlockedCollateral);
    // console.log('finishedCampaigns: ', finishedCampaigns);
    // console.log('activeCampaigns: ', activeCampaigns);


    return {
        profileData,
        players,
        campaigns,
        isLoading: campaignPlayerQuery.isLoading || playerCampaignQuery.isLoading,
        error: campaignPlayerQuery.error || playerCampaignQuery.error
    };
}