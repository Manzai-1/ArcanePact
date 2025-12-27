import { TableSectionWithHeader } from "../../../components/tableSection/TableSectionWithHeader"
import styles from './playerFunds.module.css';

export const PlayerFunds = ({ profileData }) => {
    return (
        <TableSectionWithHeader header={'Funds'}>
            <div className={styles.root}>
                <div className={styles.container}>
                    <div className={styles.item}>
                        <span className={styles.label}>Locked Fees</span>
                        <span className={styles.value}>{profileData.lockedFees}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>Unlocked Fees</span>
                        <span className={styles.value}>{profileData.unlockedFees}</span>
                    </div>
                </div>
                <div className={styles.container}>
                    <div className={styles.item}>
                        <span className={styles.label}>Locked Collateral</span>
                        <span className={styles.value}>{profileData.lockedCollateral}</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>Unlocked Collateral</span>
                        <span className={styles.value}>{profileData.unlockedCollateral}</span>
                    </div>
                </div>
            </div>
        </TableSectionWithHeader>
    )
}