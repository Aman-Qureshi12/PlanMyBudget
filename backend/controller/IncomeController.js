import mongoose from "mongoose";
import IncomeModel from "../model/IncomeModel.js";

// For Adding the Income in the database
export const addIncome = async (req, res) => {
  const { category, source, currency, annualIncome, monthlyIncome } = req.body;
  const userID = req.user.id;
  if (!userID) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID in token" });
  }

  try {
    const Incomes = await IncomeModel.create({
      category,
      annualIncome,
      monthlyIncome,
      currency,
      source,
      user: userID,
    });

    res.status(200).json({ message: "Income data stored successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error storing income data ", error });
  }
};

// For getting all the incomes objects
export const getIncomeDetails = async (req, res) => {
  try {
    const incomeDetails = await IncomeModel.find({
      user: req.user.id,
    }).populate("user", "email");
    res.status(200).json({ incomeDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting income details", error });
  }
};

// For calculating the overall total of incomes
export const getIncomeTotal = async (req, res) => {
  try {
    // Calculating the overall Total of Annual Income
    const sumOfAnnualIncome = await IncomeModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: null, sumOfAnnualIncome: { $sum: "$annualIncome" } } },
    ]);
    const annualIncomeTotal =
      sumOfAnnualIncome.length > 0 ? sumOfAnnualIncome[0].sumOfAnnualIncome : 0;

    // Calculating the overall Total of Monthly Income
    const sumOfMonthlyIncome = await IncomeModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: null, sumOfMonthlyIncome: { $sum: "$monthlyIncome" } } },
    ]);

    const monthlyIncomeTotal =
      sumOfMonthlyIncome.length > 0
        ? sumOfMonthlyIncome[0].sumOfMonthlyIncome
        : 0;

    res
      .status(200)
      .json({ Incomes: { annualIncomeTotal, monthlyIncomeTotal } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting incomes", error });
  }
};

// For getting the currency
export const getCurrency = async (req, res) => {
  const userID = req.user.id;
  try {
    const Currency = await IncomeModel.find({ user: userID }, { currency: 1 });
    res.status(200).json({ Currency });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting Currency", error });
  }
};

// For Updating the Incomes
export const updateIncomes = async (req, res) => {
  try {
    const { id, category, source, currency, annualIncome, monthlyIncome } =
      req.body;
    const userID = req.user.id;

    const newMonthlyIncome = Math.round(annualIncome / 12);

    const updateIncome = await IncomeModel.findOneAndUpdate(
      { _id: id, user: userID },
      {
        category,
        source,
        currency,
        annualIncome,
        monthlyIncome: newMonthlyIncome,
      }
    );

    if (!updateIncome) {
      return res
        .status(404)
        .json({ message: "Income not found or not authorized" });
    }

    res.json({ message: "Income updated", income: updateIncome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error updating the Income", error });
  }
};

// For deleting the Incomes
export const deleteIncomes = async (req, res) => {
  try {
    const { id } = req.body;
    const userID = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "No Income ID provided" });
    }

    const deletedIncomes = await IncomeModel.deleteOne({
      _id: id,
      user: userID,
    });

    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error deleting the Income", error });
  }
};
