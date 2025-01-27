import { RootState } from "./store";

export const getData = (state: RootState) => {
  return state.tableData.tableDatas;
};
