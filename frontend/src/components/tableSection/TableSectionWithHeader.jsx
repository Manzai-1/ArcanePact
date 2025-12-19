import styles from './tableSection.module.css';

export const TableSectionWithHeader = ({children, header, aria}) => {
    return (
        <section className={styles.root} aria-label={aria}>
            <h2>{header}</h2>
            {children}
        </section>
    )
}