export type Product = {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
};

export type ProductChart = {
  nome: string;
  lucro: number;
  vendas: number;
  periodo: "Semanal" | "Mensal" | "Anual";
};
