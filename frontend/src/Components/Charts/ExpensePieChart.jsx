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
    <div className="pt-10 w-[50%] h-[400px]">
      <Pie options={options} data={pieChartData} />
    </div>
  );
};

export default ExpensePieChart;
