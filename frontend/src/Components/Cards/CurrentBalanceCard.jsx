import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenseTotal,
  currentMonthExpense,
  fetchingAllExpenses,
} from "../../features/expense/ExpenseSlice";
import { fetchingIncome } from "../../features/income/IncomeSlice";

const CurrentBalanceCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const {
    totalExpense,
    annualIncome,
    monthlyIncome,
    currentMonthExpense: thisMonth,
  } = useSelector((state) => ({
    totalExpense: state.expenseReducer.totalExpense,
    annualIncome: state.incomeReducer.annualIncome,
    monthlyIncome: state.incomeReducer.monthlyIncome,
    currentMonthExpense: state.expenseReducer.currentMonthExpense,
  }));
  useEffect(() => {
    setIsLoading(false);

    // Fetch totals
    dispatch(fetchExpenseTotal());
    dispatch(fetchingIncome());

    // Fetch all expenses first, then calculate month total
    dispatch(fetchingAllExpenses()).then(() => {
      dispatch(currentMonthExpense());
    });
  }, [dispatch]);

  let CurrentBalance = 0;
  let currentMonthBalance = 0;

  if (!annualIncome == 0 && !totalExpense == 0) {
    CurrentBalance = annualIncome - totalExpense;
  }

  if (!monthlyIncome == 0 && !thisMonth == 0) {
    currentMonthBalance = monthlyIncome - thisMonth;
  }

  return (
    <div className="px-4 py-2 bg-yellowGreen text-richBlack w-full rounded-sm">
      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl font-inter">Current Balance</span>
            <span className="font-bold text-2xl pt-3 font-inter">
              {CurrentBalance}
            </span>
            <span className="pt-5 text-end font-roboto">
              Current Month Balance {currentMonthBalance}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrentBalanceCard;
