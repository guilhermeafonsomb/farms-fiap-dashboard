import { useEffect, useState } from "react";
import { DashboardFilter } from "@/components/dashboardFilter";
import { TableComponent as Table } from "@/components/table";
import { useProductsByPeriod } from "@/hooks/useProductsByPeriod";
import type { Product, ProductChart } from "@/model/products";
import { useDashboardFilterStore } from "@/store/dashboard";
import { formatCurrency } from "@/utils/currencyFormatter/currencyFormatter";
import { ProductBarChart } from "@/components/productBarChart ";
import { Error } from "@/components/error";
import { Loading } from "@/components/loading";
import { translatePeriod } from "@/utils/translatePeriod/transformData";

export const Dashboard = () => {
  const { selectFilterOption } = useDashboardFilterStore();

  const periodMap: Record<string, "WEEKLY" | "MONTHLY" | "YEARLY"> = {
    WEEKLY: "WEEKLY",
    MONTHLY: "MONTHLY",
    YEARLY: "YEARLY",
  };

  const period = periodMap[selectFilterOption] ?? "MONTHLY";

  const { data: products, isLoading, isError } = useProductsByPeriod(period);

  const [productData, setProductData] = useState<ProductChart[]>([]);

  const transformChartData = (apiData: Product[]) => {
    const formatData = apiData.map((item) => ({
      name: item.name,
      profit: item.profit,
      sales: item.sales,
      period: item.period,
    }));

    setProductData(formatData);
  };

  useEffect(() => {
    transformChartData(products ?? []);
  }, [products]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  const tableColumns = ["Produtos", "Lucros", "Vendas", "Período"];

  const transformData = (apiData: Product[]) => {
    return apiData.map((item) => ({
      name: item.name,
      profit: formatCurrency(item.profit),
      sales: item.sales,
      period: translatePeriod(item.period),
    }));
  };

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl text-black font-bold">Dashboard de Produtos</h1>

      {productData.length > 0 && (
        <>
          <h2 className="text-lg text-black font-bold">
            Produtos por maior lucro
          </h2>
          <section
            className="border border-primary-200 pr-12 rounded-lg"
            aria-label="Barra de Lucro por produto"
          >
            <ProductBarChart products={products ?? []} />
          </section>
        </>
      )}

      <DashboardFilter>
        {productData.length > 0 ? (
          <Table columns={tableColumns} data={transformData(products ?? [])} />
        ) : (
          <p className="text-center text-black py-4">Nenhum dado disponível</p>
        )}
      </DashboardFilter>
    </section>
  );
};
