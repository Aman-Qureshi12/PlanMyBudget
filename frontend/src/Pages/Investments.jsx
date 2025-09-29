import InvestmentForm from "./forms/InvestmentForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestmentDetails } from "../features/investment/InvestmentSlice";
import InvestmentCard from "../Components/Cards/InvestmentCard";
import InvestmentChart from "../Components/Charts/InvestmentChart";
import InvestmentPieChart from "../Components/Charts/InvestmentPieChart";
import CurrentBalanceCard from "../Components/Cards/CurrentBalanceCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checkUserToken } from "../utils/userToken";

const Investments = () => {
  const [investmentID, setInvestmentID] = useState("");
  const [investmentData, setInvestmentData] = useState([]);
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
  const navigate = useNavigate();
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

  const dispatch = useDispatch();
  const { investmentDetails, isLoading } = useSelector(
    (state) => state.investmentReducer
  );

  useEffect(() => {
    dispatch(fetchInvestmentDetails());
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

  const filterCategories = investmentDetails?.filter(
    (investment, index, self) =>
      index ===
      self.findIndex((invest) => invest.category === investment.category)
  );

  console.log("The new filtered Category is ", filterCategories);
  console.log("The new Category is ", filterByCategory);

  const filteredAndSortedInvestments = (investmentDetails || [])
    .filter((investment) => {
      const monthNumber = new Date(investment.date).getMonth() + 1;

      if (monthNumber === Number(filterByMonth) && filterByCategory === "") {
        return true;
      }

      if (filterByMonth === "" && filterByCategory === investment.category) {
        return true;
      }

      if (
        monthNumber === Number(filterByMonth) &&
        filterByCategory === investment.category
      ) {
        return true;
      }

      if (filterByMonth === "" && filterByCategory === "") {
        return true;
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

  // deleting Investments
  const handleDeleteInvestment = (id) => {
    axios
      .delete("http://localhost:8000/investments", {
        data: { id: id },
        withCredentials: true,
      })
      .then(() => console.log("ID sent successfully"))
      .catch((err) => console.log("There was an error sending the id ", err));
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
    await axios
      .put(
        "http://localhost:8000/investments",
        { id: investmentID, ...investmentData },
        { withCredentials: true }
      )
      .then(() => console.log("Updated successfully"))
      .catch(() => console.log("There was an error updating the data"));
    setInvestmentID(null);
    dispatch(fetchInvestmentDetails());
  };

  return (
    <div className="pl-[22%] w-full py-20 pr-10 font-roboto text-Purple">
      <div className="w-full flex gap-10 items-center">
        <InvestmentCard />
        <CurrentBalanceCard />
      </div>

      <InvestmentForm />
      <div className="w-full flex justify-between items-center">
        <InvestmentChart />
        <InvestmentPieChart />
      </div>
      <div className="pt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-inter">All Investments </h1>
          <div className="flex gap-10">
            {/* Filter by date  */}
            <div>
              <select
                onChange={handleFilterByDate}
                className="border-2 border-Purple rounded-sm px-4 py-2"
              >
                <option value="" disabled selected>
                  Filter By Date
                </option>
                <option className="text-richBlack" value="Ascending">
                  Ascending
                </option>
                <option className="text-richBlack" value="Descending">
                  Descending
                </option>
              </select>
            </div>
            {/* filter By month*/}
            <div>
              <select
                onChange={handleFilterByMonth}
                className="border-2 border-Purple rounded-sm px-4 py-2"
              >
                <option value="" disabled selected>
                  Filter By Months
                </option>
                <option className="text-richBlack" value="1">
                  Jan
                </option>
                <option className="text-richBlack" value="2">
                  Feb
                </option>
                <option className="text-richBlack" value="3">
                  Mar
                </option>
                <option className="text-richBlack" value="4">
                  Apr
                </option>
                <option className="text-richBlack" value="5">
                  May
                </option>
                <option className="text-richBlack" value="6">
                  Jun
                </option>
                <option className="text-richBlack" value="7">
                  Jul
                </option>
                <option className="text-richBlack" value="8">
                  Aug
                </option>
                <option className="text-richBlack" value="9">
                  Sep
                </option>
                <option className="text-richBlack" value="10">
                  Oct
                </option>
                <option className="text-richBlack" value="11">
                  Nov
                </option>
                <option className="text-richBlack" value="12">
                  Dec
                </option>
              </select>
            </div>
            {/* Filter By category  */}
            <div>
              <select
                onChange={handleFilterByCategory}
                className="border-2 border-Purple rounded-sm px-4 py-2"
              >
                <option value="" disabled selected>
                  Filter By Category
                </option>
                {filterCategories?.map((investment) => (
                  <option
                    className="text-richBlack"
                    value={investment.category}
                  >
                    {investment.category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {isLoading ? (
          "Loading ...."
        ) : (
          <table className=" w-full mt-8 text-lg">
            <tbody>
              {filteredAndSortedInvestments ? (
                <>
                  {filteredAndSortedInvestments.length == 0 ? (
                    "There is no Investment in this month"
                  ) : (
                    <>
                      {filteredAndSortedInvestments.map((investment, index) => (
                        <>
                          {investment._id === investmentID ? (
                            <tr key={investment._id}>
                              <td>
                                <input
                                  name="date"
                                  value={investmentData.date}
                                  onChange={handleEditInvestments}
                                />
                              </td>
                              <td>
                                <input
                                  name="purpose"
                                  value={investmentData.purpose}
                                  onChange={handleEditInvestments}
                                />
                              </td>
                              <td>
                                <input
                                  name="category"
                                  value={investmentData.category}
                                  onChange={handleEditInvestments}
                                />
                              </td>
                              <td>
                                <input
                                  name="investmentAmount"
                                  value={investmentData.investmentAmount}
                                  onChange={handleEditInvestments}
                                />
                              </td>
                              <td>
                                <button onClick={handleUpdateInvestments}>
                                  Save
                                </button>
                                <button onClick={() => setInvestmentID(null)}>
                                  Cancel
                                </button>
                              </td>
                            </tr>
                          ) : (
                            <tr key={index}>
                              <td className=" px-4 py-2">{investment.date}</td>
                              <td className="max-w-md px-4 py-2">
                                {investment.purpose}
                              </td>
                              <td className=" px-4 py-2">
                                {investment.category}
                              </td>
                              <td className=" px-4 py-2">
                                {investment.investmentAmount}
                              </td>
                              <td className=" px-4 py-2">
                                <button
                                  onClick={() =>
                                    handleEditInvestmentData(
                                      investment._id,
                                      investment
                                    )
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
                                <button
                                  onClick={() =>
                                    handleDeleteInvestment(investment._id)
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
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </>
                  )}
                </>
              ) : (
                ""
                // <>
                //   {investmentDetails?.map((investment, index) => (
                //     <tr key={index}>
                //       <td className=" px-4 py-2">{investment.date}</td>
                //       <td className="max-w-md px-4 py-2">
                //         {investment.purpose}
                //       </td>
                //       <td className=" px-4 py-2">{investment.category}</td>
                //       <td className=" px-4 py-2">
                //         {investment.investmentAmount}
                //       </td>
                //     </tr>
                //   ))}
                // </>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Investments;
