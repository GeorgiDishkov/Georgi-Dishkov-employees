import "./DataGrid.scss";

export const PairTable = ({ data }: any) => {
  return (
    <div className="wrapper">
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Employee ID #1</th>
              <th>Employee ID #2</th>
              <th>Project ID</th>
              <th>Days Worked Together</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row: any, index: number) => (
              <tr key={index}>
                <td>{row.Emp1}</td>
                <td>{row.Emp2}</td>
                <td>{row.ProjectID}</td>
                <td>{row.DaysWorked}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="info-text">No data to display. Please upload CSV.</p>
      )}
    </div>
  );
};
