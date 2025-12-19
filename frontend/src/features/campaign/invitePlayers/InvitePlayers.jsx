import { useState } from "react";
import styles from "./invitePlayers.module.css";
import { invitePlayers } from "../../../services/arcanePactServices";
import { TableSection } from "../../../components/tableSection/TableSection";

export default function InvitePlayers({ campaignId }) {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);

  const add = () => {
    const n = name.trim();
    if (!n || names.includes(n)) return;
    setNames([...names, n]);
    setName("");
  };

  const remove = (n) => setNames(names.filter((x) => x !== n));

  const handleInvite = async (addresses) => {
      console.log(`Invite to [${campaignId}] players: ${addresses}`);
      await invitePlayers(campaignId, addresses).then((tx)=>{
        console.log(tx.wait());
        setName('');
        setNames([]);
      })
  }

  return (
    <TableSection aria={'Invite Player Section'}>
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
    </TableSection>
  );
}
