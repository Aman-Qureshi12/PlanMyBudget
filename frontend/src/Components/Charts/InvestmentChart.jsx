import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
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
import { fetchInvestmentDetails } from "../../features/investment/InvestmentSlice";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Legend,
  Tooltip
);

const InvestmentChart = () => {
  const dispatch = useDispatch();
  const { investmentDetails } = useSelector((state) => state.investmentReducer);

  useEffect(() => {
    dispatch(fetchInvestmentDetails());
  }, [dispatch]);

  const monthlyData = useMemo(() => {
    const sum = Array(12).fill(0);
    investmentDetails?.forEach((investment) => {
      const monthIndex = new Date(investment.date).getMonth();
      sum[monthIndex] += investment.investmentAmount;
    });
    return sum;
  }, [investmentDetails]);

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
        label: "Monthly Investment",
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

export default InvestmentChart;
