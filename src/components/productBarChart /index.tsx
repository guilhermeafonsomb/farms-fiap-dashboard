import type { Product } from "@/model/products";
import { ChartContainer, type ChartConfig } from "../ui/chart";
import { BarChart, Bar } from "recharts";
import { useMemo } from "react";

interface ProductBarChartProps {
  products: Product[];
}

export const ProductBarChart = ({ products }: ProductBarChartProps) => {
  const chartData = useMemo(() => {
    return (
      products?.map((item) => ({
        name: item.name,
        profit: item.profit,
        sales: item.sales,
        period: item.period,
      })) || []
    );
  }, [products]);

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {};
    products?.forEach((item) => {
      config[item.name] = {
        label: item.name,
        color: "#EBF2E8",
      };
    });
    return config;
  }, [products]);

  return (
    <ChartContainer config={chartConfig} className="h-96 w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="profit" fill="#EBF2E8" radius={4} barSize={100} />
      </BarChart>
    </ChartContainer>
  );
};
