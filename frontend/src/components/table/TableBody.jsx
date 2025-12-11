import styles from "./table.module.css";

export default function TableBody({ headers, rows }) {
  if(!rows) {
    return (
      <tbody>
      </tbody>
    )
  }
  console.log('ROWS:', rows);
  return (
    <tbody>
      {
        rows.map((row, i)=>(
          <tr key={i}>
            {
              headers.map((header, i) => (
                <td key={i}>{row[header.name]}</td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
  );
}
