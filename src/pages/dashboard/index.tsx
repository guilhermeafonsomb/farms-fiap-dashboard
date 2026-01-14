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
      <section className="flex flex-col gap-6">
        <h1 className="text-2xl text-black font-bold">Dashboard de Produtos</h1>
        <div
          role="status"
          aria-live="polite"
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary-500/20"></div>
            <p className="text-black text-lg">
              Carregando dados do dashboard...
            </p>
            <span className="sr-only">
              Por favor, aguarde enquanto os dados são carregados
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex flex-col gap-6">
        <h1 className="text-2xl text-black font-bold">Dashboard de Produtos</h1>
        <div
          role="alert"
          aria-live="assertive"
          className="bg-red-50 border-l-4 border-red-500 p-6 rounded"
        >
          <h2 className="text-red-800 font-bold text-lg mb-2">
            Erro ao carregar dados
          </h2>
          <p className="text-red-700 mb-4">
            Ocorreu um erro ao buscar os dados do dashboard. Por favor, tente
            novamente.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Recarregar página
          </button>
        </div>
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

      <section
        className="border border-primary-200 pr-12 rounded-lg"
        aria-label="Barra de Lucro por produto"
      >
        <ProductBarChart data={productData} />
      </section>

      <DashboardFilter />
      <Table columns={tableColumns} data={transformData(products ?? [])} />
    </section>
  );
};
