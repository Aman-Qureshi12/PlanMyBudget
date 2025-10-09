import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMonthExpense,
  fetchExpenseTotal,
} from "../../features/expense/ExpenseSlice";
import { fetchingCurrency } from "../../features/income/IncomeSlice";
import { motion } from "motion/react";
import Loader from "../Loader";

const ExpenseCard = ({ seconds, direction }) => {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expenseReducer.expenses);
  const isLoading = useSelector((state) => state.expenseReducer.isLoading);
  const totalExpense = useSelector(
    (state) => state.expenseReducer.totalExpense
  );
  const thisMonth = useSelector(
    (state) => state.expenseReducer.currentMonthExpense
  );
  const currency = useSelector((state) => state.incomeReducer.currency);

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  useEffect(() => {
    dispatch(fetchingCurrency());
  }, [dispatch]);

  useEffect(() => {
    if (expenses?.length > 0) {
      dispatch(fetchExpenseTotal());
      dispatch(currentMonthExpense());
    }
  }, [dispatch, expenses?.length]);

  return (
    <motion.div
      initial={{ y: direction, opacity: 0 }} // Start above & hidden
      animate={{ y: 0, opacity: 1 }} // Slide down into place
      transition={{ duration: 0.6, ease: "easeOut", delay: seconds }}
      className="px-4 py-2 bg-palePink text-richBlack w-full rounded-sm"
    >
      <div>
        {isLoading ? (
          <Loader Text="Loading" bgBlack="bg-richBlack" />
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl font-inter">Total Expense</span>
            <span className="font-bold text-2xl pt-3 font-inter">
              <span className="pr-1">{currencySymbols[currency] || ""} </span>
              {totalExpense}
            </span>
            <span className="pt-5 text-end font-roboto">
              Current Month Expense
              <span className="pl-2">{currencySymbols[currency] || ""} </span>
              {thisMonth}
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ExpenseCard;
