import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import EmployeeList from "./Page/EmployeeList";
import "./styles/base.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
