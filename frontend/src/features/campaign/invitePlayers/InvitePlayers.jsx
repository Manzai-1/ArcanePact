import { useContext, useState } from "react";
import styles from "./invitePlayers.module.css";
import { TxContext } from "../../../providers/TxProvider";

export default function InvitePlayers({ campaignId }) {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const { sendTx } = useContext(TxContext);

  const add = () => {
    const n = name.trim();
    if (!n || names.includes(n)) return;
    setNames([...names, n]);
    setName("");
  };

  const remove = (n) => setNames(names.filter((x) => x !== n));

  const handleInvite = async (addresses) => {
    sendTx('invitePlayers', [campaignId, addresses]);
    setName('');
    setNames([]);
  }

  return (
    <>
      <div className={styles.row}>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="0x… wallet address"
        />
        <button className={styles.button} type="button" onClick={add}>
          Add
        </button>
      </div>

      {names.length > 0 && (
        <ul className={styles.list}>
          {names.map((n) => (
            <li key={n} className={styles.item}>
              <span>{n}</span>
              <button
                className={styles.iconButton}
                type="button"
                onClick={() => remove(n)}
                aria-label={`Remove ${n}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        className={styles.invite}
        type="button"
        disabled={names.length === 0}
        onClick={() => handleInvite(names)}
      >
        Invite
      </button>
    </>
  );
}
