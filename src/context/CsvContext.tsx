import { createContext, useContext, useState, ReactNode } from "react";

export type CsvRow = {
  EmpID: string;
  ProjectID: string;
  DateFrom: string;
  DateTo: string;
};

type CsvContextType = {
  csvData: any[];
  setCsvData: (data: CsvRow[]) => void;
};

const CsvContext = createContext<CsvContextType | undefined>(undefined);

export const CsvProvider = ({ children }: { children: ReactNode }) => {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);

  return (
    <CsvContext.Provider value={{ csvData, setCsvData }}>
      {children}
    </CsvContext.Provider>
  );
};

export const useCsv = () => {
  const context = useContext(CsvContext);
  if (!context) {
    throw new Error("useCsv must be used within a CsvProvider");
  }
  return context;
};
