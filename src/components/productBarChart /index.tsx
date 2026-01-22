import type { Product } from "@/model/products";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ProductBarChartProps {
  data: Product[];
}

export const ProductBarChart = ({ data }: ProductBarChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    type: "bar",
    scales: {
      y: {
        beginAtZero: true,
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      x: {
        type: "category",

        bounds: "data",
        ticks: {
          color: "#61944F",
          font: {
            weight: "bold",
            size: 14,
          },
        },
        grid: { display: false },
        border: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  const chartData = {
    labels: data.map((product) => product.name),

    datasets: [
      {
        data: data.map((product) => product.profit),
        backgroundColor: "rgba(235, 242, 232)",
        barThickness: 62,
        maxBarThickness: 62,
        barPercentage: 0.6,
        categoryPercentage: data.length <= 3 ? 0.4 : 0.8,
        grouped: true,
      },
    ],
  };

  return (
    <Bar
      data-testid="bar"
      options={options as ChartOptions<"bar">}
      data={chartData}
    />
  );
};
