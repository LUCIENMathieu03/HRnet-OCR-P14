import { useState, FormEvent } from "react";
import Select from "react-select";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import states from "../../data/states.json";
import departments from "../../data/departements.json";
import "./formulaire.scss";

type OptionType = { value: string; label: string };

Modal.setAppElement("#root");

export default function Formulaire() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [stateSelect, setStateSelect] = useState<OptionType | null>(null);
  const [departmentSelect, setDepartmentSelect] = useState<OptionType | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

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

    console.log(values);

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
        if (key.includes("date")) {
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
      setIsOpen(true);

      for (const key in values) {
        const input = document.getElementById(`${key}`) as HTMLInputElement | null;
        if (input) {
          input.value = "";
        }
      }
      setStartDate(null);
      setBirthDate(null);
      setStateSelect(null);
      setDepartmentSelect(null);
    }
  };

  return (
    <>
      <form action="#" id="create-employee" className="formulaire" onSubmit={(e) => handleSaveEmployee(e)}>
        <h2 className="subTitle">Create Employee</h2>

        <label htmlFor="first-name">First Name </label>
        <input name="first-name" type="text" id="first-name" placeholder="First Name" />

        <label htmlFor="last-name">Last Name</label>
        <input name="last-name" type="text" id="last-name" placeholder="Last Name" />

        <label htmlFor="date-of-birth" className="visible">
          Date of Birth :<p className="indication">Please choose a day less than or equal to today</p>
        </label>
        <DatePicker
          selected={birthDate}
          onChange={(date) => setBirthDate(date)}
          placeholderText="Birth date"
          name="date-of-birth"
          id="date-of-birth"
          className="datepicker-date-of-birth"
        />

        <label htmlFor="start-date" className="visible">
          Start Date :<p className="indication">Please choose a day less than or equal to today</p>
        </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start date"
          name="start-date"
          id="start-date"
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input name="street" id="street" type="text" placeholder="Street" />

          <label htmlFor="city">City</label>
          <input name="city" id="city" type="text" placeholder="City" />

          <label htmlFor="state" className="visible">
            State :
          </label>
          <Select
            id="state"
            options={states}
            value={stateSelect}
            name="state"
            placeholder="Select a state"
            onChange={(value) => value && setStateSelect(value)}
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
          onChange={(value) => value && setDepartmentSelect(value)}
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
