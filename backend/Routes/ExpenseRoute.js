import express from "express";
import {
  AddExpense,
  getExpensesTotal,
} from "../controller/ExpenseController.js";

const Router = express.Router();

Router.post("/expenses", AddExpense);
Router.get("/totalIncome", getExpensesTotal);

export default Router;
