import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchingAllExpenses } from "../../features/expense/ExpenseSlice";
import { Bar, Line } from "react-chartjs-2";

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement, // change it to LineElement for Line Chart
  // PointElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement, // change it to LineElement for Line Chart
  // PointElement,
  Title,
  Legend,
  Tooltip
);

const ExpenseChart = ({ seconds, direction }) => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenseReducer);

  useEffect(() => {
    dispatch(fetchingAllExpenses());
  }, [dispatch]);

  const monthlyData = useMemo(() => {
    const sums = Array(12).fill(0);

    expenses?.forEach((expense) => {
      const monthIndex = new Date(expense.date).getMonth();
      sums[monthIndex] += expense.expenseAmount;
    });

    return sums;
  }, [expenses]);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Expense",
        data: monthlyData,
        borderColor: "#ead7d7",
        backgroundColor: "#ead7d7",
        // tension: 0.3,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#ead7d7", // legend text color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyColor: "#ead7d7",
        titleColor: "#ead7d7",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ead7d7",
        },
      },
      y: {
        ticks: {
          color: "#ead7d7",
        },
      },
    },
  };
  return (
    <div className="pt-10 w-full border-2 border-palePink px-4 py-4 rounded-sm">
      {/* <Line options={options} data={chartData} /> */}
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default ExpenseChart;
