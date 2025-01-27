import { createSlice } from "@reduxjs/toolkit";

export type StateType = {
  tableDatas: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    startDate: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    department: string;
  }[];
};

const state: StateType = {
  tableDatas: [],
};

export const tableDataSlice = createSlice({
  name: "tableDatas",
  initialState: state,
  reducers: {
    saveEmployee: (state, action) => {
      state.tableDatas.push({
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dateOfBirth: action.payload.dateOfBirth,
        startDate: action.payload.startDate,
        street: action.payload.street,
        city: action.payload.city,
        state: action.payload.state,
        zipCode: action.payload.zipCode,
        department: action.payload.department,
      });
    },
  },
});
