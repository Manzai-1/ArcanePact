import { useContext, useState } from "react";
import styles from "./reviewPlayer.module.css";
import { ReviewScore } from "../../../models/IArcanePact";
import { TxContext } from "../../../providers/TxProvider";
import { InputField } from "../../../components/inputField/InputField";
import { ActionButton } from "../../../components/buttons/ActionButton";

export const ReviewPlayer = ({ campaign, player }) => {
  const { sendTx } = useContext(TxContext);

  const [score, setScore] = useState(ReviewScore.Positive);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    sendTx("addReview", [campaign.id, player.id, { score, comment }]);
    setComment("");
  };

  return (
      <div className={styles.root}>
        <div className={styles.toggle} >
          <input
            className={styles.radio}
            type="radio"
            checked={score === ReviewScore.Positive}
            onChange={() => setScore(ReviewScore.Positive)}
          />
          <span className={styles.optionText}>Like</span>

          <input
            className={styles.radio}
            type="radio"
            checked={score === ReviewScore.Negative}
            onChange={() => setScore(ReviewScore.Negative)}
          />
          <span className={styles.optionText}>Dislike</span>
        </div>
        <div className={styles.input}>
          <InputField
            value={comment}
            placeholder="Write a comment…"
            onChange={setComment}
            error=""
          />
        </div>
        <div className={styles.button}>
          <ActionButton
            label="Submit"
            disabled={!comment.trim()}
            handleClick={handleSubmit}
          />
        </div>
      </div>
  );
};