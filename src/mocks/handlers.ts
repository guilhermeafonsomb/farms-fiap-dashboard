import { http, HttpResponse } from "msw";

export const handlers = [
  // Matches any endpoint ending with /rows and containing tablesdb/ and tables/
  http.get("**/tablesdb/*/tables/*/rows", ({ request }) => {
    const url = new URL(request.url);

    // Check all query parameters for the period value
    const urlString = url.toString();
    const isWeekly = urlString.includes("Semanal");

    if (isWeekly) {
      return HttpResponse.json({
        total: 1,
        rows: [
          {
            nome: "Produto Semanal",
            lucro: 500,
            vendas: 50,
            periodo: "Semanal",
            $id: "1",
          },
        ],
      });
    }

    return HttpResponse.json({
      total: 1,
      rows: [
        {
          nome: "Produto Mensal",
          lucro: 1000,
          vendas: 100,
          periodo: "Mensal",
          $id: "2",
        },
      ],
    });
  }),
];
