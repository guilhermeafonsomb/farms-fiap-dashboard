import { Query } from "appwrite";
import type { Product } from "@/model/products";
import { tablesDB } from "@/lib/appwrite";

export const fetchProductsByPeriod = async (
  period: "WEEKLY" | "MONTHLY" | "YEARLY",
): Promise<Product[]> => {
  try {
    const response = await tablesDB.listRows({
      databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
      tableId: import.meta.env.VITE_APPWRITE_TABLE_ID,
      queries: [Query.equal("period", period)],
    });

    return response.rows as unknown as Product[];
  } catch (error) {
    console.error("Erro ao buscar produtos por período:", error);

    return [];
  }
};
