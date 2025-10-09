import React, { useEffect, useState } from "react";
import IncomeForm from "./forms/IncomeForm";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "motion/react";
import {
  fetchingCurrency,
  fetchingIncome,
  fetchingIncomeDetails,
} from "../features/income/IncomeSlice";
import axios from "axios";
import Modal from "../Components/Modal";
import EditButton from "../Components/EditButton";
import DeleteButton from "../Components/DeleteButton";
import Loader from "../Components/Loader";
import SpinLoader from "../Components/SpinLoader";
import { useCheckUser } from "../hooks/checkUser";

const Income = () => {
  const [showModal, setShowModal] = useState({
    update: false,
    delete: false,
    add: false,
  });
  const [loadingID, setLoadingID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [incomeID, setIncomeID] = useState(null);
  const [incomeData, setIncomeData] = useState([]);
  const [showTempLoader, setShowTempLoader] = useState(false);
  const dispatch = useDispatch();

  useCheckUser();

  const triggerLoader = () => {
    setShowTempLoader(true);
    setTimeout(() => setShowTempLoader(false), 1000);
  };

  const {
    isLoading,
    incomeDetails,
    isIncomeLoading,
    monthlyIncome,
    annualIncome,
    currency,
  } = useSelector((state) => state.incomeReducer);

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };
  useEffect(() => {
    dispatch(fetchingIncomeDetails());
    dispatch(fetchingIncome());
    dispatch(fetchingCurrency());
  }, [dispatch]);

  // Modal logic
  const triggerModal = (type) => {
    setShowModal((prev) => ({ ...prev, [type]: true }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal({ update: false, delete: false, add: false });
    }, 2000);
    return () => clearTimeout(timer);
  }, [showModal.add, showModal.update, showModal.delete]);

  // Deleting the Income
  const handleDeleteIncome = (incomeID) => {
    setLoadingID(incomeID);
    triggerLoader();
    axios
      .delete("http://localhost:8000/incomes", {
        data: { id: incomeID },
        withCredentials: true,
      })
      .then(() => {
        dispatch(fetchingIncomeDetails());
        dispatch(fetchingIncome());
        triggerModal("delete");
      })
      .catch(() => console.log("There was an error sending the ID"))
      .finally(() => setLoadingID(null));
  };

  // Editing the Income Data

  const handleIncomeID = (id, income) => {
    setIncomeID(id);
    setIncomeData(income);
  };

  const handleEditIncome = (e) => {
    const { name, value } = e.target;
    setIncomeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateIncome = async () => {
    setLoading(true);
    triggerLoader();
    try {
      await axios.put(
        `http://localhost:8000/incomes`,
        {
          id: incomeID,
          ...incomeData,
        },
        { withCredentials: true }
      );

      setIncomeID(null); // exit edit mode
      dispatch(fetchingIncomeDetails());
      dispatch(fetchingIncome());
      triggerModal("update");
    } catch (error) {
      console.error("Error updating income", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" lg:pl-[22%] w-full py-20 max-lg:px-10 lg:pr-10 text-palePink font-roboto md:h-[100vh]">
      <div className="w-full max-sm:flex-col flex gap-10 items-center ">
        <motion.div
          initial={{ y: -100, opacity: 0 }} // Start above & hidden
          animate={{ y: 0, opacity: 1 }} // Slide down into place
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="px-4 py-2 bg-skyBlue text-richBlack w-full rounded-sm "
        >
          <div>
            {isIncomeLoading ? (
              <Loader Text="Loading" bgBlack="bg-richBlack" />
            ) : (
              <span className="text-2xl">
                Annual Income <br />
                <span className="font-bold ">
                  {currencySymbols[currency] || ""} {annualIncome}
                </span>
              </span>
            )}
          </div>
        </motion.div>
        <motion.div
          initial={{ y: -100, opacity: 0 }} // Start above & hidden
          animate={{ y: 0, opacity: 1 }} // Slide down into place
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="px-4 py-2 bg-skyBlue text-richBlack w-full rounded-sm"
        >
          <div>
            {isIncomeLoading ? (
              <Loader Text="Loading" bgBlack="bg-richBlack" />
            ) : (
              <span className="text-2xl">
                Monthly Income <br />
                <span className="font-bold ">
                  {currencySymbols[currency] || ""} {monthlyIncome}
                </span>
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Income Form  */}
      <IncomeForm triggerModal={triggerModal} Currency={currency} />
      <div className="w-full bg-richBlack">
        <h1 className="text-3xl font-inter text-skyBlue pt-10">All Incomes</h1>
        {isLoading || showTempLoader ? (
          <motion.div
            className="flex mt-10 justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <Loader bgBlack="bg-skyBlue" />
          </motion.div>
        ) : (
          <div className="overflow-x-auto mt-8">
            <table className=" w-full max-md:min-w-[800px] text-lg mx-1 text-skyBlue">
              <tbody>
                {incomeDetails?.map((incomeDetail, index) => (
                  <>
                    {incomeDetail._id === incomeID ? (
                      <motion.tr
                        initial={{ opacity: 0 }} // hidden
                        animate={{ opacity: 1 }} // visible
                        transition={{ duration: 1, ease: "easeOut" }} // fade-in speed
                        key={incomeDetail._id}
                      >
                        <td>
                          <select
                            name="category"
                            value={incomeData.category}
                            onChange={handleEditIncome}
                            className="px-4 py-1  mr-3 rounded-sm border-2 bg-richBlack border-textColor"
                          >
                            <option disabled value="">
                              Select Category
                            </option>
                            <option value="Primary">Primary</option>
                            <option value="Secondary">Secondary</option>
                          </select>
                        </td>
                        <td>
                          <input
                            className="px-4 py-1  mr-3"
                            name="source"
                            value={incomeData.source}
                            onChange={handleEditIncome}
                          />
                        </td>
                        <td>
                          <select
                            name="currency"
                            value={incomeData.currency}
                            onChange={handleEditIncome}
                            className="px-4 py-1  mr-3 rounded-sm border-2 bg-richBlack border-textColor"
                          >
                            <option disabled value="">
                              Select Currency
                            </option>
                            <option value="Rupee">Rupee</option>
                            <option value="Euro">Euro</option>
                            <option value="Dollar">Dollar</option>
                          </select>
                        </td>
                        <td>
                          <input
                            className="px-4 py-1  mr-3"
                            name="annualIncome"
                            value={incomeData.annualIncome}
                            onChange={handleEditIncome}
                          />
                        </td>
                        <td>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className="px-4 py-2 bg-black rounded-sm mr-3"
                            onClick={() => setIncomeID(null)}
                          >
                            Cancel
                          </motion.button>
                        </td>
                        <td>
                          <motion.button
                            name="update"
                            disabled={loading}
                            whileTap={{ scale: 0.9 }}
                            className={` ${
                              loading
                                ? "bg-gray-400  cursor-not-allowed w-[140px]"
                                : "bg-skyBlue "
                            } px-4 py-2 rounded-sm  text-richBlack`}
                            onClick={handleUpdateIncome}
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
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        key={index}
                      >
                        <td className=" px-4 py-2">{incomeDetail.category}</td>
                        <td className="max-w-md px-4 py-2">
                          {incomeDetail.source}
                        </td>
                        <td className=" px-4 py-2">
                          <span className="pr-1">
                            {currencySymbols[currency] || ""}{" "}
                          </span>
                          {incomeDetail.annualIncome}
                        </td>
                        <td className=" px-4 py-2 ">
                          <span className="pr-1">
                            {currencySymbols[currency] || ""}{" "}
                          </span>
                          {incomeDetail.monthlyIncome}
                        </td>

                        <td className=" px-4 py-2">
                          <EditButton
                            OnClick={() =>
                              handleIncomeID(incomeDetail._id, incomeDetail)
                            }
                          />
                        </td>
                        <td className=" px-4 py-2">
                          {loadingID == incomeDetail._id ? (
                            <SpinLoader />
                          ) : (
                            <DeleteButton
                              OnClick={() =>
                                handleDeleteIncome(incomeDetail._id)
                              }
                            />
                          )}
                        </td>
                      </motion.tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Modal
        Message="Updated Successfully"
        bgColor="skyBlue"
        show={showModal.update}
      />
      <Modal
        Message="Deleted Successfully"
        bgColor="skyBlue"
        show={showModal.delete}
      />
      <Modal
        Message="Added Successfully"
        bgColor="skyBlue"
        show={showModal.add}
      />
    </div>
  );
};

export default Income;
