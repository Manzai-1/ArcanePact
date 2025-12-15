import styles from "./table.module.css";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function Table({ headers, rows, action, selectedRow=null }) {
  return (
    <>
      <table className={styles.table}>
        <TableHead headers={headers}/>
        <TableBody headers={headers} rows={rows} action={action} selectedRow={selectedRow}/>
      </table>
    </>
  );
}
