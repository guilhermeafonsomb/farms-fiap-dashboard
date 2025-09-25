import { DashboardFilter } from "../../components/dashboardFilter";

export const Dashboard = () => {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl text-black font-bold">Dashboard de Produtos</h1>

      <h2 className="text-lg text-black font-bold">Produtos por maior lucro</h2>

      <DashboardFilter />
    </section>
  );
};
