import { useEffect, useState } from "react";
import { useCsv } from "../../context/CsvContext";
import { findEmployeePairs } from "../../utils/findEmployeePairs";
import { findLongestProjectSpans } from "../../utils/findLongestProjectSpan";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
import { PairTable } from "./elements/PairTable";
import { ProjectSpanTable } from "./elements/ProjectSpanTable";
import "./DataWrapper.scss";

const EmployeeTable = () => {
  const [pairData, setPairData] = useState<any>(null);
  const [longestProjectSpansData, setLongestProjectSpansData] =
    useState<any>(null);

  const [selectedButton, setSelectedButton] = useState<string | null>(
    "peir_hours"
  );
  const [isLoading, setIsLoading] = useState(false);
  const { csvData } = useCsv();

  useEffect(() => {
    if (!csvData || csvData.length === 0) {
      setPairData([]);
      setLongestProjectSpansData([]);
      return;
    }
    const result = findEmployeePairs(csvData);
    setPairData(result);
  }, [csvData]);
  const handlePairClick = () => {
    setIsLoading(true);
    const result = findEmployeePairs(csvData);
    if (result) {
      setIsLoading(false);
      setPairData(result);
    }
  };

  const handleLongestProjectClick = () => {
    const result = findLongestProjectSpans(csvData);
    setIsLoading(true);
    if (result) {
      setIsLoading(false);
      setLongestProjectSpansData(result);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      {csvData && csvData.length > 0 && (
        <div className="button-container">
          <AnimatedButton
            buttonState={
              selectedButton === "peir_hours" ? "selected" : "default"
            }
            onClick={() => {
              setSelectedButton("peir_hours");
              handlePairClick();
            }}
            customDefaultText={"pair hours"}
          ></AnimatedButton>
          <AnimatedButton
            buttonState={
              selectedButton === "overdue_project" ? "selected" : "default"
            }
            onClick={() => {
              setSelectedButton("overdue_project");
              handleLongestProjectClick();
            }}
            customDefaultText={"overdue project"}
          ></AnimatedButton>
        </div>
      )}

      <>
        {selectedButton === "peir_hours" && !isLoading && pairData && (
          <PairTable data={pairData} />
        )}
        {selectedButton === "overdue_project" &&
          !isLoading &&
          longestProjectSpansData && (
            <ProjectSpanTable data={longestProjectSpansData} />
          )}
      </>
    </div>
  );
};

export default EmployeeTable;
