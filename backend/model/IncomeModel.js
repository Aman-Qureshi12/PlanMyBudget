import mongoose from "mongoose";

const IncomeSchema = mongoose.Schema({
  date: { type: Date, required: true },
  annualIncome: { type: Number, required: true },
  monthlyIncome: { type: Number, required: true },
  currency: { type: String, required: true },
  source: { type: String, required: true },
});

const IncomeModel = mongoose.model("Income", IncomeSchema);

export default IncomeModel;
