import { Pie } from "react-chartjs-2";
import { Chart, Legend, Tooltip, ArcElement } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchInvestmentDetails } from "../../features/investment/InvestmentSlice";
import { scaleOrdinal } from "d3-scale";
import { schemeSet3 } from "d3-scale-chromatic";

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

  const colorScale = scaleOrdinal(schemeSet3);

  const backgroundColors = labels.map((_, index) => colorScale(index));

  const pieChartData = {
    labels,
    datasets: [
      {
        label: "Money Spent",
        data,
        backgroundColor: backgroundColors,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: " #b892ff", // 👈 legend text color
          font: {
            size: 14,
            // weight: "bold",
          },
        },
      },
      tooltip: {
        bodyColor: " #b892ff", // 👈 tooltip text color
        titleColor: "#b892ff", // 👈 tooltip title color
      },
    },
  };

  return (
    <div className="pt-10 w-[50%] h-[400px]">
      <Pie options={options} data={pieChartData} />
    </div>
  );
};

export default InvestmentPieChart;
