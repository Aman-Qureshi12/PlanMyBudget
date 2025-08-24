import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expense/ExpenseSlice";

export const store = configureStore({
  reducer: {
    expenseReducer,
  },
});
