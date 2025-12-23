import styles from './table.module.css';

export default function TableBody({ headers, rows, action = ()=>{}, selectedRowId=null}) {
  if(!rows) {
    return (
      <tbody>
      </tbody>
    )
  }

  return (
    <tbody>
      {
        rows.map((row)=>(
          <tr key={row.id} onClick={()=>{action(row.id)}} 
            className={selectedRowId && selectedRowId === row.id ? styles.selected : ''}>
            {
              headers.map((header, j) => (
                <td key={j}>
                  {row[header.name]}
                </td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
  );
}
