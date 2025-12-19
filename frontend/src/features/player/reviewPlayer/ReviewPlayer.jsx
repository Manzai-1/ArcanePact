import { useId, useState } from "react";
import styles from "./reviewPlayer.module.css";
import { ReviewScore } from "../../../models/IArcanePact";
import { addReview } from "../../../services/arcanePactServices";


export const ReviewPlayer = ({ campaign, player }) => {
  const groupId = useId();
  const [score, setScore] = useState(ReviewScore.Positive);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    addReview(campaign.id, player.id, score, comment);
  };

  return (
    <div className={styles.root}>
      <div className={styles.row}>
        <div className={styles.toggle} role="radiogroup" aria-label="Review score">
          <label className={styles.option}>
            <input
              className={styles.radio}
              type="radio"
              name={groupId}
              checked={score === ReviewScore.Positive}
              onChange={() => setScore(ReviewScore.Positive)}
            />
            <span className={styles.optionText}>Like</span>
          </label>

          <label className={styles.option}>
            <input
              className={styles.radio}
              type="radio"
              name={groupId}
              checked={score === ReviewScore.Negative}
              onChange={() => setScore(ReviewScore.Negative)}
            />
            <span className={styles.optionText}>Dislike</span>
          </label>
        </div>
      </div>

      <textarea
        className={styles.input}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment…"
        rows={4}
      />

      <button
        className={styles.invite}
        type="button"
        disabled={!comment.trim()}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}