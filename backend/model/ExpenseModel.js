import mongoose from "mongoose";

const ExpenseSchema = mongoose.Schema({
  date: { type: Date, required: true },
  expenseAmount: { type: Number, required: true },
  purpose: { type: String, required: true },
  category: { type: String, required: true },
});

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
export default ExpenseModel;
