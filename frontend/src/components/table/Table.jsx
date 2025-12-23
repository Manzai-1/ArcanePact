import styles from "./table.module.css";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export default function Table({ headers, rows, action, selectedRowId=null }) {
  return (
    <>
      <table className={styles.table}>
        <TableHead headers={headers}/>
        <TableBody headers={headers} rows={rows} action={action} selectedRowId={selectedRowId}/>
      </table>
    </>
  );
}
