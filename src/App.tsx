import "./App.scss";
import CsvUploader from "./components/CsvUploader/CsvUploader";
import EmployeeProjectGrid from "./components/DataGrid/DataGrid";
import { CsvProvider } from "./context/CsvContext";

function App() {
  return (
    <CsvProvider>
      <div className="App">
        <h1>CSV Uploader</h1>
        <CsvUploader />
        <EmployeeProjectGrid />
      </div>
    </CsvProvider>
  );
}

export default App;
