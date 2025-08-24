import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// To make an API call or a delay task in redux we use the Thunk as the middleware which is this createAsyncThunk
import axios from "axios";

const initialState = {
  expenses: null,
  totalExpense: null,
  isLoading: false,
  isError: false,
};

// This is a action named fetchExpenseTotal. In this action we first give it a name that is fetchExpenseTotal and then we have a callback function
export const fetchExpenseTotal = createAsyncThunk(
  "fetchExpenseTotal",
  async () => {
    const response = await axios.get("http://localhost:8000/totalIncome");
    return response.data.sumOfAllExpense[0].sumOfAllExpense;
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
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
  },
});

export const { addExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
