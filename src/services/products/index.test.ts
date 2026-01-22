import { fetchProductsByPeriod } from ".";

describe("Products service tests", () => {
  it("should fetch products by period", async () => {
    const products = await fetchProductsByPeriod("WEEKLY");

    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Produto Semanal");
  });
});
