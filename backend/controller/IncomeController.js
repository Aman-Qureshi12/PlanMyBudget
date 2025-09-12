import IncomeModel from "../model/IncomeModel.js";

export const AddIncome = async (req, res) => {
  const { date, source, currency, annualIncome, monthlyIncome } = req.body;

  try {
    await IncomeModel.insertOne({
      date,
      annualIncome,
      monthlyIncome,
      currency,
      source,
    });
    res.status(200).json({ message: "Income data stored successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error storing income data ", error });
  }
};

export const getIncomeDetails = async (req, res) => {
  try {
    const incomeDetails = await IncomeModel.find();
    res.status(200).json({ incomeDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting income details", error });
  }
};

export const getIncome = async (req, res) => {
  try {
    const Incomes = await IncomeModel.find(
      {},
      {
        monthlyIncome: 1,
        annualIncome: 1,
      }
    );
    res.status(200).json({ Incomes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting incomes", error });
  }
};

export const getCurrency = async (req, res) => {
  try {
    const Currency = await IncomeModel.find({}, { currency: 1 });
    res.status(200).json({ Currency });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting Currency", error });
  }
};
