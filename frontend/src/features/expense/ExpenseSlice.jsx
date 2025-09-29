import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// To make an API call or a delay task in redux we use the Thunk as the middleware which is this createAsyncThunk
import axios from "axios";

const initialState = {
  currentMonthExpense: 0,
  expenses: null,
  totalExpense: 0,
  isLoading: false,
  isError: false,
};

// This is a action named fetchExpenseTotal. In this action we first give it a name that is fetchExpenseTotal and then we have a callback function
export const fetchExpenseTotal = createAsyncThunk(
  "fetchExpenseTotal",
  async () => {
    const response = await axios.get("http://localhost:8000/totalIncome", {
      withCredentials: true,
    });
    return response.data.expenseTotal;
  }
);

export const fetchingAllExpenses = createAsyncThunk(
  "fetchingAllExpenses",
  async () => {
    const response = await axios.get("http://localhost:8000/expenses", {
      withCredentials: true,
    });

    // Format each expense date to YYYY-MM-DD
    const formattedExpenses = response.data.allExpenses.map((expense) => ({
      ...expense,
      date: expense.date.slice(0, 10),
    }));

    return formattedExpenses;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    currentMonthExpense: (state) => {
      const currentMonth = new Date().getMonth() + 1;

      const thisMonthTotal = (state.expenses ?? [])
        .filter((exp) => new Date(exp.date).getMonth() + 1 === currentMonth)
        .reduce((sum, exp) => sum + (Number(exp.expenseAmount) || 0), 0);

      state.currentMonthExpense = thisMonthTotal;
    },
  },
  // extraReducers are basically a function in which we have a builder
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseTotal.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchExpenseTotal.fulfilled, (state, action) => {
        (state.isLoading = false), (state.totalExpense = action.payload);
      })
      .addCase(fetchExpenseTotal.rejected, (state, action) => {
        console.log("Error", action.payload);
        state.isError = true;
      });

    builder
      .addCase(fetchingAllExpenses.fulfilled, (state, action) => {
        (state.isLoading = false), (state.expenses = action.payload);
      })
      .addCase(fetchingAllExpenses.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchingAllExpenses.rejected, (state, action) => {
        state.isError = true;
        console.log("There was an error ", action.payload);
      });
  },
});

export const { addExpense, currentMonthExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
