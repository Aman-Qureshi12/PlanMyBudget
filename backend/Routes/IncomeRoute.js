import express from "express";
import {
  addIncome,
  deleteIncomes,
  getCurrency,
  getIncomeTotal,
  getIncomeDetails,
  updateIncomes,
} from "../controller/IncomeController.js";

const Router = express.Router();

Router.post("/incomes", addIncome);
Router.put("/incomes", updateIncomes);
Router.delete("/incomes", deleteIncomes);
Router.get("/incomeDetails", getIncomeDetails);
Router.get("/incomes", getIncomeTotal);
Router.get("/currency", getCurrency);

export default Router;
