import { createContext, useState } from "react";

export const StorageContext = createContext(null);

export default function StorageProvider({children}) {
    const [campaigns, setCampaigns] = useState([]);

    const addCampaign = (campaign) => {
        setCampaigns((prev)=>[
            ...prev, 
            campaign
        ]);
    }

    return (
        <StorageContext.Provider value={{
            campaigns,
            addCampaign
        }}>
            {children}
        </StorageContext.Provider>
    )
}