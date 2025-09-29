import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema({
  date: { type: Date, required: true },
  expenseAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
export default ExpenseModel;
