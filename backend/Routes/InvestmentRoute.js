import express from "express";
import {
  addInvestment,
  getInvestments,
  getInvestmentTotal,
} from "../controller/InvestmentController.js";

const Router = express.Router();

Router.post("/investments", addInvestment);
Router.get("/investments", getInvestments);
Router.get("/totalInvestments", getInvestmentTotal);

export default Router;
