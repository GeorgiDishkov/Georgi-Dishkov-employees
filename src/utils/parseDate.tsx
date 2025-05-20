import { parse, isValid } from "date-fns";

export const parseDate = (dateStr: string): Date | null => {
  const formattedDate = dateStr.trim().replace(/^"|"$/g, "");

  if (
    !formattedDate ||
    formattedDate.toLowerCase() === "null" ||
    formattedDate === ""
  )
    return new Date();

  const formats = [
    "yyyy-MM-dd",
    "yyyy/MM/dd",
    "dd-MM-yyyy",
    "MM-dd-yyyy",
    "dd/MM/yyyy",
    "MM/dd/yyyy",
    "yyyy.MM.dd",
    "dd.MM.yyyy",
    "MMMM d yyyy",
    "MMMM d, yyyy",
    "yyyy-M-d HH:mm:ss",
    "yyyy-MM-dd'T'HH:mm:ssX",
  ];

  const parsed = formats
    .map((format) => parse(formattedDate, format, new Date()))
    .find((date) => isValid(date));

  if (parsed) return parsed;

  // Native Date parsing
  const native = new Date(formattedDate);
  return isValid(native) ? native : null;
};

export const splitCsvLine = (line: string): string[] => {
  const result: string[] = [];
  const buffer: string[] = [];
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(buffer.join("").trim());
      buffer.length = 0;
    } else {
      buffer.push(char);
    }
  }

  if (buffer.length > 0) {
    result.push(buffer.join("").trim());
  }

  return result;
};

export const parseCsvText = (text: string) => {
  const lines = text.split("\n").filter((line) => {
    const spitedLine = splitCsvLine(line);
    return spitedLine.length > 0 || null;
  });
  const data = lines.map((line, i) => {
    const row = splitCsvLine(line);

    if (i === 0 && row[0].toLowerCase().includes("empid")) return [];

    return {
      EmpID: row[0],
      ProjectID: row[1],
      DateFrom: parseDate(row[2]),
      DateTo: parseDate(row[3]),
    };
  });

  return data;
};
