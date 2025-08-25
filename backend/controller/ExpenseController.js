import ExpenseModel from "../model/ExpenseModel.js";

export const AddExpense = async (req, res) => {
  const { expenseAmount, date, purpose, category } = req.body;
  try {
    // console.log("Received:", date, expense);
    await ExpenseModel.insertOne({
      date: date,
      expenseAmount: expenseAmount,
      purpose: purpose,
      category: category,
    });
    res
      .status(201)
      .json({ message: "The data has been received successfully " });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error receiving the data ", error });
  }
};

export const getExpensesTotal = async (req, res) => {
  try {
    const sumOfAllExpense = await ExpenseModel.aggregate([
      { $group: { _id: null, sumOfAllExpense: { $sum: "$expenseAmount" } } },
    ]);
    res.status(200).json({ sumOfAllExpense });
  } catch (error) {
    console.log("There was an error getting the total", error);
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await ExpenseModel.find();
    res.status(201).json({ allExpenses });
  } catch (error) {
    console.log("There was an error getting the expenses ", error);
  }
};
