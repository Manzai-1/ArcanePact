import { TableSectionWithHeader } from "../../components/tableSection/TableSectionWithHeader";
import styles from "./txInfoModals.module.css";

export default function TxReceipt({ receipt }) {
  if (!receipt) return (<div className={styles.item}>No Receipt</div>);

  return (
    <TableSectionWithHeader header={'Transaction Receipt'}>
        <div className={styles.grid}>
            <div className={styles.item}>
                <span className={styles.label}>Tx Hash</span>
                <span className={styles.value}>{receipt.transactionHash}</span>
            </div>
            <div className={styles.item}>
                <span className={styles.label}>Block Number</span>
                <span className={styles.value}>{receipt.blockNumber}</span>
            </div>
        </div>
    </TableSectionWithHeader>
  );
}