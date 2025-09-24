import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingIncome } from "../../features/income/IncomeSlice";

const IncomeCard = () => {
  const dispatch = useDispatch();

  const { isIncomeLoading, annualIncome, monthlyIncome } = useSelector(
    (state) => state.incomeReducer
  );

  useEffect(() => {
    dispatch(fetchingIncome());
  }, [dispatch]);
  return (
    <div className="px-4 py-2 bg-black text-white w-full rounded-sm ">
      <div>
        {isIncomeLoading ? (
          "Loading"
        ) : (
          <p className="flex flex-col">
            <span className="text-2xl">Annual Income</span>
            <span className="font-bold text-2xl pt-3"> {annualIncome}</span>
            <span className="pt-5 text-end">
              Monthly Income {monthlyIncome}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeCard;
