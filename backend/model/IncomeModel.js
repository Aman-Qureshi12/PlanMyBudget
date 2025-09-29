import mongoose from "mongoose";

const IncomeSchema = mongoose.Schema({
  category: { type: String, required: true },
  annualIncome: { type: Number, required: true },
  monthlyIncome: { type: Number, required: true },
  currency: { type: String, required: true },
  source: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const IncomeModel = mongoose.model("Income", IncomeSchema);

export default IncomeModel;
