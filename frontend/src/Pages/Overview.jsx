import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenseTotal } from "../features/expense/ExpenseSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const { totalExpense, isLoading } = useSelector(
    (state) => state.expenseReducer
  );
  useEffect(() => {
    dispatch(fetchExpenseTotal());
  }, [dispatch]);
  return (
    <div>
      <h1>Overview</h1>
      {isLoading ? "Loading..." : `Total Expense: ${totalExpense}`}
    </div>
  );
};

export default Overview;
