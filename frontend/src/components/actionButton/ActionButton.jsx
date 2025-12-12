import styles from "./actionButton.module.css";

export const TableButton = ({ label, onClick, payload, disabled = false }) => {
    const handleClick = () => {
        if (disabled) return;
        if (onClick) {
            onClick(payload);
        }
    };

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