import React, { useEffect, useState } from "react";
import IncomeForm from "./forms/IncomeForm";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserToken } from "../utils/userToken";
import {
  fetchingCurrency,
  fetchingIncome,
  fetchingIncomeDetails,
} from "../features/income/IncomeSlice";
import axios from "axios";

const Income = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [incomeID, setIncomeID] = useState(null);
  const [incomeData, setIncomeData] = useState([]);
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

  const {
    isCurrencyLoading,
    incomeDetails,
    isIncomeLoading,
    monthlyIncome,
    annualIncome,
    currency,
  } = useSelector((state) => state.incomeReducer);

  console.log("The income detail is ", incomeDetails);

  const currencySymbols = {
    Rupee: "₹",
    Dollar: "$",
    Euro: "€",
  };

  console.log(currencySymbols["Rupee"]);

  useEffect(() => {
    dispatch(fetchingIncomeDetails());
    dispatch(fetchingCurrency());
    dispatch(fetchingIncome());
  }, [dispatch]);

  // Deleting the Expense
  const handleDeleteIncome = (incomeID) => {
    axios
      .delete("http://localhost:8000/incomes", {
        data: { id: incomeID },
        withCredentials: true,
      })
      .then(() => console.log("ID sent successfully "))
      .catch(() => console.log("There was an error sending the ID"));
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
    try {
      await axios.put(
        `http://localhost:8000/incomes`,
        {
          id: incomeID,
          ...incomeData,
        },
        { withCredentials: true }
      );
      console.log("The income data is ", incomeData);
      console.log("Income updated successfully");
      setIncomeID(null); // exit edit mode
      dispatch(fetchingIncomeDetails()); // refresh list
    } catch (error) {
      console.error("Error updating income", error);
    }
  };

  return (
    <div className="pl-[22%] w-full py-20 pr-10 text-palePink font-roboto">
      <div className="flex gap-10 w-full">
        <div className="px-4 py-2 bg-textColor text-richBlack w-full">
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
      <IncomeForm />
      <div>
        <h1>All Incomes</h1>
        {incomeDetails?.map((incomeDetail, index) => (
          <>
            {incomeDetail._id === incomeID ? (
              <tr key={incomeDetail._id}>
                <td>
                  <select
                    name="category"
                    value={incomeData.category}
                    onChange={handleEditIncome}
                    className="border border-[#B8D279] text-white px-2 py-1 bg-black"
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
                    className="border border-[#B8D279] text-white px-2 py-1 bg-black"
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
                    name="annualIncome"
                    value={incomeData.annualIncome}
                    onChange={handleEditIncome}
                  />
                </td>
                <td>
                  <button onClick={handleUpdateIncome}>Save</button>
                  <button onClick={() => setIncomeID(null)}>Cancel</button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td className=" px-4 py-2">{incomeDetail.category}</td>
                <td className="max-w-md px-4 py-2">{incomeDetail.source}</td>
                <td className=" px-4 py-2">{incomeDetail.annualIncome}</td>
                <td className=" px-4 py-2">{incomeDetail.monthlyIncome}</td>

                <td className=" px-4 py-2">
                  <button
                    onClick={() =>
                      handleIncomeID(incomeDetail._id, incomeDetail)
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
                  <button onClick={() => handleDeleteIncome(incomeDetail._id)}>
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
      </div>
    </div>
  );
};

export default Income;
