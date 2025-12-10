import { createContext, useState } from "react";

export const WalletContext = createContext(null);

export default function WalletProvider({children}) {
    const [walletAddress, setWalletAddress] = useState(null);

    return (
        <WalletContext.Provider value={{
            walletAddress, 
            setWalletAddress, 
        }}>
            {children}
        </WalletContext.Provider>
    )
}