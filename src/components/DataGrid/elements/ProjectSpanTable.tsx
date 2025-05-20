import "./DataGrid.scss";

type ProjectInfo = {
  ProjectID: string;
  TotalDays: number;
  TotalDuration: string;
  Start: Date;
  End: Date;
  Employees: string[];
};

type Props = {
  data: ProjectInfo[];
};

export const ProjectSpanTable = ({ data }: Props) => {
  return (
    <div className="wrapper">
      {data && data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Employees</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Days</th>
              <th>Total Duration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((project, index) => {
              return (
                <tr key={index}>
                  <td>{project.ProjectID}</td>
                  <td>{project.Employees.join(", ")}</td>
                  <td>{new Date(project.Start).toLocaleDateString()}</td>
                  <td>{new Date(project.End).toLocaleDateString()}</td>
                  <td>{project.TotalDays}</td>
                  <td>{project.TotalDuration}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="info-text">No project data to display.</p>
      )}
    </div>
  );
};
