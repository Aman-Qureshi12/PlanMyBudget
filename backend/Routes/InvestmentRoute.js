import express from "express";
import {
  addInvestment,
  deleteInvestments,
  getAllInvestments,
  getInvestmentTotal,
  updateInvestments,
} from "../controller/InvestmentController.js";

const Router = express.Router();

Router.post("/investments", addInvestment);
Router.delete("/investments", deleteInvestments);
Router.put("/investments", updateInvestments);
Router.get("/investments", getAllInvestments);
Router.get("/totalInvestments", getInvestmentTotal);

export default Router;
