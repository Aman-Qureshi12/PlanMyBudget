import { Pie } from "react-chartjs-2";
import { Chart, Legend, Tooltip, ArcElement } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchInvestmentDetails } from "../../features/investment/InvestmentSlice";

Chart.register(Tooltip, Legend, ArcElement);

const InvestmentPieChart = () => {
  const dispatch = useDispatch();
  const { investmentDetails, isLoading } = useSelector(
    (state) => state.investmentReducer
  );

  useEffect(() => {
    dispatch(fetchInvestmentDetails());
  }, [dispatch]);

  const categoryTotal = [];

  investmentDetails?.forEach((investment) => {
    const category = investment.category;

    // If this category doesn’t exist yet, initialize it with 0
    if (!categoryTotal[category]) {
      categoryTotal[category] = 0;
    }

    // Add the expense amount
    categoryTotal[category] += investment.investmentAmount;
  });

  console.log("The category Total is ", categoryTotal);

  const labels = Object.keys(categoryTotal);
  const data = Object.values(categoryTotal);

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        label: "Money invested",
        data: data,
        backgroundColor: [
          "rgba(159, 12, 44, 0.2)",
          "rgba(0, 57, 95, 0.2)",
          "rgba(155, 111, 0, 0.2)",
          "rgba(10, 83, 83, 0.2)",
          "rgba(39, 9, 100, 0.2)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options = {};
  return (
    <div className="pt-10 w-[50%] h-[400px]">
      <Pie options={options} data={pieChartData} />
    </div>
  );
};

export default InvestmentPieChart;
