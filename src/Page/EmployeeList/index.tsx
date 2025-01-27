import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./employeeList.scss";
import { getData } from "../../redux/selector";
import Datatable from "datatable-ml03";
import "../../../node_modules/datatable-ml03/dist/style.css";

const EmployeeList = () => {
  const tableData = useSelector(getData);
  // console.log(tableData);

  return (
    <div className="employees">
      <h1 className="title"> Current Employee</h1>
      <Link to={"/"}>
        <div className="linkButton">Back to home page </div>
      </Link>
      <div className="employees__table">
        <Datatable dataTable={tableData} />
      </div>
    </div>
  );
};

export default EmployeeList;
