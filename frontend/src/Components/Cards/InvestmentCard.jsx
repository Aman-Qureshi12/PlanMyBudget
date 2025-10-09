import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMonthInvestment,
  fetchInvestmentDetails,
  fetchInvestmentTotal,
} from "../../features/investment/InvestmentSlice";
import { fetchingCurrency } from "../../features/income/IncomeSlice";
import { motion } from "motion/react";
import Loader from "../Loader";

const InvestmentCard = ({ seconds, direction }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.investmentReducer.isLoading);
  const totalInvestments = useSelector(
    (state) => state.investmentReducer.totalInvestments
  );
  const thisMonth = useSelector(
    (state) => state.investmentReducer.currentMonthInvestment
  );
  const currency = useSelector((state) => state.incomeReducer.currency);
  const investmentDetails = useSelector(
    (state) => state.investmentReducer.investmentDetails
  );

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  useEffect(() => {
    dispatch(fetchingCurrency());
  }, [dispatch]);

  useEffect(() => {
    if (investmentDetails?.length > 0) {
      dispatch(fetchInvestmentTotal());
      dispatch(currentMonthInvestment());
    }
  }, [dispatch, investmentDetails?.length]); // 👈 watch for changes

  return (
    <motion.div
      initial={{ y: direction, opacity: 0 }} // Start above & hidden
      animate={{ y: 0, opacity: 1 }} // Slide down into place
      transition={{ duration: 0.6, ease: "easeOut", delay: seconds }}
      className="px-4 py-2 bg-Purple text-richBlack w-full rounded-sm"
    >
      <div>
        {isLoading ? (
          <Loader Text="Loading" bgBlack="bg-richBlack" />
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl font-inter">Total Investment</span>
            <span className="font-bold text-2xl pt-3 font-inter">
              <span className="pr-1">{currencySymbols[currency] || ""} </span>
              {totalInvestments}
            </span>
            <span className="pt-5 text-end font-roboto">
              Current Month Investments{" "}
              <span className="pl-2">{currencySymbols[currency] || ""} </span>{" "}
              {thisMonth}
            </span>
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default InvestmentCard;
