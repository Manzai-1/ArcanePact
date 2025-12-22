import { useContext, useState } from "react";
import styles from "./invitePlayers.module.css";
import { TxContext } from "../../../providers/TxProvider";
import { ActionButton } from "../../../components/buttons/ActionButton";
import { InputField } from "../../../components/inputField/InputField";


export default function InvitePlayers({ campaignId }) {
  const [address, setAddress] = useState("");
  const [addresses, setAddresses] = useState([]);

  const { sendTx } = useContext(TxContext);

  const addAddress = () => {
    setAddresses((prev) => [...prev, address]);
    setAddress("");
  };

  const handleInvite = () => {
    if (addresses.length === 0) return;

    sendTx("invitePlayers", [campaignId, addresses]);
    setAddresses([]);
    setAddress("");
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.input}>
          <InputField
            value={address}
            placeholder="0x… wallet address"
            onChange={setAddress}
          />
        </div>
          <div className={styles.button}>
          <ActionButton
            label="Add Player"
            disabled={!address}
            handleClick={addAddress}
          />
        </div>
      </div>

      {addresses.length > 0 && (
        <div className={styles.list}>
          {addresses.map((addr) => (
            <div key={addr} className={styles.listItem}>
              <span>{addr}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.actionButton}>
        <ActionButton
          label="Invite Players"
          disabled={addresses.length === 0}
          handleClick={handleInvite}
        />
      </div>
    </>
  );
}