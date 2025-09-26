import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMonthExpense,
  fetchExpenseTotal,
  fetchingAllExpenses,
} from "../../features/expense/ExpenseSlice";

const ExpenseCard = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    totalExpense,
    currentMonthExpense: thisMonth,
  } = useSelector((state) => state.expenseReducer);

  useEffect(() => {
    dispatch(fetchExpenseTotal());
    dispatch(fetchingAllExpenses()).then(() => {
      dispatch(currentMonthExpense());
    });
  }, [dispatch]);
  return (
    <div className="px-4 py-2 bg-palePink text-richBlack w-full rounded-sm">
      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl font-inter">Total Expense</span>
            <span className="font-bold text-2xl pt-3 font-inter">
              {" "}
              {totalExpense}
            </span>
            <span className="pt-5 text-end font-roboto">
              Current Month Expense {thisMonth}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default ExpenseCard;
