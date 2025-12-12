import { useState } from "react";
import styles from "./tabsDiv.module.css";

export function TabsDiv({ tabs }) {
    const [active, setActive] = useState (0);

    return (
        <div className={styles.tabsWrapper}>
            <div className={styles.tabsHeader}>
                {tabs.map((tab, i) => {
                    const isActive = active === i;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setActive(i)}
                            className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : styles.tabButtonInactive
                                }`}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            <div className={styles.tabsContent}>
                { tabs[active].content }
            </div>
        </div>
    );
}