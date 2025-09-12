import React, { useEffect } from "react";
import InvestmentForm from "./forms/InvestmentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvestmentDetails,
  fetchInvestmentTotal,
} from "../features/investment/InvestmentSlice";

const Investments = () => {
  const dispatch = useDispatch();
  const { investmentDetails, isLoading, totalInvestments } = useSelector(
    (state) => state.investmentReducer
  );

  useEffect(() => {
    dispatch(fetchInvestmentDetails());
    dispatch(fetchInvestmentTotal());
  }, [dispatch]);

  return (
    <div className="w-full py-20 pr-10">
      <div className="flex gap-10 w-full">
        <div className="px-4 py-2 bg-black text-white w-full">
          <p>
            {isLoading ? (
              "Loading"
            ) : (
              <span className="text-2xl">
                Total expense <br />
                <span className="font-bold "> {totalInvestments}</span>
              </span>
            )}
          </p>
        </div>
        <div className="px-4 py-2 bg-black text-white w-full">
          <p>
            {isLoading ? (
              "Loading"
            ) : (
              <span className="text-2xl">
                Current Balance <br />
                <span className="font-bold "> {totalInvestments}</span>
              </span>
            )}
          </p>
        </div>
      </div>
      <InvestmentForm />
      <div>
        {isLoading ? (
          "Loading ...."
        ) : (
          <table className=" w-full ">
            <tbody>
              {investmentDetails?.map((investment, index) => (
                <tr key={index}>
                  <td className=" px-4 py-2">{investment.date}</td>
                  <td className="max-w-md px-4 py-2">{investment.purpose}</td>
                  <td className=" px-4 py-2">{investment.category}</td>
                  <td className=" px-4 py-2">{investment.investmentAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Investments;
