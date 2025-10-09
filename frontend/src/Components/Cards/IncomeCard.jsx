import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchingCurrency,
  fetchingIncome,
} from "../../features/income/IncomeSlice";
import { motion } from "motion/react";
import Loader from "../Loader";

const IncomeCard = ({ seconds }) => {
  const dispatch = useDispatch();

  const { isIncomeLoading, annualIncome, monthlyIncome, currency } =
    useSelector((state) => state.incomeReducer);

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  useEffect(() => {
    dispatch(fetchingCurrency());
    dispatch(fetchingIncome());
  }, [dispatch]);
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }} // Start above & hidden
      animate={{ y: 0, opacity: 1 }} // Slide down into place
      transition={{ duration: 0.6, ease: "easeOut", delay: seconds }}
      className="px-4 py-2 bg-skyBlue text-richBlack  rounded-sm w-full"
    >
      <div>
        {isIncomeLoading ? (
          <Loader Text="Loading" bgBlack="bg-richBlack" />
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl font-inter">Annual Income</span>
            <span className="font-bold text-2xl pt-3 font-inter">
              <span className="pr-1">{currencySymbols[currency] || ""} </span>{" "}
              {annualIncome ?? 0}
            </span>
            <span className="pt-5 text-end font-roboto">
              Monthly Income{" "}
              <span className="pl-2">{currencySymbols[currency] || ""} </span>{" "}
              {monthlyIncome ?? 0}
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default IncomeCard;
