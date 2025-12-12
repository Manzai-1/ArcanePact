import { createContext, useState } from "react";
import { Campaign, CampaignPlayer } from "../models/IArcanePact";

interface StorageContextType {
    campaigns: Campaign[];
    campaignPlayers: Map<number, CampaignPlayer[]>;
    playerCampaigns: Map<string, number[]>;
    addCampaign: (campaign: Campaign) => void;
    updateCampaignPlayers: (campaignId: number, player: CampaignPlayer) => void;
    updatePlayerCampaigns: (player: string, campaignId: number) => void;
}

export const StorageContext = createContext<StorageContextType | null>(null);

export default function StorageProvider({ children }: any) {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [campaignPlayers, setCampaignPlayers] = useState<Map<number, CampaignPlayer[]>>(() => new Map());
    const [playerCampaigns, setPlayerCampaigns] = useState<Map<string, number[]>>(() => new Map());

    const addCampaign = (campaign: Campaign) => {
        setCampaigns((prev) => [
            ...prev,
            campaign
        ]);
    }

    function updateCampaignPlayers(campaignId: number, player: CampaignPlayer) {
        setCampaignPlayers(prev => {
            const next = new Map(prev);
            const players = next.get(campaignId) ?? [];
            next.set(campaignId, [...players, player]);
            return next;
        });
    }

    function updatePlayerCampaigns(player: string, campaignId: number) {
        setPlayerCampaigns(prev => {
            const next = new Map(prev);
            const campaignIds = next.get(player) ?? [];
            next.set(player, [...campaignIds, campaignId]);
            return next;
        });
    }

    return (
        <StorageContext.Provider value={{ 
            campaigns, 
            campaignPlayers,
            playerCampaigns,
            addCampaign,
            updateCampaignPlayers,
            updatePlayerCampaigns
        }}>
            {children}
        </StorageContext.Provider>
    )
}