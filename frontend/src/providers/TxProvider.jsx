import { createContext, useState } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { contractAddress, abi } from "../config/arcanePact";
import { stringify } from "viem";
import PopupModal from "../components/popupModal/PopupModal";
import { TxPending } from "../features/txInfoModals/TxPending";
import { TxFailed } from "../features/txInfoModals/TxFailed";
import TxReceipt from "../features/txInfoModals/txReceipt";

export const TxContext = createContext(null);

export default function TxProvider({ children }) {
    const [viewDialog, setViewDialog] = useState(false);

    const { data, error, isPending, isError, writeContract } = useWriteContract();
    const {
        data: receipt,
        isLoading,
        isSuccess,
    } = useWaitForTransactionReceipt({ hash: data });

    const sendTx = (name, args, value = null) => {
        setViewDialog(true);
        writeContract({
            address: contractAddress,
            abi,
            functionName: name,
            args,
            ...(value != null ? { value } : {}),
        });
    }

    const closeDialog = () => {
        setViewDialog(null);
    }

    return (
        <TxContext.Provider value={{ sendTx }}>
            <>
                {children}
                {viewDialog &&<PopupModal onClose={closeDialog}>
                    {isPending &&<TxPending/>}
                    {isSuccess &&<TxReceipt receipt={receipt} />}
                    {isError   &&<TxFailed error={(error).shortMessage || error.message}/>}
                </PopupModal>}
            </>
        </TxContext.Provider>
    );
}