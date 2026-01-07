import { useEffect, useState } from "react";
import { DashboardFilter } from "@/components/dashboardFilter";
import { Table } from "@/components/table";
import { useProductsByPeriod } from "@/hooks/useProductsByPeriod";
import type { Product, ProductChart } from "@/model/products";
import { useDashboardFilterStore } from "@/store/dashboard";
import { formatCurrency } from "@/utils/currencyFormatter";
import { ProductBarChart } from "@/components/productBarChart ";

export const Dashboard = () => {
  const { selectFilterOption } = useDashboardFilterStore();

  const periodMap: Record<string, "Semanal" | "Mensal" | "Anual"> = {
    WEEKLY: "Semanal",
    MONTHLY: "Mensal",
    YEARLY: "Anual",
  };

  const period = periodMap[selectFilterOption] ?? "Mensal";

  const { data: products, isLoading, isError } = useProductsByPeriod(period);

  const [productData, setProductData] = useState<ProductChart[]>([]);

  const transformChartData = (apiData: Product[]) => {
    const formatData = apiData.map((item) => ({
      nome: item.nome,
      lucro: item.lucro,
      vendas: item.vendas,
      periodo: item.periodo,
    }));
    setProductData(formatData);
  };

  useEffect(() => {
    transformChartData(products ?? []);
  }, [products]);

  if (isLoading) {
    return (
      <section>
        <p className="text-black">Carregando...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <p className="text-black">Ocorreu um erro ao buscar os dados.</p>
      </section>
    );
  }

  const tableColumns = [
    { accessorKey: "products", header: "Produtos" },
    { accessorKey: "profit", header: "Lucro" },
    { accessorKey: "sales", header: "Vendas" },
    { accessorKey: "period", header: "Período" },
  ];

  const transformData = (apiData: Product[]) => {
    return apiData.map((item) => ({
      products: item.nome,
      profit: formatCurrency(item.lucro),
      sales: item.vendas,
      period: item.periodo,
    }));
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl text-black font-bold">Dashboard de Produtos</h1>

      <h2 className="text-lg text-black font-bold">Produtos por maior lucro</h2>

      <section className="border border-primary-200 pr-12 rounded-lg">
        <ProductBarChart data={productData} />
      </section>

      <DashboardFilter />
      <Table columns={tableColumns} data={transformData(products ?? [])} />
    </section>
  );
};
