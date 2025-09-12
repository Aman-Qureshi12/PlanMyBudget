import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  // year: null,
  monthlyIncome: 0,
  annualIncome: 0,
  currency: "",
  isIncomeLoading: false,
  isCurrencyLoading: false,
  isError: false,
};

// export const fetchingIncomeDetails = createAsyncThunk(
//   "fetchingIncomeDetails",
//   async () => {
//     const response = await axios.get("http://localhost:8000/incomeDetails");
//     return response.data.incomeDetails;
//   }
// );

export const fetchingIncome = createAsyncThunk("fetchingIncome", async () => {
  const response = await axios.get("http://localhost:8000/income");
  return response.data.Incomes;
});

export const fetchingCurrency = createAsyncThunk(
  "fetchingCurrency",
  async () => {
    const response = await axios.get("http://localhost:8000/currency");
    return response.data.Currency;
  }
);

const incomeSlice = createSlice({
  name: "Income",
  initialState,
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchingIncomeDetails.pending, (state, action) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(fetchingIncomeDetails.fulfilled, (state, action) => {
    //     (state.isLoading = false),
    //       (state.year = action.payload[0].date),
    //       (state.monthlyIncome = action.payload[0].monthlyIncome),
    //       (state.annualIncome = action.payload[0].annualIncome),
    //       (state.currency = action.payload[0].currency);
    //   })
    //   .addCase(fetchingIncomeDetails.rejected, (state, action) => {
    //     state.isError = true;
    //     console.log("Error", action.payload);
    //   });

    builder
      .addCase(fetchingIncome.pending, (state, action) => {
        state.isIncomeLoading = true;
      })
      .addCase(fetchingIncome.fulfilled, (state, action) => {
        (state.isIncomeLoading = false),
          (state.annualIncome = action.payload[0].annualIncome),
          (state.monthlyIncome = action.payload[0].monthlyIncome);
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
        state.currency = action.payload[0].currency;
      })
      .addCase(fetchingCurrency.rejected, (state, action) => {
        state.isError = true;
        console.log("Error ", action.payload);
      });
  },
});

export const { addIncome } = incomeSlice.actions;

export default incomeSlice.reducer;
