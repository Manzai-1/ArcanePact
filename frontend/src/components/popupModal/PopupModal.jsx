import styles from "./popupModal.module.css";

export default function PopupModal({ children, onClose }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}