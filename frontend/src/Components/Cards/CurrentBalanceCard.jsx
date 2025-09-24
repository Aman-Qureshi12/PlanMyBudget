import React, { useEffect, useState } from "react";
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

  console.log("The current month expense is ", thisMonth);

  const CurrentBalance = annualIncome - totalExpense;

  const currentMonthBalance = monthlyIncome - thisMonth;
  console.log(" The new current month expense is ", currentMonthBalance);

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

  return (
    <div className="px-4 py-2 bg-black text-white w-full rounded-sm">
      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl">Current Balance</span>
            <span className="font-bold text-2xl pt-3"> {CurrentBalance}</span>
            <span className="pt-5 text-end">
              Current Month Balance {currentMonthBalance}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrentBalanceCard;
