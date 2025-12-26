import styles from './txInfoModals.module.css';

export const TxLoading = () => {
    return (
        <span class={styles.pending}>Broadcasting transaction..</span>
    )
}