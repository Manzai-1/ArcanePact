import styles from "./button.module.css";

export const SubmitButton = ({ label, disabled = false }) => {
    return (
        <button
            type="submit"
            className={styles.button}
            disabled={disabled}
        >
            {label}
        </button>
    );
}