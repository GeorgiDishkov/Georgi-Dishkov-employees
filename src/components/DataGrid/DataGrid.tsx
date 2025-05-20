import { useEffect, useState } from "react";
import { useCsv } from "../../context/CsvContext";
import { findEmployeePairs } from "../../utils/findEmployeePairs";
import "./DataGrid.scss";

const EmployeeProjectGrid = () => {
  const [pairs, setPairs] = useState<any[]>([]);
  const { csvData } = useCsv();

  useEffect(() => {
    if (!csvData || csvData.length === 0) {
      setPairs([]);
      return;
    }
    const result = findEmployeePairs(csvData);
    setPairs(result);
  }, [csvData]);

  return (
    <div className="wrapper">
      {pairs.length > 0 ? (
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
            {pairs.map((row, index) => (
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

export default EmployeeProjectGrid;
