import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expense/ExpenseSlice";
import incomeReducer from "../features/income/IncomeSlice";
import investmentReducer from "../features/investment/InvestmentSlice";

export const store = configureStore({
  reducer: {
    expenseReducer,
    incomeReducer,
    investmentReducer,
  },
});
