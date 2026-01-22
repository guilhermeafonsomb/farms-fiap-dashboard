type Product = {
  name: string;
  profit: number;
  sales: number;
  period: "WEEKLY" | "MONTHLY" | "YEARLY";
  $id?: string;
};

export const mockProductsWeekly: Product[] = [
  {
    name: "Produto Semanal A",
    profit: 500,
    sales: 50,
    period: "WEEKLY",
    $id: "1",
  },
  {
    name: "Produto Semanal B",
    profit: 300,
    sales: 30,
    period: "WEEKLY",
    $id: "2",
  },
];

export const mockProductsMonthly: Product[] = [
  {
    name: "Produto Mensal A",
    profit: 1000,
    sales: 100,
    period: "MONTHLY",
    $id: "3",
  },
  {
    name: "Produto Mensal B",
    profit: 800,
    sales: 80,
    period: "MONTHLY",
    $id: "4",
  },
];

export const mockProductsYearly: Product[] = [
  {
    name: "Produto Anual A",
    profit: 12000,
    sales: 1200,
    period: "YEARLY",
    $id: "5",
  },
  {
    name: "Produto Anual B",
    profit: 10000,
    sales: 1000,
    period: "YEARLY",
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
