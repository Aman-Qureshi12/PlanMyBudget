import { useEffect, useState } from "react";
import ExpenseForm from "./forms/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchingAllExpenses } from "../features/expense/ExpenseSlice";
import ExpenseChart from "../Components/Charts/ExpenseChart";
import ExpenseCard from "../Components/Cards/ExpenseCard";
import ExpensePieChart from "../Components/Charts/ExpensePieChart";
import CurrentBalanceCard from "../Components/Cards/CurrentBalanceCard";
import { useNavigate } from "react-router-dom";
import { checkUserToken } from "../utils/userToken";
import axios from "axios";

const Expenses = () => {
  const [expenseID, setExpenseID] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const { authenticated, user } = await checkUserToken();

      if (!authenticated && !user) {
        navigate("/login");
      } else {
        setIsAuthenticated(true);
      }
    };
    verifyAuth();
  }, [navigate]);

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

  // Deleting the Expense
  const handleDeleteExpense = (expenseID) => {
    axios
      .delete("http://localhost:8000/expenses", {
        data: { id: expenseID },
        withCredentials: true,
      })
      .then(() => console.log("ID sent successfully "))
      .catch(() => console.log("There was an error sending the ID"));
  };

  // Editing the Expense Data

  const handleExpenseID = (id, expense) => {
    setExpenseID(id);
    setExpenseData(expense);
  };

  const handleEditExpense = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateExpense = async () => {
    try {
      await axios.put(
        `http://localhost:8000/expenses`,
        {
          id: expenseID,
          ...expenseData,
        },
        { withCredentials: true }
      );
      console.log("The expense data is ", expenseData);
      console.log("Expense updated successfully");
      setExpenseID(null); // exit edit mode
      dispatch(fetchingAllExpenses()); // refresh list
    } catch (error) {
      console.error("Error updating expense", error);
    }
  };

  return (
    <div className=" pl-[22%] w-full py-20 pr-10 text-palePink font-roboto">
      <div className="w-full flex gap-10 items-center">
        <ExpenseCard />
        <CurrentBalanceCard />
      </div>

      {/* Expense Form  */}
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
                        <>
                          {expense._id === expenseID ? (
                            <tr key={expense._id}>
                              <td>
                                <input
                                  name="date"
                                  value={expenseData.date}
                                  onChange={handleEditExpense}
                                />
                              </td>
                              <td>
                                <input
                                  name="purpose"
                                  value={expenseData.purpose}
                                  onChange={handleEditExpense}
                                />
                              </td>
                              <td>
                                <input
                                  name="category"
                                  value={expenseData.category}
                                  onChange={handleEditExpense}
                                />
                              </td>
                              <td>
                                <input
                                  name="expenseAmount"
                                  value={expenseData.expenseAmount}
                                  onChange={handleEditExpense}
                                />
                              </td>
                              <td>
                                <button onClick={handleUpdateExpense}>
                                  Save
                                </button>
                                <button onClick={() => setExpenseID(null)}>
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          ) : (
                            <tr key={index}>
                              <td className=" px-4 py-2">{expense.date}</td>
                              <td className="max-w-md px-4 py-2">
                                {expense.purpose}
                              </td>
                              <td className=" px-4 py-2">{expense.category}</td>
                              <td className=" px-4 py-2">
                                {expense.expenseAmount}
                              </td>

                              <td className=" px-4 py-2">
                                <button
                                  onClick={() =>
                                    handleExpenseID(expense._id, expense)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                    />
                                  </svg>
                                </button>
                              </td>
                              <td className=" px-4 py-2">
                                <button
                                  onClick={() =>
                                    handleDeleteExpense(expense._id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </>
              ) : (
                // <>
                {
                  /* {expenses?.map((expense, index) => (
                    <tr key={index}>
                      <td className=" px-4 py-2">{expense.date}</td>
                      <td className="max-w-md px-4 py-2">{expense.purpose}</td>
                      <td className=" px-4 py-2">{expense.category}</td>
                      <td className=" px-4 py-2">{expense.expenseAmount}</td>
                    </tr>
                  ))}
                </> */
                }
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Expenses;
