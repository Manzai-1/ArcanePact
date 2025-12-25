import { TableSectionWithHeader } from '../../components/tableSection/TableSectionWithHeader';
import styles from './txInfoModals.module.css';

export const TxFailed = ({ error }) => {
    return (
        <TableSectionWithHeader header={'Transaction Failed'}>
            <div className={styles.grid}>
                <span className={styles.error}>{error}</span>
            </div>
        </TableSectionWithHeader>
    )
}