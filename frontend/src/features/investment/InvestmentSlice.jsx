import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  investmentDetails: null,
  isError: false,
  isLoading: false,
  totalInvestments: 0,
};

export const fetchInvestmentDetails = createAsyncThunk(
  "fetchInvestmentDetails",
  async () => {
    const response = await axios.get("http://localhost:8000/investments");
    return response.data.investments;
  }
);

export const fetchInvestmentTotal = createAsyncThunk(
  "fetchInvestmentTotal",
  async () => {
    const response = await axios.get("http://localhost:8000/totalInvestments");
    return response.data.sumOfAllInvestments[0].sumOfAllInvestments;
  }
);

export const investmentSlice = createSlice({
  name: "investment",
  initialState,
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

export default investmentSlice.reducer;
