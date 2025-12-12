export default function TableBody({ headers, rows, action = ()=>{} }) {
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
          <tr key={i} onClick={()=>{action(i)}}>
            {
              headers.map((header, i) => (
                <td key={i}>
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
