import { http, HttpResponse } from "msw";

export const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

export const handlers = [
  http.get(`${APPWRITE_ENDPOINT}/tablesdb/*/tables/*/rows`, ({ request }) => {
    const url = new URL(request.url);

    const urlString = url.toString();
    const isWeekly = urlString.includes("WEEKLY");

    if (isWeekly) {
      return HttpResponse.json({
        total: 1,
        rows: [
          {
            name: "Produto Semanal",
            profit: 500,
            sales: 50,
            period: "WEEKLY",
            $id: "1",
          },
        ],
      });
    }

    return HttpResponse.json({
      total: 1,
      rows: [
        {
          name: "Produto Mensal",
          profit: 1000,
          sales: 100,
          period: "MONTHLY",
          $id: "2",
        },
      ],
    });
  }),
];
