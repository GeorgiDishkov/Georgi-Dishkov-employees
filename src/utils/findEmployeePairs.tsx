type Entry = {
  EmpID: string;
  ProjectID: string;
  DateFrom: Date;
  DateTo: Date;
};

type ResultRow = {
  Emp1: string;
  Emp2: string;
  ProjectID: string;
  DaysWorked: number;
};

const getOverlapDays = (
  aFrom: Date,
  aTo: Date,
  bFrom: Date,
  bTo: Date
): number => {
  const start = new Date(Math.max(aFrom.getTime(), bFrom.getTime()));
  const end = new Date(Math.min(aTo.getTime(), bTo.getTime()));
  const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  return days > 0 ? Math.ceil(days) : 0;
};

export const findEmployeePairs = (data: Entry[]): ResultRow[] => {
  const groupedByProject = data.reduce<Record<string, Entry[]>>((acc, curr) => {
    acc[curr.ProjectID] = [...(acc[curr.ProjectID] || []), curr];
    return acc;
  }, {});

  return Object.entries(groupedByProject)
    .flatMap(([projectId, entries]) =>
      entries.flatMap((emp1, i) =>
        entries.slice(i + 1).flatMap((emp2) => {
          const days = getOverlapDays(
            emp1.DateFrom,
            emp1.DateTo,
            emp2.DateFrom,
            emp2.DateTo
          );

          return days > 0
            ? [
                {
                  Emp1: emp1.EmpID,
                  Emp2: emp2.EmpID,
                  ProjectID: projectId,
                  DaysWorked: days,
                },
              ]
            : [];
        })
      )
    )
    .sort((a, b) => b.DaysWorked - a.DaysWorked);
};
