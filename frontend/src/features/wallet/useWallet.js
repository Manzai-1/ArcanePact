import { useContext, useEffect, useState } from "react";
import { WalletContext } from "../../providers/WalletProvider";
import { connectWallet, getConnectedAddress } from "../../services/walletServices";


const useWallet = () => {
    const [isConnecting, setIsConnecting] = useState(false);

    const { 
        walletAddress, 
        setWalletAddress, 
    } = useContext(WalletContext);

    useEffect(() => {
    if (!window.ethereum) {
        return;
    };

    getConnectedAddress().then((address) => {
        setWalletAddress(address);
    });

    return () => {
        window.ethereum.removeListener('accountsChanged', () => {});
    };
    }, []);

    const handleConnectWallet = () => {
        setIsConnecting(true);

        connectWallet().then((address) => {
            setWalletAddress(address);
            setIsConnecting(false);
        });
    };

    const buttonText = 
        isConnecting    ? "Connecting.."    : 
        walletAddress   ? walletAddress : "Connect";

    return { buttonText, handleConnectWallet }
};


export default useWallet;