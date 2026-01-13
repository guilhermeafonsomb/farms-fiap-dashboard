import { fetchProductsByPeriod } from ".";

describe("Products service tests", () => {
  it("should fetch products by period", async () => {
    const products = await fetchProductsByPeriod("Semanal");

    expect(products).toHaveLength(1);
    expect(products[0].nome).toBe("Produto Semanal");
  });
});
