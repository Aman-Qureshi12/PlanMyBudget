import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMonthInvestment,
  fetchInvestmentDetails,
  fetchInvestmentTotal,
} from "../../features/investment/InvestmentSlice";

const InvestmentCard = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    totalInvestments,
    currentMonthInvestment: thisMonth,
  } = useSelector((state) => state.investmentReducer);

  useEffect(() => {
    dispatch(fetchInvestmentTotal());
    dispatch(fetchInvestmentDetails()).then(() => {
      dispatch(currentMonthInvestment());
    });
  }, [dispatch]);
  return (
    <div className="px-4 py-2 bg-Purple text-richBlack w-full rounded-sm">
      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl font-inter">Total Investment</span>
            <span className="font-bold text-2xl pt-3 font-inter">
              {" "}
              {totalInvestments}
            </span>
            <span className="pt-5 text-end font-roboto">
              Current Month Investments {thisMonth}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default InvestmentCard;
