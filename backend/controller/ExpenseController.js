import ExpenseModel from "../model/ExpenseModel.js";
import mongoose from "mongoose";

//For Adding the expenses in the database
export const addExpense = async (req, res) => {
  try {
    const { expenseAmount, date, purpose, category } = req.body;

    const userID = req.user.id;

    if (!userID) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user ID in token" });
    }

    await ExpenseModel.create({
      date,
      expenseAmount,
      purpose,
      category,
      user: userID,
    });

    res
      .status(201)
      .json({ message: "The data has been received successfully" });
  } catch (error) {
    res.status(500).json({
      message: "There was an error receiving the data",
      error,
    });
  }
};

// For calculating the overall total of expenses
export const getExpensesTotal = async (req, res) => {
  try {
    const sumOfAllExpense = await ExpenseModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: null, sumOfAllExpense: { $sum: "$expenseAmount" } } },
    ]);

    const expenseTotal =
      sumOfAllExpense.length > 0 ? sumOfAllExpense[0].sumOfAllExpense : 0;
    res.status(200).json({ expenseTotal });
  } catch (error) {
    res.status(500).json({ message: "Error getting expenses total" });
  }
};

// For getting all the Expenses
export const getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await ExpenseModel.find({ user: req.user.id }).populate(
      "user",
      "email"
    );

    res.status(201).json({ allExpenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting all expense", error });
  }
};

// For deleting the Expense
export const deleteExpenses = async (req, res) => {
  try {
    const { id } = req.body;
    const userID = req.user.id;

    if (!id) {
      return res.status(400).json({ message: "No expense ID provided" });
    }

    await ExpenseModel.deleteOne({ _id: id, user: userID });

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error deleting the expense", error });
  }
};

// For Updating the expense
export const updateExpenses = async (req, res) => {
  try {
    const { id, date, purpose, category, expenseAmount } = req.body;
    const userID = req.user.id;
    const updateExpense = await ExpenseModel.findByIdAndUpdate(
      { _id: id, user: userID },
      {
        date,
        purpose,
        category,
        expenseAmount,
      }
    );

    if (!updateExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense updated", expense: updateExpense });
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};
