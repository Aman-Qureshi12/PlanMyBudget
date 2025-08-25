import express from "express";
import {
  AddExpense,
  getAllExpenses,
  getExpensesTotal,
} from "../controller/ExpenseController.js";

const Router = express.Router();

Router.post("/expenses", AddExpense);
Router.get("/totalIncome", getExpensesTotal);
Router.get("/expenses", getAllExpenses);

export default Router;
