import { useState, FormEvent, ChangeEvent } from "react";
import Select, { SingleValue } from "react-select";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import states from "../../data/states.json";
import departments from "../../data/departements.json";
import "./formulaire.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { tableDataSlice } from "../../redux/reducer";

type OptionType = { value: string; label: string };

Modal.setAppElement("#root");

export default function Formulaire() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState<number>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [stateSelect, setStateSelect] = useState<OptionType | null>(null);
  const [departmentSelect, setDepartmentSelect] = useState<OptionType | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const customStyles: Modal.Styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "50%",
      paddingTop: "30px",
      textAlign: "center" as const,
    },
  };

  const handleSaveEmployee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    inputFilledCheck(values);
  };

  const showError = (input: HTMLElement | null, label: Element | null) => {
    label?.classList.add("visible", "labelError");
    input?.classList.add("inputError");
  };

  const removeError = (key: string, input: HTMLElement | null, label: Element | null) => {
    if (key !== "date-of-birth" && key !== "start-date" && key !== "state" && key !== "department") {
      label?.classList.remove("visible");
    }
    label?.classList.remove("labelError");
    input?.classList.remove("inputError");
  };

  const inputFilledCheck = (values: { [k: string]: FormDataEntryValue }) => {
    let hasError = false;
    console.log(values);

    for (const key in values) {
      const input = document.getElementById(`${key}`);
      const label = document.querySelector(`label[for="${key}"]`);
      const inputIsEmpty = values[key].toString().trim() === "";

      //reseting the error showing
      removeError(key, input, label);

      if (inputIsEmpty) {
        showError(input, label);

        hasError = true;
      } else if (!inputIsEmpty) {
        //birth an start date verification
        if (key.includes("date-of-birth")) {
          const today = new Date();
          const inputDateValue = new Date(values[key] as string);

          if (inputDateValue > today) {
            showError(input, label);

            hasError = true;
          }
        }

        //zipcode verification
        if (key.includes("zip-code")) {
          const value = values[key].toString();
          const onlyNumber = /^\d+$/.test(value);
          console.log(onlyNumber);

          if (!onlyNumber || !(value.length >= 5)) {
            showError(input, label);

            hasError = true;
          }
        }
      }
    }

    if (hasError === false) {
      const payload = {
        firstName: values["first-name"],
        lastName: values["last-name"],
        dateOfBirth: values["date-of-birth"],
        startDate: values["start-date"],
        street: values["street"],
        city: values["city"],
        state: values["state"],
        zipCode: values["zip-code"],
        department: values["department"],
      };
      dispatch(tableDataSlice.actions.saveEmployee(payload));

      setIsOpen(true);

      for (const key in values) {
        const input = document.getElementById(`${key}`) as HTMLInputElement | null;
        if (input) {
          input.value = "";
        }
      }
      setFirstName("");
      setLastName("");
      setStreet("");
      setCity("");
      setZipCode(undefined);
      setStartDate(null);
      setBirthDate(null);
      setStateSelect(null);
      setDepartmentSelect(null);
    }
  };

  const verifyInput = (
    e?: ChangeEvent<HTMLInputElement> | undefined,
    date?: Date | null | undefined,
    inputName?: string | undefined,
    value?: SingleValue<OptionType> | undefined
  ) => {
    let input;
    //Cas input simple
    if (e) {
      input = e.target;

      switch (input.id) {
        case "first-name":
          setFirstName(input.value);
          break;

        case "last-name":
          setLastName(input.value);
          break;

        case "street":
          setStreet(input.value);
          break;
        case "city":
          setCity(input.value);
          break;

        case "zip-code":
          setZipCode(parseInt(input.value));
          break;

        default:
          break;
      }
    }

    //Cas composant react
    if (inputName) {
      switch (inputName) {
        case "date-of-birth":
          if (date) {
            setBirthDate(date);
          }
          break;
        case "start-date":
          if (date) {
            setStartDate(date);
          }
          break;
        case "state":
          if (value) {
            setStateSelect(value);
          }
          break;
        case "department":
          if (value) {
            setDepartmentSelect(value);
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <form action="#" id="create-employee" className="formulaire" onSubmit={(e) => handleSaveEmployee(e)}>
        <h2 className="subTitle">Create Employee</h2>

        <label htmlFor="first-name">First Name </label>
        <input
          name="first-name"
          type="text"
          id="first-name"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => verifyInput(e)}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          name="last-name"
          type="text"
          id="last-name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => verifyInput(e)}
        />

        <label htmlFor="date-of-birth" className="visible">
          Date of Birth :<p className="indication">Please choose a day less than or equal to today</p>
        </label>
        <DatePicker
          selected={birthDate}
          // onChange={(date) => setBirthDate(date)}
          onChange={(date) => verifyInput(undefined, date, "date-of-birth")}
          placeholderText="Birth date"
          name="date-of-birth"
          id="date-of-birth"
          className="datepicker-date-of-birth"
          autoComplete="off"
        />

        <label htmlFor="start-date" className="visible">
          Start Date :<p className="indication">Please choose a day less than or equal to today</p>
        </label>
        <DatePicker
          selected={startDate}
          // onChange={(date) => setStartDate(date)}
          onChange={(date) => verifyInput(undefined, date, "start-date")}
          placeholderText="Start date"
          name="start-date"
          id="start-date"
          autoComplete="off"
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            name="street"
            id="street"
            type="text"
            placeholder="Street"
            value={street}
            onChange={(e) => verifyInput(e)}
          />

          <label htmlFor="city">City</label>
          <input name="city" id="city" type="text" placeholder="City" value={city} onChange={(e) => verifyInput(e)} />

          <label htmlFor="state" className="visible">
            State :
          </label>
          <Select
            id="state"
            options={states}
            value={stateSelect}
            name="state"
            placeholder="Select a state"
            // onChange={(value) => setStateSelect(value)}
            onChange={(value) => verifyInput(undefined, undefined, "state", value)}
            className="react-select-container"
            classNamePrefix="react-select"
          />

          <label htmlFor="zip-code">
            Zip Code : <p className="indication">Please enter at least 5 digits.</p>
          </label>
          <input
            name="zip-code"
            id="zip-code"
            type="text"
            placeholder="Zip Code"
            title="Please enter at least 5 digits."
            value={zipCode}
            onChange={(e) => verifyInput(e)}
          />
        </fieldset>

        <label htmlFor="department" className="visible">
          Department
        </label>
        <Select
          id="department"
          options={departments}
          value={departmentSelect}
          name="department"
          // onChange={(value) => setDepartmentSelect(value)}
          onChange={(value) => verifyInput(undefined, undefined, "department", value)}
          placeholder="Select a department"
          className="react-select-container"
          classNamePrefix="react-select"
        />

        <button className="saveButton">Save</button>
      </form>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Validation Modal"
      >
        <h2 className="modal__title">Employee Created!</h2>
        <button className="modal__closeButton" onClick={() => setIsOpen(false)}>
          close
        </button>
      </Modal>
    </>
  );
}
