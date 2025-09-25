import { Query } from "appwrite";
import { tablesDB } from "../../lib/appwrite";
import type { Product } from "../../model/products";

export const fetchProductsByPeriod = async (
  period: "Semanal" | "Mensal" | "Anual"
): Promise<Product[]> => {
  const response = await tablesDB.listRows<Product>({
    databaseId: "68d021ad002fe84e49fb",
    tableId: "produtos",
    queries: [Query.equal("periodo", period)],
  });
  return response.rows;
};
