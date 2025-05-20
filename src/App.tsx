import "./App.scss";
import CsvUploader from "./components/CsvUploader/CsvUploader";
import EmployeeTable from "./components/DataGrid/DataWrapper";
import { CsvProvider } from "./context/CsvContext";

function App() {
  return (
    <CsvProvider>
      <div className="App">
        <h1>CSV Uploader</h1>
        <CsvUploader />
        <EmployeeTable />
      </div>
    </CsvProvider>
  );
}

export default App;
