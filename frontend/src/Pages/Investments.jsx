import InvestmentForm from "./forms/InvestmentForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestmentDetails } from "../features/investment/InvestmentSlice";
import InvestmentCard from "../Components/Cards/InvestmentCard";
import InvestmentChart from "../Components/Charts/InvestmentChart";
import InvestmentPieChart from "../Components/Charts/InvestmentPieChart";

const Investments = () => {
  const [filterByDate, setFilterByDate] = useState("");
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByCategory, setFilterByCategory] = useState("");
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

  return (
    <div className="pl-[22%] w-full py-20 pr-10">
      <InvestmentCard />
      <InvestmentForm />
      <div className="w-full flex justify-between items-center">
        <InvestmentChart />
        <InvestmentPieChart />
      </div>
      <div className="pt-10">
        <div className="flex justify-between">
          <h1>All Investments </h1>
          <div className="flex gap-10">
            {/* Filter by date  */}
            <div>
              <select
                onChange={handleFilterByDate}
                className="border-2 border-black rounded-sm px-4 py-2"
              >
                <option value="" disabled selected>
                  Filter By Date
                </option>
                <option value="Ascending">Ascending</option>
                <option value="Descending">Descending</option>
              </select>
            </div>
            {/* filter By month*/}
            <div>
              <select
                onChange={handleFilterByMonth}
                className="border-2 border-black rounded-sm px-4 py-2"
              >
                <option value="" disabled selected>
                  Filter By Months
                </option>
                <option value="1">Jan</option>
                <option value="2">Feb</option>
                <option value="3">Mar</option>
                <option value="4">Apr</option>
                <option value="5">May</option>
                <option value="6">Jun</option>
                <option value="7">Jul</option>
                <option value="8">Aug</option>
                <option value="9">Sep</option>
                <option value="10">Oct</option>
                <option value="11">Nov</option>
                <option value="12">Dec</option>
              </select>
            </div>
            {/* Filter By category  */}
            <div>
              <select
                onChange={handleFilterByCategory}
                className="border-2 border-black rounded-sm px-4 py-2"
              >
                <option value="" disabled selected>
                  Filter By Category
                </option>
                {filterCategories?.map((investment) => (
                  <option value={investment.category}>
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
          <table className=" w-full mt-8">
            <tbody>
              {filteredAndSortedInvestments ? (
                <>
                  {filteredAndSortedInvestments.length == 0 ? (
                    "There is no Investment in this month"
                  ) : (
                    <>
                      {filteredAndSortedInvestments.map((investment, index) => (
                        <tr key={index}>
                          <td className=" px-4 py-2">{investment.date}</td>
                          <td className="max-w-md px-4 py-2">
                            {investment.purpose}
                          </td>
                          <td className=" px-4 py-2">{investment.category}</td>
                          <td className=" px-4 py-2">
                            {investment.investmentAmount}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </>
              ) : (
                <>
                  {investmentDetails?.map((investment, index) => (
                    <tr key={index}>
                      <td className=" px-4 py-2">{investment.date}</td>
                      <td className="max-w-md px-4 py-2">
                        {investment.purpose}
                      </td>
                      <td className=" px-4 py-2">{investment.category}</td>
                      <td className=" px-4 py-2">
                        {investment.investmentAmount}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Investments;
