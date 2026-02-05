export type Product = {
  name: string;
  profit: number;
  sales: number;
  period: "WEEKLY" | "MONTHLY" | "YEARLY";
};

export type ProductChart = {
  name: string;
  profit: number;
  sales: number;
  period: "WEEKLY" | "MONTHLY" | "YEARLY";
};

export type ProductTable = {
  name: string;
  profit: string;
  sales: number;
  period: string;
};
