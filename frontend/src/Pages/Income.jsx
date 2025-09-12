import React, { useEffect } from "react";
import IncomeForm from "./forms/IncomeForm";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchingCurrency,
  fetchingIncome,
} from "../features/income/IncomeSlice";

const Income = () => {
  const dispatch = useDispatch();

  const {
    isCurrencyLoading,
    isIncomeLoading,
    monthlyIncome,
    annualIncome,
    currency,
  } = useSelector((state) => state.incomeReducer);

  console.log(isIncomeLoading, monthlyIncome, annualIncome, currency);

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  console.log(currencySymbols["Rupee"]);

  useEffect(() => {
    dispatch(fetchingCurrency());
    dispatch(fetchingIncome());
  }, [dispatch]);
  return (
    <div className="w-[100%] pr-10 py-20">
      <div className="flex gap-10 w-full">
        <div className="px-4 py-2 bg-black text-white w-full">
          <p>
            {isIncomeLoading ? (
              "Loading"
            ) : (
              <span className="text-2xl">
                Annual Income <br />
                <span className="font-bold ">
                  {currencySymbols[currency] || ""} {annualIncome}
                </span>
              </span>
            )}
          </p>
        </div>
        <div className="px-4 py-2 bg-black text-white w-full">
          <p>
            {isIncomeLoading ? (
              "Loading"
            ) : (
              <span className="text-2xl">
                Monthly Income <br />
                <span className="font-bold "> {monthlyIncome}</span>
              </span>
            )}
          </p>
        </div>
      </div>
      {annualIncome ? null : <IncomeForm />}
    </div>
  );
};

export default Income;
