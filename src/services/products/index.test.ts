import { APPWRITE_ENDPOINT } from "@/lib/mocks/handlers";
import { fetchProductsByPeriod } from ".";

describe("Products service tests", () => {
  it("should fetch products by period", async () => {
    const products = await fetchProductsByPeriod("WEEKLY");

    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Produto Semanal");
  });

  it("should return empty array when fetching products fails", async () => {
    const { server } = await import("@/lib/mocks/server");
    const { http, HttpResponse } = await import("msw");

    server.use(
      http.get(`${APPWRITE_ENDPOINT}/tablesdb/*/tables/*/rows`, () => {
        return HttpResponse.json(
          { message: "Internal Server Error" },
          { status: 500 },
        );
      }),
    );

    const products = await fetchProductsByPeriod("WEEKLY");

    expect(products).toEqual([]);
  });
});
