import { useEffect, useState } from "react";
import ExpenseForm from "./forms/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchingAllExpenses } from "../features/expense/ExpenseSlice";
import ExpenseChart from "../Components/Charts/ExpenseChart";
import ExpenseCard from "../Components/Cards/ExpenseCard";
import ExpensePieChart from "../Components/Charts/ExpensePieChart";
import CurrentBalanceCard from "../Components/Cards/CurrentBalanceCard";

const Expenses = () => {
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const dispatch = useDispatch();
  const { expenses, isLoading } = useSelector((state) => state.expenseReducer);

  useEffect(() => {
    dispatch(fetchingAllExpenses());
  }, [dispatch]);

  const handleFilterByDate = (e) => {
    setFilterByDate(e.target.value);
  };
  const handleFilterByMonth = (e) => {
    setFilterByMonth(e.target.value);
  };

  const handleFilterByCategory = (e) => {
    setFilterByCategory(e.target.value);
  };

  const filterCategories = expenses?.filter(
    (expense, index, self) =>
      index === self.findIndex((e) => e.category === expense.category)
  );

  console.log("The new filtered Category is ", filterCategories);
  console.log("The new Category is ", filterByCategory);

  const filteredAndSortedExpenses = (expenses || [])
    .filter((expense) => {
      const monthNumber = new Date(expense.date).getMonth() + 1;

      if (monthNumber === Number(filterByMonth) && filterByCategory === "") {
        return true;
      }

      if (filterByMonth === "" && filterByCategory === expense.category) {
        return true;
      }

      if (
        monthNumber === Number(filterByMonth) &&
        filterByCategory === expense.category
      ) {
        return true;
      }

      if (filterByMonth === "" && filterByCategory === "") {
        return true;
      }

      return false;
    })
    .sort((a, b) => {
      if (filterByDate === "Ascending") {
        return new Date(a.date) - new Date(b.date);
      }
      if (filterByDate === "Descending") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  return (
    <div className=" pl-[22%] w-full py-20 pr-10 text-palePink font-roboto">
      <div className="w-full flex gap-10 items-center">
        <ExpenseCard />
        <CurrentBalanceCard />
      </div>

      <ExpenseForm />
      <div className="w-full flex justify-between items-center">
        <ExpenseChart />
        <ExpensePieChart />
      </div>
      <div className="pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-inter">All Expenses </h1>
          <div className="flex gap-10">
            {/* Filter by date  */}
            <div>
              <select
                onChange={handleFilterByDate}
                className="border-2 border-palePink rounded-sm px-4 py-2"
              >
                <option value="" disabled selected>
                  Filter By Date
                </option>
                <option className="text-richBlack" value="Ascending">
                  Ascending
                </option>
                <option className="text-richBlack" value="Descending">
                  Descending
                </option>
              </select>
            </div>
            {/* filter By month*/}
            <div>
              <select
                onChange={handleFilterByMonth}
                className="border-2 border-palePink rounded-sm px-4 py-2 "
              >
                <option value="" disabled selected>
                  Filter By Months
                </option>
                <option className="text-richBlack" value="1">
                  Jan
                </option>
                <option className="text-richBlack" value="2">
                  Feb
                </option>
                <option className="text-richBlack" value="3">
                  Mar
                </option>
                <option className="text-richBlack" value="4">
                  Apr
                </option>
                <option className="text-richBlack" value="5">
                  May
                </option>
                <option className="text-richBlack" value="6">
                  Jun
                </option>
                <option className="text-richBlack" value="7">
                  Jul
                </option>
                <option className="text-richBlack" value="8">
                  Aug
                </option>
                <option className="text-richBlack" value="9">
                  Sep
                </option>
                <option className="text-richBlack" value="10">
                  Oct
                </option>
                <option className="text-richBlack" value="11">
                  Nov
                </option>
                <option className="text-richBlack" value="12">
                  Dec
                </option>
              </select>
            </div>
            {/* Filter By category  */}
            <div>
              <select
                onChange={handleFilterByCategory}
                className="border-2 border-palePink rounded-sm px-4 py-2 "
              >
                <option value="" disabled selected>
                  Filter By Category
                </option>
                {filterCategories?.map((expense) => (
                  <option className="text-richBlack" value={expense.category}>
                    {expense.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {isLoading ? (
          "Loading ...."
        ) : (
          <table className=" w-full mt-8 text-lg">
            <tbody>
              {filteredAndSortedExpenses ? (
                <>
                  {filteredAndSortedExpenses.length == 0 ? (
                    "There is no expense in this month"
                  ) : (
                    <>
                      {filteredAndSortedExpenses.map((expense, index) => (
                        <tr key={index}>
                          <td className=" px-4 py-2">{expense.date}</td>
                          <td className="max-w-md px-4 py-2">
                            {expense.purpose}
                          </td>
                          <td className=" px-4 py-2">{expense.category}</td>
                          <td className=" px-4 py-2">
                            {expense.expenseAmount}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {expenses?.map((expense, index) => (
                    <tr key={index}>
                      <td className=" px-4 py-2">{expense.date}</td>
                      <td className="max-w-md px-4 py-2">{expense.purpose}</td>
                      <td className=" px-4 py-2">{expense.category}</td>
                      <td className=" px-4 py-2">{expense.expenseAmount}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Expenses;
