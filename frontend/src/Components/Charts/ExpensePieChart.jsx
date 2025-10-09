import { Pie } from "react-chartjs-2";
import { Chart, Legend, Tooltip, ArcElement } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchingAllExpenses } from "../../features/expense/ExpenseSlice";
import { scaleOrdinal } from "d3-scale";
import { schemeSet3 } from "d3-scale-chromatic";

Chart.register(Tooltip, Legend, ArcElement);

const ExpensePieChart = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenseReducer);

  useEffect(() => {
    dispatch(fetchingAllExpenses());
  }, [dispatch]);

  const categoryTotal = [];

  expenses?.forEach((expense) => {
    const category = expense.category;

    // If this category doesn’t exist yet, initialize it with 0
    if (!categoryTotal[category]) {
      categoryTotal[category] = 0;
    }

    // Add the expense amount
    categoryTotal[category] += expense.expenseAmount;
  });

  const labels = Object.keys(categoryTotal);
  let data = Object.values(categoryTotal);

  const colorScale = scaleOrdinal(schemeSet3);

  let backgroundColors = labels.map((_, index) => colorScale(index));

  if (data.length === 0) {
    data = [0.1];
    labels.push("No Data");
    backgroundColors = ["#ead7d7"]; // neutral gray
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
          color: " #ead7d7",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyColor: " #ead7d7",
        titleColor: "#ead7d7",
      },
    },
  };

  return (
    <div className="pt-10 max-small:w-full small:w-[50%] small:h-full">
      <Pie options={options} data={pieChartData} />
    </div>
  );
};

export default ExpensePieChart;
