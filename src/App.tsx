import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import EmployeeList from "./Page/EmployeeList";
import "./styles/base.scss";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employee-list" element={<EmployeeList />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
