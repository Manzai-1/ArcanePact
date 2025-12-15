import styles from "./actionButton.module.css";

export const ActionButton = ({ label, handleClick, disabled = false }) => {
    return (
        <button
            type="button"
            className={styles.button}
            onClick={handleClick}
            disabled={disabled}
        >
            {label}
        </button>
    );
}