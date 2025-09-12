import InvestmentModel from "../model/InvestmentModel.js";

export const addInvestment = async (req, res) => {
  const { date, purpose, category, investmentAmount } = req.body;

  try {
    await InvestmentModel.insertOne({
      date,
      investmentAmount,
      purpose,
      category,
    });

    res.status(201).json({ message: "Investment stored successfully " });
  } catch (error) {
    res.status(500).json({ message: "Error storing the investments ", error });
  }
};

export const getInvestments = async (req, res) => {
  try {
    const investments = await InvestmentModel.find();
    res.status(201).json({ investments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error getting the Investments", error });
  }
};

export const getInvestmentTotal = async (req, res) => {
  try {
    const sumOfAllInvestments = await InvestmentModel.aggregate([
      {
        $group: {
          _id: null,
          sumOfAllInvestments: { $sum: "$investmentAmount" },
        },
      },
    ]);

    res.status(201).json({ sumOfAllInvestments });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "There was an error getting the total investments ",
        error,
      });
  }
};
