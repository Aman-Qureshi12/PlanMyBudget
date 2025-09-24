import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchingAllExpenses } from "../../features/expense/ExpenseSlice";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Legend,
  Tooltip
);

const ExpenseChart = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenseReducer);

  useEffect(() => {
    dispatch(fetchingAllExpenses());
  }, [dispatch]);
  console.log(expenses);

  const monthlyData = useMemo(() => {
    const sums = Array(12).fill(0); // [0,0,...,0] for 12 months

    expenses?.forEach((expense) => {
      const monthIndex = new Date(expense.date).getMonth(); // 0 = Jan, 11 = Dec
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
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.3,
      },
    ],
  };
  const options = {};
  return (
    <div className="pt-10 w-full">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default ExpenseChart;
