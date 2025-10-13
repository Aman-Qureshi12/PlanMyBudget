import { useEffect, useState } from "react";
import ExpenseForm from "./forms/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchingAllExpenses } from "../features/expense/ExpenseSlice";
import ExpenseChart from "../Components/Charts/ExpenseChart";
import ExpenseCard from "../Components/Cards/ExpenseCard";
import ExpensePieChart from "../Components/Charts/ExpensePieChart";
import CurrentBalanceCard from "../Components/Cards/CurrentBalanceCard";
import axios from "axios";
import { fetchingCurrency } from "../features/income/IncomeSlice";
import { motion } from "motion/react";
import Modal from "../Components/Modal";
import EditButton from "../Components/EditButton";
import DeleteButton from "../Components/DeleteButton";
import FilterByDate from "../Components/filters/FilterByDate";
import FilterByMonth from "../Components/filters/FilterByMonth";
import FilterByCategory from "../Components/filters/FilterByCategory";
import SpinLoader from "../Components/SpinLoader";
import Loader from "../Components/Loader";
import { useCheckUser } from "../hooks/checkUser";

const Expenses = () => {
  const [showModal, setShowModal] = useState({
    update: false,
    delete: false,
    add: false,
  });
  const [apiErrors, setApiErrors] = useState(false);
  const [loadingID, setLoadingID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expenseID, setExpenseID] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [showTempLoader, setShowTempLoader] = useState(false);

  useCheckUser();

  // Dispatching the actions
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenseReducer.expenses);
  const isLoading = useSelector((state) => state.expenseReducer.isLoading);
  const currency = useSelector((state) => state.incomeReducer.currency);

  const triggerLoader = () => {
    setShowTempLoader(true);
    setTimeout(() => setShowTempLoader(false), 1000);
  };

  useEffect(() => {
    dispatch(fetchingAllExpenses());
    dispatch(fetchingCurrency());
  }, [dispatch]);

  // Currency symbol check
  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  // Handling the filters

  const handleFilterByDate = (e) => {
    setFilterByDate(e.target.value);
  };
  const handleFilterByMonth = (e) => {
    setFilterByMonth(e.target.value);
  };

  const handleFilterByCategory = (e) => {
    setFilterByCategory(e.target.value);
  };

  const filterCategories = expenses
    ?.map((expense) => {
      return {
        ...expense,
        category:
          expense.category.charAt(0).toUpperCase() +
          expense.category.slice(1).toLowerCase(),
      };
    })
    .filter(
      (expense, index, self) =>
        index === self.findIndex((e) => e.category === expense.category)
    );

  const normalizedFilterCategory = filterByCategory
    ? filterByCategory.charAt(0).toUpperCase() +
      filterByCategory.slice(1).toLowerCase()
    : "";

  const filteredAndSortedExpenses = (expenses || [])
    .filter((expense) => {
      const monthNumber = new Date(expense.date).getMonth() + 1;
      const normalizedCategory =
        expense.category.charAt(0).toUpperCase() +
        expense.category.slice(1).toLowerCase();

      if (
        (!filterByMonth || Number(filterByMonth) === 0) &&
        (!filterByCategory || filterByCategory.toLowerCase() === "all")
      ) {
        return true;
      }

      //  Only month filter
      if (
        filterByMonth &&
        Number(filterByMonth) !== 0 &&
        (!filterByCategory || filterByCategory.toLowerCase() === "all")
      ) {
        return monthNumber === Number(filterByMonth);
      }

      //  Only category filter
      if (
        (!filterByMonth || Number(filterByMonth) === 0) &&
        filterByCategory &&
        filterByCategory.toLowerCase() !== "all"
      ) {
        return normalizedCategory === normalizedFilterCategory;
      }

      // Both filters applied
      if (
        filterByMonth &&
        Number(filterByMonth) !== 0 &&
        filterByCategory &&
        filterByCategory.toLowerCase() !== "all"
      ) {
        return (
          monthNumber === Number(filterByMonth) &&
          normalizedCategory === normalizedFilterCategory
        );
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
      if (filterByDate == "all") return 0;
    });

  // Modal logic
  const triggerModal = (type) => {
    setShowModal((prev) => ({ ...prev, [type]: true }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal({ update: false, delete: false, add: false, errors: false });
      setApiErrors(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showModal.add, showModal.update, showModal.delete, apiErrors]);

  // Deleting the Expense
  const handleDeleteExpense = (expenseID) => {
    setLoadingID(expenseID);
    triggerLoader();
    axios
      .delete("https://planmybudget-backend.onrender.com/expenses", {
        data: { id: expenseID },
        withCredentials: true,
      })
      .then(() => {
        triggerModal("delete");
        dispatch(fetchingAllExpenses());
      })
      .catch(() => {
        setApiErrors(true);
      })
      .finally(() => setLoadingID(null));
  };

  // updating the expense data
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
    setLoading(true);
    triggerLoader();
    try {
      await axios.put(
        `https://planmybudget-backend.onrender.com/expenses`,
        {
          id: expenseID,
          ...expenseData,
        },
        { withCredentials: true }
      );
      setExpenseID(null);
      dispatch(fetchingAllExpenses());
      triggerModal("update");
    } catch {
      setApiErrors(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" lg:pl-[22%] w-full py-20 max-lg:px-10 lg:pr-10 text-palePink font-roboto">
      <div className="w-full max-sm:flex-col flex gap-10 items-center ">
        <ExpenseCard seconds={0.1} direction={-100} />
        <CurrentBalanceCard seconds={0.4} direction={-100} />
      </div>

      {/* Expense Form  */}
      <ExpenseForm triggerModal={triggerModal} setApiErrors={setApiErrors} />
      <div className="w-full flex max-small:flex-col justify-between items-center  gap-10  small:overflow-x-auto">
        <ExpenseChart />
        <ExpensePieChart />
      </div>
      <div className="pt-10">
        <div className="flex max-md:flex-col justify-between items-center ">
          <h1 className="text-2xl font-inter  max-md:pb-10">All Expenses </h1>
          <motion.div
            initial={{ x: 100, opacity: 0 }} // Start above & hidden
            animate={{ x: 0, opacity: 1 }} // Slide down into place
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="flex max-md:gap-5 md:gap-10 flex-wrap items-center justify-center"
          >
            {/* Filter by date  */}
            <div className="max-small:w-full">
              <FilterByDate OnChange={handleFilterByDate} />
            </div>
            {/* filter By month*/}
            <div className="max-small:w-full">
              <FilterByMonth OnChange={handleFilterByMonth} />
            </div>
            {/* Filter By category  */}
            <div className="max-small:w-full">
              <FilterByCategory
                OnChange={handleFilterByCategory}
                categories={filterCategories}
              />
            </div>
          </motion.div>
        </div>
        {isLoading || showTempLoader ? (
          <motion.div
            className="flex mt-10 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Loader bgBlack="bg-palePink" />
          </motion.div>
        ) : (
          <div
            className={`${
              expenseID ? "overflow-x-auto" : ""
            }  mt-8 max-md:overflow-x-auto`}
          >
            <table className="w-full max-md:min-w-[800px] text-lg mx-1">
              <tbody>
                {filteredAndSortedExpenses && (
                  <>
                    {filteredAndSortedExpenses.length == 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No expense
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filteredAndSortedExpenses.map((expense, index) => (
                          <>
                            {expense._id === expenseID ? (
                              <motion.tr
                                initial={{ opacity: 0 }} // hidden
                                animate={{ opacity: 1 }} // visible
                                transition={{ duration: 1, ease: "easeOut" }} // fade-in speed
                                key={expense._id}
                              >
                                <td>
                                  <input
                                    type="date"
                                    className=" px-4 py-1  mr-3"
                                    name="date"
                                    value={expenseData.date}
                                    onChange={handleEditExpense}
                                  />
                                </td>
                                <td>
                                  <input
                                    className=" px-4 py-1 mr-3 "
                                    name="purpose"
                                    value={expenseData.purpose}
                                    onChange={handleEditExpense}
                                  />
                                </td>
                                <td>
                                  <input
                                    className=" px-4 py-1  mr-3"
                                    name="category"
                                    value={expenseData.category}
                                    onChange={handleEditExpense}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className=" px-4 py-1 mr-3"
                                    name="expenseAmount"
                                    value={expenseData.expenseAmount}
                                    onChange={handleEditExpense}
                                  />
                                </td>
                                <td>
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    className="px-4 py-2 bg-black rounded-sm mr-3"
                                    onClick={() => setExpenseID(null)}
                                  >
                                    Cancel
                                  </motion.button>
                                </td>
                                <td>
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    disabled={loading}
                                    name="update"
                                    className={` ${
                                      loading
                                        ? "bg-gray-400 cursor-not-allowed w-[140px]"
                                        : "bg-palePink "
                                    } px-4 py-2 rounded-sm  text-richBlack`}
                                    onClick={handleUpdateExpense}
                                  >
                                    {loading ? "Please wait..." : "Save"}
                                  </motion.button>
                                </td>
                              </motion.tr>
                            ) : (
                              <motion.tr
                                key={expense._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                              >
                                <td className=" px-4 py-2">{expense.date}</td>
                                <td className="max-w-md px-4 py-2">
                                  {expense.purpose}
                                </td>
                                <td className=" px-4 py-2">
                                  {expense.category}
                                </td>
                                <td className=" px-4 py-2">
                                  <span className="pr-1">
                                    {currencySymbols[currency] || ""}{" "}
                                  </span>
                                  {expense.expenseAmount}
                                </td>

                                <td className=" px-4 py-2">
                                  <EditButton
                                    OnClick={() =>
                                      handleExpenseID(expense._id, expense)
                                    }
                                  />
                                </td>
                                <td className=" px-4 py-2">
                                  {loadingID == expense._id ? (
                                    <SpinLoader />
                                  ) : (
                                    <DeleteButton
                                      OnClick={() =>
                                        handleDeleteExpense(expense._id)
                                      }
                                    />
                                  )}
                                </td>
                              </motion.tr>
                            )}
                          </>
                        ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        Message="Updated Successfully"
        bgColor="bg-palePink"
        show={showModal.update}
      />

      <Modal
        Message="Deleted Successfully"
        bgColor="bg-palePink"
        show={showModal.delete}
      />
      <Modal
        Message="Added Successfully"
        bgColor="bg-palePink"
        show={showModal.add}
      />
      <Modal
        Message="Something went wrong"
        bgColor="bg-red-700"
        show={apiErrors}
      />
    </div>
  );
};

export default Expenses;
