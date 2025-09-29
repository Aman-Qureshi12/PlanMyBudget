import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentMonthInvestment: 0,
  investmentDetails: null,
  isError: false,
  isLoading: false,
  totalInvestments: 0,
};

export const fetchInvestmentDetails = createAsyncThunk(
  "fetchInvestmentDetails",
  async () => {
    const response = await axios.get("http://localhost:8000/investments", {
      withCredentials: true,
    });
    const formattedInvestments = response.data.investments.map(
      (investment) => ({
        ...investment,
        date: investment.date.slice(0, 10),
      })
    );
    return formattedInvestments;
  }
);

export const fetchInvestmentTotal = createAsyncThunk(
  "fetchInvestmentTotal",
  async () => {
    const response = await axios.get("http://localhost:8000/totalInvestments", {
      withCredentials: true,
    });
    return response.data.sumOfAllInvestments;
  }
);

export const investmentSlice = createSlice({
  name: "investment",
  initialState,
  reducers: {
    currentMonthInvestment: (state) => {
      const currentMonth = new Date().getMonth() + 1;
      const thisMonth = (state.investmentDetails ?? [])
        ?.filter(
          (invest) => new Date(invest.date).getMonth() + 1 == currentMonth
        )
        .reduce(
          (sum, invest) => sum + (Number(invest.investmentAmount) || 0),
          0
        );

      state.currentMonthInvestment = thisMonth;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestmentDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchInvestmentDetails.fulfilled, (state, action) => {
        (state.isLoading = false), (state.investmentDetails = action.payload);
      })
      .addCase(fetchInvestmentDetails.rejected, (state, action) => {
        (state.isError = false), console.log("Error is ", action.payload);
      });

    builder
      .addCase(fetchInvestmentTotal.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchInvestmentTotal.fulfilled, (state, action) => {
        (state.isLoading = false), (state.totalInvestments = action.payload);
      })
      .addCase(fetchInvestmentTotal.rejected, (state, action) => {
        (state.isError = true), console.log("Error", action.payload);
      });
  },
});

export const { currentMonthInvestment } = investmentSlice.actions;

export default investmentSlice.reducer;
