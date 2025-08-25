import { useEffect } from "react";
import ExpenseForm from "./forms/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenseTotal,
  fetchingAllExpenses,
} from "../features/expense/ExpenseSlice";

const Expenses = () => {
  const dispatch = useDispatch();
  const { expenses, isLoading, totalExpense } = useSelector(
    (state) => state.expenseReducer
  );

  useEffect(() => {
    dispatch(fetchingAllExpenses());
    dispatch(fetchExpenseTotal());
  }, [dispatch]);
  return (
    <div className="w-full py-20 pr-10">
      <div className="flex gap-10 w-full">
        <div className="px-4 py-2 bg-black text-white w-full">
          <p>
            {isLoading ? (
              "Loading"
            ) : (
              <span className="text-2xl">
                Total expense <br />
                <span className="font-bold "> {totalExpense}</span>
              </span>
            )}
          </p>
        </div>
        <div className="px-4 py-2 bg-black text-white w-full">
          <p>
            {isLoading ? (
              "Loading"
            ) : (
              <span className="text-2xl">
                Current Balance <br />
                <span className="font-bold "> {totalExpense}</span>
              </span>
            )}
          </p>
        </div>
      </div>
      <ExpenseForm />
      <div>
        {isLoading ? (
          "Loading ...."
        ) : (
          <table className=" w-full ">
            <tbody>
              {expenses?.map((expense, index) => (
                <tr key={index}>
                  <td className=" px-4 py-2">{expense.date}</td>
                  <td className="max-w-md px-4 py-2">{expense.purpose}</td>
                  <td className=" px-4 py-2">{expense.category}</td>
                  <td className=" px-4 py-2">{expense.expenseAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Expenses;
