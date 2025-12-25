import styles from "./siteAgreement.module.css";
import { ActionButton } from "../../components/buttons/ActionButton";
import PopupModal from "../../components/popupModal/PopupModal";
import { TableSectionWithHeader } from "../../components/tableSection/TableSectionWithHeader";
import { useState } from "react";

export const SiteAgreement = ({setHasAgreed}) => {
    const [accepted, setAccepted] = useState(false);
    
    const handleContinue = () => {
        localStorage.setItem("legalAccepted", "true");
        setHasAgreed("true");
    }

    return (
        <PopupModal>
            <TableSectionWithHeader header={"Important Notice"}>
                <div className={styles.container}>
                    <p className={styles.text}>
                        This is an educational, non-commercial application using non-custodial
                        smart contracts on the Ethereum Sepolia testnet.
                    </p>

                    <label className={styles.checkboxRow}>
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                        />
                        <span>
                            I confirm that I am at least 18 years old and understand that this
                            application is non-custodial, experimental, and may involve risk of
                            loss. Transactions are irreversible and assets have no real-world
                            value.
                        </span>
                    </label>

                    <div className={styles.actions}>
                        <ActionButton
                            label={"Continue"}
                            handleClick={handleContinue}
                            disabled={!accepted}
                        />
                    </div>
                </div>
            </TableSectionWithHeader>
        </PopupModal>
    );
};
