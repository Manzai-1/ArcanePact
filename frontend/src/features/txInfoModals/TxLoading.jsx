import styles from './txInfoModals.module.css';

export const TxLoading = () => {
    return (
        <span className={styles.pending}>Broadcasting transaction..</span>
    )
}