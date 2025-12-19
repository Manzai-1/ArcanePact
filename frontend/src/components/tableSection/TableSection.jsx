import styles from './tableSection.module.css';

export const TableSection = ({children, aria}) => {
    return (
        <section className={styles.root} aria-label={aria}>
            {children}
        </section>
    )
}