import React, { useState, useRef } from "react";
import { useCsv } from "../../context/CsvContext";
import { parseCsvText } from "../../utils/parseDate";
import "./CsvUploader.scss";
import AnimatedButton from "../AnimatedButton/AnimatedButton";

const CsvUploader = () => {
  const [error, setError] = useState<string | null>(null);
  const [buttonState, setButtonState] = useState<
    "default" | "loading" | "success" | "abort"
  >("default");
  const [filename, setFilename] = useState<string | null>(null);
  const { setCsvData } = useCsv();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("No file selected. Please select a CSV file.");
      setButtonState("default");
      return;
    }

    setFilename(file.name);
    setButtonState("loading");

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const result = parseCsvText(text);
        setCsvData(result as any);
        setError(null);
        setButtonState("success");

        setTimeout(() => {
          setButtonState("abort");
        }, 100);
      } catch (err) {
        setError("Failed to parse CSV file.");
        setButtonState("abort");
      }
    };

    reader.onerror = () => {
      setError("Error reading the file. Please try again.");
      setButtonState("abort");
    };

    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    if (buttonState === "default") {
      inputRef.current?.click();
      setButtonState("loading");
    }
  };

  const handleAbort = () => {
    setError(null);
    setFilename(null);
    setButtonState("default");
    setCsvData([]);
    if (inputRef.current) {
      inputRef.current.value = ""; // Reset file input
    }
  };

  return (
    <div className="container">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="hiddenInput"
      />

      <AnimatedButton
        onClick={buttonState === "abort" ? handleAbort : triggerFileInput}
        buttonState={buttonState}
        customSuccessText="Success"
        customAbortText="Clear"
        customDefaultText="Upload CSV"
      />

      {filename && (
        <div className="info">
          <p className="filename">📄{filename}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CsvUploader;
