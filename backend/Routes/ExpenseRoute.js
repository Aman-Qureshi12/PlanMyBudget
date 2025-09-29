import express from "express";
import {
  addExpense,
  deleteExpenses,
  getAllExpenses,
  getExpensesTotal,
  updateExpenses,
} from "../controller/ExpenseController.js";

const Router = express.Router();

Router.post("/expenses", addExpense);
Router.put("/expenses", updateExpenses);
Router.delete("/expenses", deleteExpenses);
Router.get("/totalIncome", getExpensesTotal);
Router.get("/expenses", getAllExpenses);

export default Router;
