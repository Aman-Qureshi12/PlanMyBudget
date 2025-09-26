import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  // PointElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import { fetchInvestmentDetails } from "../../features/investment/InvestmentSlice";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  // PointElement,
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
        borderColor: "#b892ff",
        backgroundColor: "#b892ff",
        tension: 0.3,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        labels: {
          color: "#b892ff", // legend text color
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyColor: "#b892ff",
        titleColor: "#b892ff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#b892ff",
        },
      },
      y: {
        ticks: {
          color: "#b892ff",
        },
      },
    },
  };

  return (
    <div className="pt-10 w-full border-2 border-Purple px-4 py-4 rounded-sm">
      {/* <Line options={options} data={chartData} /> */}
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default InvestmentChart;
