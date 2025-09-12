import express from "express";
import {
  AddIncome,
  getCurrency,
  getIncome,
  getIncomeDetails,
} from "../controller/IncomeController.js";

const Router = express.Router();

Router.post("/income", AddIncome);
Router.get("/incomeDetails", getIncomeDetails);
Router.get("/income", getIncome);
Router.get("/currency", getCurrency);

export default Router;
