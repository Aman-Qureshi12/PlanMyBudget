import mongoose from "mongoose";

const InvestmentSchema = mongoose.Schema({
  date: { type: Date, required: true },
  investmentAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  category: { type: String, required: true },
});

const InvestmentModel = mongoose.model("Investment", InvestmentSchema);

export default InvestmentModel;
