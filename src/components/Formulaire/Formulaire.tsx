import "./formulaire.scss";
import states from "../../data/states.json";

export default function Formulaire() {
  return (
    <>
      <form action="#" id="create-employee" className="formulaire">
        <h2 className="subTitle">Create Employee</h2>

        <label htmlFor="first-name">First Name</label>
        <input type="text" id="first-name" placeholder="First Name" />

        <label htmlFor="last-name">Last Name</label>
        <input type="text" id="last-name" placeholder="Last Name" />

        <label htmlFor="date-of-birth" className="visible">
          Date of Birth :
        </label>
        <input id="date-of-birth" type="date" placeholder="Date" />

        <label htmlFor="start-date" className="visible">
          Start Date :
        </label>
        <input id="start-date" type="date" />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input id="street" type="text" placeholder="Street" />

          <label htmlFor="city">City</label>
          <input id="city" type="text" placeholder="City" />

          <label htmlFor="state-button" className="visible">
            State :
          </label>
          <select name="state" id="state">
            {states.map((state, index) => (
              <option key={`${index}-${state.code}`} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>

          <label htmlFor="zip-code" className="visible">
            Zip Code :
          </label>
          <input id="zip-code" type="number" />
        </fieldset>

        <label htmlFor="department-button">Department</label>
        <select name="department" id="department">
          <option>Sales</option>
          <option>Marketing</option>
          <option>Engineering</option>
          <option>Human Resources</option>
          <option>Legal</option>
        </select>

        <button>Save</button>
      </form>
    </>
  );
}
