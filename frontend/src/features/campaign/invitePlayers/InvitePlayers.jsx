import { useContext, useState } from "react";
import styles from "./invitePlayers.module.css";
import { TxContext } from "../../../providers/TxProvider";
import { ActionButton } from "../../../components/buttons/ActionButton";
import { InputField } from "../../../components/inputField/InputField";
import { isEvmAddress, zodValidate } from "../../../schemas/zodSchemas";


export default function InvitePlayers({ campaignId }) {
  const [address, setAddress] = useState({ value: '', error: '' });
  const [addresses, setAddresses] = useState([]);

  const { sendTx } = useContext(TxContext);
  if (!sendTx) return (<></>);

  const handleSetAddress = (address) => {
    setAddress({
      value: address,
      error: zodValidate(isEvmAddress, address)
    });
  }

  const addAddress = () => {
    if (!address.error) {
      setAddresses((prev) => [...prev, address.value]);
      setAddress({ value: '', error: null });
    }
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
            value={address.value}
            error={address.error ?? ''}
            placeholder="0x… wallet address"
            onChange={handleSetAddress}
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