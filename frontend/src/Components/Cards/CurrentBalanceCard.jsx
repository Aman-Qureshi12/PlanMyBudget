import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenseTotal,
  currentMonthExpense,
  fetchingAllExpenses,
} from "../../features/expense/ExpenseSlice";
import {
  fetchingCurrency,
  fetchingIncome,
} from "../../features/income/IncomeSlice";
import { motion } from "motion/react";
import Loader from "../Loader";

const CurrentBalanceCard = ({ seconds }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const currency = useSelector((state) => state.incomeReducer.currency);
  const totalExpense = useSelector(
    (state) => state.expenseReducer.totalExpense
  );
  const annualIncome = useSelector((state) => state.incomeReducer.annualIncome);
  const monthlyIncome = useSelector(
    (state) => state.incomeReducer.monthlyIncome
  );
  const thisMonthExpense = useSelector(
    (state) => state.expenseReducer.currentMonthExpense
  );
  const totalInvestments = useSelector(
    (state) => state.investmentReducer.totalInvestments
  );
  const thisMonthInvestment = useSelector(
    (state) => state.investmentReducer.currentMonthInvestment
  );

  useEffect(() => {
    setIsLoading(false);

    // Fetch totals
    dispatch(fetchExpenseTotal());
    dispatch(fetchingIncome());
    dispatch(fetchingCurrency());

    // Fetch all expenses first, then calculate month total
    dispatch(fetchingAllExpenses()).then(() => {
      dispatch(currentMonthExpense());
    });
  }, [dispatch]);

  let CurrentBalance = 0;
  let currentMonthBalance = 0;
  if (totalExpense == 0) {
    CurrentBalance = annualIncome;
    currentMonthBalance = monthlyIncome;
  }

  if (annualIncome == 0) {
    CurrentBalance = -totalExpense;
    currentMonthBalance = -thisMonthExpense;
  }

  if (!annualIncome == 0 && !totalExpense == 0) {
    CurrentBalance = annualIncome - totalExpense - totalInvestments;
  }

  if (!monthlyIncome == 0 && !thisMonthExpense == 0) {
    currentMonthBalance =
      monthlyIncome - thisMonthExpense - thisMonthInvestment;
  }

  if (!annualIncome == 0 && !totalExpense == 0 && !totalInvestments == 0) {
    CurrentBalance = annualIncome - totalExpense - totalInvestments;
  }

  if (
    !monthlyIncome == 0 &&
    !thisMonthExpense == 0 &&
    !thisMonthInvestment == 0
  ) {
    currentMonthBalance =
      monthlyIncome - thisMonthExpense - thisMonthInvestment;
  }

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }} // Start above & hidden
      animate={{ y: 0, opacity: 1 }} // Slide down into place
      transition={{ duration: 0.6, ease: "easeOut", delay: seconds }}
      className="px-4 py-2 bg-yellowGreen text-richBlack w-full rounded-sm"
    >
      <div>
        {isLoading ? (
          <Loader Text="Loading" bgBlack="bg-richBlack" />
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl font-inter">Current Balance</span>
            <span className="font-bold text-2xl pt-3 font-inter">
              <span className="pr-1">{currencySymbols[currency] || ""} </span>
              {CurrentBalance}
            </span>
            <span className="pt-5 text-end font-roboto">
              Current Month Balance
              <span className="pl-2">{currencySymbols[currency] || ""} </span>
              {currentMonthBalance}
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default CurrentBalanceCard;
