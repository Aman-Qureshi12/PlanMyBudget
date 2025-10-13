import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  incomeDetails: null,
  monthlyIncome: 0,
  annualIncome: 0,
  currency: "",
  isIncomeLoading: false,
  isCurrencyLoading: false,
  isError: false,
  isLoading: false,
};

export const fetchingIncomeDetails = createAsyncThunk(
  "fetchingIncomeDetails",
  async () => {
    const response = await axios.get(
      "https://planmybudget-backend.onrender.com/incomeDetails",
      {
        withCredentials: true,
      }
    );
    return response.data.incomeDetails;
  }
);

export const fetchingIncome = createAsyncThunk("fetchingIncome", async () => {
  const response = await axios.get(
    "https://planmybudget-backend.onrender.com/incomes",
    {
      withCredentials: true,
    }
  );
  return response.data.Incomes;
});

export const fetchingCurrency = createAsyncThunk(
  "fetchingCurrency",
  async () => {
    const response = await axios.get(
      "https://planmybudget-backend.onrender.com/currency",
      {
        withCredentials: true,
      }
    );
    return response.data.Currency;
  }
);

const incomeSlice = createSlice({
  name: "Income",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchingIncomeDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchingIncomeDetails.fulfilled, (state, action) => {
        (state.isLoading = false), (state.incomeDetails = action.payload);
      })
      .addCase(fetchingIncomeDetails.rejected, (state, action) => {
        state.isError = true;
        console.log("Error", action.payload);
      });

    builder
      .addCase(fetchingIncome.pending, (state, action) => {
        state.isIncomeLoading = true;
      })
      .addCase(fetchingIncome.fulfilled, (state, action) => {
        (state.isIncomeLoading = false),
          (state.annualIncome = action.payload.annualIncomeTotal),
          (state.monthlyIncome = action.payload.monthlyIncomeTotal);
      })
      .addCase(fetchingIncome.rejected, (state, action) => {
        state.isError = true;
        console.log("Error ", action.payload);
      });

    builder
      .addCase(fetchingCurrency.pending, (state, action) => {
        state.isCurrencyLoading = true;
      })
      .addCase(fetchingCurrency.fulfilled, (state, action) => {
        state.isCurrencyLoading = false;
        state.currency = action.payload[0]?.currency;
      })
      .addCase(fetchingCurrency.rejected, (state, action) => {
        state.isError = true;
        console.log("Error ", action.payload);
      });
  },
});

export const { addIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
