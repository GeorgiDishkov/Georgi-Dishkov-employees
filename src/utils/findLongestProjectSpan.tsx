type Entry = {
  EmpID: string;
  ProjectID: string;
  DateFrom: Date;
  DateTo: Date;
};

type ProjectInfo = {
  ProjectID: string;
  TotalDays: number;
  TotalDuration: string;
  Start: Date;
  End: Date;
  Employees: string[];
};

export const getDurationToString = (start: Date, end: Date): string => {
  let years = end?.getFullYear() - start?.getFullYear();
  let months = end?.getMonth() - start?.getMonth();
  let days = end?.getDate() - start?.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(
      end?.getFullYear(),
      end?.getMonth(),
      0
    )?.getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);

  return parts.join(", ");
};

export const findLongestProjectSpans = (data: Entry[]): ProjectInfo[] => {
  if (!data.length) return [];

  const grouped = data.reduce((acc, entry) => {
    const key = `${entry.ProjectID}_${entry.EmpID}`;
    acc[key] = [...(acc[key] || []), entry];
    return acc;
  }, {} as Record<string, Entry[]>);

  const cleanedData = Object.values(grouped).flatMap((entries) =>
    entries
      .sort((a, b) => a.DateFrom.getTime() - b.DateFrom.getTime())
      .reduce<Entry[]>((merged, current) => {
        const last = merged[merged.length - 1];
        if (last && current.DateFrom <= last.DateTo) {
          last.DateTo = new Date(
            Math.max(last.DateTo.getTime(), current.DateTo.getTime())
          );
          return merged;
        }
        return [...merged, { ...current }];
      }, [])
  );

  const projects = cleanedData.reduce(
    (acc, { ProjectID, DateFrom, DateTo, EmpID }) => {
      const current = acc[ProjectID] || {
        Start: DateFrom,
        End: DateTo,
        Employees: new Set<string>(),
      };
      if (!ProjectID || !current) return acc;

      return {
        ...acc,
        [ProjectID]: {
          Start: DateFrom < current.Start ? DateFrom : current.Start,
          End: DateTo > current.End ? DateTo : current.End,
          Employees: current.Employees.add(EmpID),
        },
      };
    },
    {} as Record<string, { Start: Date; End: Date; Employees: Set<string> }>
  );

  const result = Object.entries(projects)
    .map(([ProjectID, { Start, End, Employees }]) => ({
      ProjectID,
      Start,
      End,
      Employees: Array.from(Employees),
      TotalDays: Math.ceil(
        (End?.getTime() - Start?.getTime()) / (1000 * 60 * 60 * 24)
      ),
      TotalDuration: getDurationToString(Start, End),
    }))
    .sort((a, b) => b.TotalDays - a.TotalDays);

  return result;
};
