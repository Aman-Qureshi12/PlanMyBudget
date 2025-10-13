import InvestmentModel from "../model/InvestmentModel.js";
import mongoose from "mongoose";

// For Adding the investments in the database
export const addInvestment = async (req, res) => {
  const { date, purpose, category, investmentAmount } = req.body;

  const userID = req.user.id;
  if (!userID) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user ID in token" });
  }

  try {
    await InvestmentModel.create({
      date,
      investmentAmount,
      purpose,
      category,
      user: userID,
    });

    res.status(201).json({ message: "Investment stored successfully " });
  } catch (error) {
    res.status(500).json({ message: "Error storing the investments ", error });
  }
};

// For getting all the investments
export const getAllInvestments = async (req, res) => {
  try {
    const investments = await InvestmentModel.find({
      user: req.user.id,
    }).populate("user", "email");
    res.status(201).json({ investments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting the Investments", error });
  }
};

// For calculating the overall total of the investments
export const getInvestmentTotal = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No user in request" });
  }

  try {
    const sumOfInvestments = await InvestmentModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      {
        $group: {
          _id: null,
          sumOfAllInvestments: { $sum: "$investmentAmount" },
        },
      },
    ]);

    const sumOfAllInvestments =
      sumOfInvestments.length > 0 ? sumOfInvestments[0].sumOfAllInvestments : 0;

    res.status(200).json({ sumOfAllInvestments });
  } catch (error) {
    res.status(500).json({
      message: "There was an error getting the total investments",
      error: error.message,
    });
  }
};

// For deleting the investments
export const deleteInvestments = async (req, res) => {
  const { id } = req.body;
  const userID = req.user.id;
  try {
    await InvestmentModel.deleteOne({ _id: id, user: userID });
    res.status(200).json({ message: "Investment deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "There was an error deleting the investments ",
      error,
    });
  }
};

// For updating the investments
export const updateInvestments = async (req, res) => {
  const { id, date, purpose, category, investmentAmount } = req.body;
  const userID = req.user.id;

  try {
    await InvestmentModel.findByIdAndUpdate(
      { _id: id, user: userID },
      {
        date,
        purpose,
        category,
        investmentAmount,
      }
    );
    res.status(200).json({ message: "Investment updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "There was an error updating the investments ",
      error,
    });
  }
};
