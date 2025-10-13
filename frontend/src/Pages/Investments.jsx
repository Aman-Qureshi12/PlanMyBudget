import InvestmentForm from "./forms/InvestmentForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestmentDetails } from "../features/investment/InvestmentSlice";
import InvestmentCard from "../Components/Cards/InvestmentCard";
import InvestmentChart from "../Components/Charts/InvestmentChart";
import InvestmentPieChart from "../Components/Charts/InvestmentPieChart";
import CurrentBalanceCard from "../Components/Cards/CurrentBalanceCard";
import axios from "axios";
import { fetchingCurrency } from "../features/income/IncomeSlice";
import { motion } from "motion/react";
import Modal from "../Components/Modal";
import DeleteButton from "../Components/DeleteButton";
import EditButton from "../Components/EditButton";
import FilterByMonth from "../Components/filters/FilterByMonth";
import FilterByCategory from "../Components/filters/FilterByCategory";
import FilterByDate from "../Components/filters/FilterByDate";
import SpinLoader from "../Components/SpinLoader";
import Loader from "../Components/Loader";
import { useCheckUser } from "../hooks/checkUser";

const Investments = () => {
  const [showModal, setShowModal] = useState({
    update: false,
    delete: false,
    add: false,
  });
  const [apiErrors, setApiErrors] = useState(false);
  const [loadingID, setLoadingID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [investmentID, setInvestmentID] = useState("");
  const [investmentData, setInvestmentData] = useState([]);
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const [showTempLoader, setShowTempLoader] = useState(false);

  useCheckUser(); // Checking if the user is signed in or not

  const dispatch = useDispatch();
  const investmentDetails = useSelector(
    (state) => state.investmentReducer.investmentDetails
  );
  const isLoading = useSelector((state) => state.investmentReducer.isLoading);
  const currency = useSelector((state) => state.incomeReducer.currency);

  const triggerLoader = () => {
    setShowTempLoader(true);
    setTimeout(() => setShowTempLoader(false), 1000);
  };

  // Currency check
  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  useEffect(() => {
    dispatch(fetchInvestmentDetails());
    dispatch(fetchingCurrency());
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

  const filterCategories = investmentDetails
    ?.map((investment) => {
      return {
        ...investment,
        category:
          investment.category.charAt(0).toUpperCase() +
          investment.category.slice(1).toLowerCase(),
      };
    })
    .filter(
      (investment, index, self) =>
        index ===
        self.findIndex((invest) => invest.category === investment.category)
    );

  const normalizedFilterCategory = filterByCategory
    ? filterByCategory.charAt(0).toUpperCase() +
      filterByCategory.slice(1).toLowerCase()
    : "";

  const filteredAndSortedInvestments = (investmentDetails || [])
    .filter((investment) => {
      const monthNumber = new Date(investment.date).getMonth() + 1;
      const normalizedCategory =
        investment.category.charAt(0).toUpperCase() +
        investment.category.slice(1).toLowerCase();

      //  No filters → show all
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

      //  Both filters applied
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
      return 0;
    });

  // Modal logic
  const triggerModal = (type) => {
    setShowModal((prev) => ({ ...prev, [type]: true }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal({ update: false, delete: false, add: false });
      setApiErrors(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showModal.add, showModal.update, showModal.delete, apiErrors]);

  // deleting Investments
  const handleDeleteInvestment = (id) => {
    setLoadingID(id);
    triggerLoader();
    axios
      .delete("https://planmybudget-backend.onrender.com/investments", {
        data: { id: id },
        withCredentials: true,
      })
      .then(() => {
        triggerModal("delete");
        dispatch(fetchInvestmentDetails());
      })
      .catch(() => setApiErrors(true))
      .finally(() => setLoadingID(null));
  };

  const handleEditInvestmentData = (id, investment) => {
    setInvestmentID(id);
    setInvestmentData(investment);
  };

  const handleEditInvestments = (e) => {
    const { name, value } = e.target;
    setInvestmentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateInvestments = async () => {
    setLoading(true);
    triggerLoader();
    await axios
      .put(
        "https://planmybudget-backend.onrender.com/investments",
        { id: investmentID, ...investmentData },
        { withCredentials: true }
      )
      .then(() => {
        triggerModal("update");
        dispatch(fetchInvestmentDetails());
      })
      .catch(() => setApiErrors(true))
      .finally(() => setLoading(false));
    setInvestmentID(null);
  };

  return (
    <div className="lg:pl-[22%] w-full py-20 max-lg:px-10 lg:pr-10 font-roboto text-Purple ">
      <div className="w-full max-sm:flex-col flex gap-10 items-center">
        <InvestmentCard seconds={0.1} direction={-100} />
        <CurrentBalanceCard seconds={0.4} direction={-100} />
      </div>

      <InvestmentForm triggerModal={triggerModal} setApiErrors={setApiErrors} />
      <div className="w-full flex max-small:flex-col justify-between items-center  gap-10  small:overflow-x-auto">
        <InvestmentChart />
        <InvestmentPieChart />
      </div>
      <div className="pt-10">
        <div className="flex max-md:flex-col justify-between items-center">
          <h1 className="text-2xl font-inter max-md:pb-10">All Investments </h1>
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
            <Loader bgBlack="bg-Purple" />
          </motion.div>
        ) : (
          <div
            className={`${
              investmentID ? "overflow-x-auto" : ""
            }  mt-8 max-md:overflow-x-auto`}
          >
            <table className="w-full max-md:min-w-[800px] text-lg mx-1">
              <tbody>
                {filteredAndSortedInvestments ? (
                  <>
                    {filteredAndSortedInvestments.length == 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No Investment
                        </td>
                      </tr>
                    ) : (
                      <>
                        {filteredAndSortedInvestments.map(
                          (investment, index) => (
                            <>
                              {investment._id === investmentID ? (
                                <motion.tr
                                  initial={{ opacity: 0 }} // hidden
                                  animate={{ opacity: 1 }} // visible
                                  transition={{ duration: 1, ease: "easeOut" }} // fade-in speed
                                  key={investment._id}
                                >
                                  <td>
                                    <input
                                      type="date"
                                      className=" px-4 py-1  mr-3"
                                      name="date"
                                      value={investmentData.date}
                                      onChange={handleEditInvestments}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      name="purpose"
                                      className=" px-4 py-1  mr-3"
                                      value={investmentData.purpose}
                                      onChange={handleEditInvestments}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      name="category"
                                      className=" px-4 py-1  mr-3"
                                      value={investmentData.category}
                                      onChange={handleEditInvestments}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className=" px-4 py-1  mr-3"
                                      name="investmentAmount"
                                      value={investmentData.investmentAmount}
                                      onChange={handleEditInvestments}
                                    />
                                  </td>
                                  <td>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      className="px-4 py-2 bg-black rounded-sm mr-3"
                                      onClick={() => setInvestmentID(null)}
                                    >
                                      Cancel
                                    </motion.button>
                                  </td>
                                  <td>
                                    <motion.button
                                      whileTap={{ scale: 0.9 }}
                                      className={` ${
                                        loading
                                          ? "bg-gray-400 cursor-not-allowed w-[140px]"
                                          : "bg-Purple "
                                      } px-4 py-2 rounded-sm  text-richBlack`}
                                      onClick={handleUpdateInvestments}
                                    >
                                      {loading ? "Please wait..." : "Save"}
                                    </motion.button>
                                  </td>
                                </motion.tr>
                              ) : (
                                <motion.tr
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{
                                    duration: 0.4,
                                    ease: "easeOut",
                                  }}
                                  key={index}
                                >
                                  <td className=" px-4 py-2">
                                    {investment.date}
                                  </td>
                                  <td className="max-w-md px-4 py-2">
                                    {investment.purpose}
                                  </td>
                                  <td className=" px-4 py-2">
                                    {investment.category}
                                  </td>
                                  <td className=" px-4 py-2">
                                    <span className="pr-1">
                                      {currencySymbols[currency] || ""}{" "}
                                    </span>{" "}
                                    {investment.investmentAmount}
                                  </td>
                                  <td className=" px-4 py-2 ">
                                    <EditButton
                                      OnClick={() =>
                                        handleEditInvestmentData(
                                          investment._id,
                                          investment
                                        )
                                      }
                                    />
                                  </td>
                                  <td className=" px-4 py-2">
                                    {loadingID == investment._id ? (
                                      <SpinLoader />
                                    ) : (
                                      <DeleteButton
                                        OnClick={() =>
                                          handleDeleteInvestment(investment._id)
                                        }
                                      />
                                    )}
                                  </td>
                                </motion.tr>
                              )}
                            </>
                          )
                        )}
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        Message="Updated Successfully"
        bgColor="bg-Purple"
        show={showModal.update}
      />
      <Modal
        Message="Deleted Successfully"
        bgColor="bg-Purple"
        show={showModal.delete}
      />
      <Modal
        Message="Added Successfully"
        bgColor="bg-Purple"
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

export default Investments;
