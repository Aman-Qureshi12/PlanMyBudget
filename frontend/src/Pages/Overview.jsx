import { useDispatch, useSelector } from "react-redux";
import CurrentBalanceCard from "../Components/Cards/CurrentBalanceCard";
import ExpenseCard from "../Components/Cards/ExpenseCard";
import IncomeCard from "../Components/Cards/IncomeCard";
import InvestmentCard from "../Components/Cards/InvestmentCard";
import ExpenseChart from "../Components/Charts/ExpenseChart";
import InvestmentChart from "../Components/Charts/InvestmentChart";
import { useEffect } from "react";
import { fetchingAllExpenses } from "../features/expense/ExpenseSlice";
import { fetchingCurrency } from "../features/income/IncomeSlice";
import { motion } from "motion/react";

const Overview = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenseReducer.expenses);
  const currency = useSelector((state) => state.incomeReducer.currency);

  useEffect(() => {
    dispatch(fetchingAllExpenses());
    dispatch(fetchingCurrency());
  }, [dispatch]);

  const sortingExpenses = [...(expenses || [])].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  const lastFiveExpenses = sortingExpenses.slice(0, 5);

  return (
    <div className=" lg:pl-[22%] w-full py-20 max-lg:px-10 lg:pr-10 text-palePink font-roboto">
      <div className="w-full max-sm:flex-col flex gap-10 items-center">
        <IncomeCard seconds={0.1} />
        <CurrentBalanceCard seconds={0.4} />
      </div>
      <div className="w-full max-sm:flex-col flex gap-10 items-center pt-10">
        <InvestmentCard seconds={0.1} direction={100} />
        <ExpenseCard seconds={0.4} direction={100} />
      </div>
      <div className="w-full flex max-small:flex-col justify-between items-center  gap-10  small:overflow-x-auto pt-10 ">
        <ExpenseChart seconds={1} direction={100} />
        <InvestmentChart seconds={1.2} direction={100} />
      </div>
      <div className="w-full pt-10">
        <h1 className="text-xl text-palePink font-inter">
          Recent Added Expense
        </h1>
        <div className="max-md:overflow-x-auto">
          <motion.table
            initial={{ opacity: 0 }} // hidden
            animate={{ opacity: 1 }} // visible
            transition={{ duration: 1, ease: "easeOut" }} // fade-in speed
            className=" w-full mt-10 text-palePink font-roboto text-lg max-md:min-w-[800px]"
          >
            <tbody>
              {lastFiveExpenses?.map((expense, index) => (
                <tr key={index}>
                  <td className=" px-4 py-2">{expense.date}</td>
                  <td className="max-w-md px-4 py-2">{expense.purpose}</td>
                  <td className=" px-4 py-2">{expense.category}</td>
                  <td className=" px-4 py-2">
                    {" "}
                    <span className="pr-1">
                      {currencySymbols[currency] || ""}{" "}
                    </span>
                    {expense.expenseAmount}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
};

export default Overview;
