import { Link } from "react-router-dom";
import "./employeeList.scss";

const EmployeeList = () => {
  return (
    <div className="employees">
      <h1 className="title"> Current Employee</h1>
      <Link to={"/"}>
        <div className="linkButton">Back to home page </div>
      </Link>
    </div>
  );
};

export default EmployeeList;
