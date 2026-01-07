import { fetchProductsByPeriod } from ".";
import { tablesDB } from "@/lib/appwrite";
import { type Mock } from "vitest";

describe("Products service tests", () => {
  it("should fetch products by period", async () => {
    (tablesDB.listRows as Mock).mockResolvedValue({
      rows: [
        {
          nome: "Banana",
          lucro: 100,
          vendas: 10,
          periodo: "Semanal",
        },
      ],
    });

    const products = await fetchProductsByPeriod("Semanal");

    expect(products).toHaveLength(1);
    expect(products[0].nome).toBe("Banana");
  });
});
