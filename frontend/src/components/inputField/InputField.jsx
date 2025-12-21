import styles from "./inputField.module.css";

export const InputField = ({
    label,
    type = "text",
    value,
    placeholder,
    onChange,
    error,
}) => {
    return (
        <div className={styles.wrapper}>
            <span className={styles.label}>{label}</span>

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
        </div>
    );
};