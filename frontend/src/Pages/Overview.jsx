import { useDispatch, useSelector } from "react-redux";
import CurrentBalanceCard from "../Components/Cards/CurrentBalanceCard";
import ExpenseCard from "../Components/Cards/ExpenseCard";
import IncomeCard from "../Components/Cards/IncomeCard";
import InvestmentCard from "../Components/Cards/InvestmentCard";
import ExpenseChart from "../Components/Charts/ExpenseChart";
import InvestmentChart from "../Components/Charts/InvestmentChart";
import { useEffect } from "react";
import { fetchingAllExpenses } from "../features/expense/ExpenseSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenseReducer);

  useEffect(() => {
    dispatch(fetchingAllExpenses());
  }, [dispatch]);

  const sortingExpenses = [...(expenses || [])].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const lastFiveExpenses = sortingExpenses.slice(0, 5);

  return (
    <div className=" pl-[22%] w-full py-20 pr-10">
      <div className="flex gap-10">
        <IncomeCard />
        <CurrentBalanceCard />
      </div>
      <div className="flex gap-10 pt-10">
        <InvestmentCard />
        <ExpenseCard />
      </div>
      <div className="w-full flex gap-10 pt-10">
        <ExpenseChart />
        <InvestmentChart />
      </div>
      <div className="w-full pt-10">
        <h1 className="text-xl text-palePink font-inter">
          Recent Added Expense
        </h1>
        <table className=" w-full mt-10 text-palePink font-roboto text-lg">
          <tbody>
            {lastFiveExpenses?.map((expense, index) => (
              <tr key={index}>
                <td className=" px-4 py-2">{expense.date}</td>
                <td className="max-w-md px-4 py-2">{expense.purpose}</td>
                <td className=" px-4 py-2">{expense.category}</td>
                <td className=" px-4 py-2">{expense.expenseAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
