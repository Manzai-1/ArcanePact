import styles from './infoSection.module.css';

export const InfoSection = ({img, title, items, footer=null}) => {
    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <img src={img} />
            </div>
            <div className={styles.text}>
                <span className={styles.title}>{title}</span>
                {items.map(item => {
                    return (<div className={styles.item}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.value}>{item.value}</span>
                    </div>)
                })}
            </div>
            {footer &&<div className={styles.footer}>
                <span className={styles.footerTitle}>{footer.label}</span>
                <span className={styles.footerValue}>{footer.value}</span>
            </div>}
        </div>
    )
}