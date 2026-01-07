type Product = {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
  $id?: string;
};

export const mockProductsWeekly: Product[] = [
  {
    nome: "Produto Semanal A",
    lucro: 500,
    vendas: 50,
    periodo: "Semanal",
    $id: "1",
  },
  {
    nome: "Produto Semanal B",
    lucro: 300,
    vendas: 30,
    periodo: "Semanal",
    $id: "2",
  },
];

export const mockProductsMonthly: Product[] = [
  {
    nome: "Produto Mensal A",
    lucro: 1000,
    vendas: 100,
    periodo: "Mensal",
    $id: "3",
  },
  {
    nome: "Produto Mensal B",
    lucro: 800,
    vendas: 80,
    periodo: "Mensal",
    $id: "4",
  },
];

export const mockProductsYearly: Product[] = [
  {
    nome: "Produto Anual A",
    lucro: 12000,
    vendas: 1200,
    periodo: "Anual",
    $id: "5",
  },
  {
    nome: "Produto Anual B",
    lucro: 10000,
    vendas: 1000,
    periodo: "Anual",
    $id: "6",
  },
];

export const mockApiResponse = {
  weekly: {
    total: mockProductsWeekly.length,
    rows: mockProductsWeekly,
  },
  monthly: {
    total: mockProductsMonthly.length,
    rows: mockProductsMonthly,
  },
  yearly: {
    total: mockProductsYearly.length,
    rows: mockProductsYearly,
  },
};
