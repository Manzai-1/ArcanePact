import styles from './table.module.css';

export default function TableBody({ headers, rows, action = ()=>{}, selectedRow=null}) {
  if(!rows) {
    return (
      <tbody>
      </tbody>
    )
  }

  return (
    <tbody>
      {
        rows.map((row, i)=>(
          <tr key={i} onClick={()=>{action(i)}} className={selectedRow === i ? styles.selected : ''}>
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
