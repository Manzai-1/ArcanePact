import styles from "./popupModal.module.css";

export default function PopupModal({ children, onClose=null }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        {onClose &&<button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>}
          {children}
      </div>
    </div>
  );
}