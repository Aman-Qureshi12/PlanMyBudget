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
  const { investmentDetails } = useSelector((state) => state.investmentReducer);

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

  const labels = Object.keys(categoryTotal);
  let data = Object.values(categoryTotal);

  const colorScale = scaleOrdinal(schemeSet3);

  let backgroundColors = labels.map((_, index) => colorScale(index));

  if (data.length === 0) {
    data = [0.1];
    labels.push("No Data");
    backgroundColors = ["#b892ff"]; // neutral gray
  }

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
          color: " #b892ff",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyColor: " #b892ff",
        titleColor: "#b892ff",
      },
    },
  };

  return (
    <div className="pt-10 w-[50%] max-small:w-full small:w-[50%] small:h-full">
      <Pie options={options} data={pieChartData} />
    </div>
  );
};

export default InvestmentPieChart;
