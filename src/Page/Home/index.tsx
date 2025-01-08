import { Link } from "react-router-dom";
import Formulaire from "../../components/Formulaire/Formulaire.tsx";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">HRnet</h1>
      <Link to={"/employee-list"}>
        <div className="linkButton">View Current Employees </div>
      </Link>
      <Formulaire />
    </div>
  );
};

export default Home;
