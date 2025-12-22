import styles from "./inputField.module.css";

export const InputField = ({
    type = "text",
    value,
    placeholder,
    onChange,
    error,
}) => {
    return (
        <div className={styles.inputColumn}>
            <input
                className={styles.input}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />

            <span className={styles.error}>{error}</span>
        </div>
    );
};