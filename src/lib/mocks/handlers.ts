import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("**/tablesdb/*/tables/*/rows", ({ request }) => {
    const url = new URL(request.url);

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
