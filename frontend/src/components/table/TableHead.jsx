import styles from "./table.module.css";

export default function TableHead({ headers }) {
  if(!headers || headers.length == 0) {
    return (
      <thead>
      </thead>
    )
  }

  return (
        <thead>
          <tr>
            {
              headers.map((header,i) => (
                <th key={i}>{header.value}</th>
              ))
            } 
          </tr>
        </thead>
  );
}
