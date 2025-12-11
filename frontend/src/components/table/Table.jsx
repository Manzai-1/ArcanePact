import styles from "./table.module.css";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function Table({ headers, rows }) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <TableHead headers={headers}/>
        <TableBody headers={headers} rows={rows}/>
      </table>
    </div>
  );
}
