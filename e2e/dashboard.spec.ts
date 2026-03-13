import { test, expect, type Page, type Route } from "@playwright/test";
import { mockApiResponse } from "./fixtures/mockData";

async function mockApiRoute(page: Page) {
  await page.route("**/tablesdb/*/tables/*/rows*", async (route: Route) => {
    const url = route.request().url();
    const normalizedUrl = decodeURIComponent(url);

    if (normalizedUrl.includes("WEEKLY")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApiResponse.weekly),
      });
    } else if (normalizedUrl.includes("YEARLY")) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApiResponse.yearly),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockApiResponse.monthly),
      });
    }
  });
}

test.describe("Dashboard E2E Tests", () => {
  test.describe("Initial loading", () => {
    test("should load the dashboard with monthly data by default", async ({
      page,
    }) => {
      await mockApiRoute(page);
      await page.goto("/");

      await expect(
        page.getByRole("heading", { name: "Dashboard de Produtos" }),
      ).toBeVisible();

      await expect(
        page.getByRole("heading", { name: "Produtos por maior lucro" }),
      ).toBeVisible();
      await expect(
        page.getByRole("heading", { name: "Produtos por maior lucro" }),
      ).toBeVisible();

      const monthlyButton = page.getByTestId("monthly-button");
      await expect(monthlyButton).toBeVisible();

      await page.waitForTimeout(1000);

      await expect(page.getByText("Produto Mensal A")).toBeVisible();
      await expect(page.getByText("Produto Mensal A")).toBeVisible();
      await expect(page.getByText("R$ 1.000,00")).toBeVisible();
    });

    test("should display loading state initially", async ({ page }) => {
      await page.route("**/tablesdb/*/tables/*/rows*", async (route: Route) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockApiResponse.monthly),
        });
      });

      await page.goto("/");

      await expect(
        page.getByText("Carregando dados do dashboard..."),
      ).toBeVisible();

      await expect(
        page.getByText("Carregando dados do dashboard..."),
      ).not.toBeVisible({
        timeout: 5000,
      });
      await expect(page.getByText("Produto Mensal A")).toBeVisible();
    });
  });

  test.describe("Period filters", () => {
    test("should filter products by weekly period", async ({ page }) => {
      await mockApiRoute(page);
      await page.goto("/");

      await page.waitForTimeout(1000);

      const weeklyButton = page.getByTestId("weekly-button");
      await weeklyButton.click();

      await page.waitForTimeout(1000);

      await expect(page.getByText("Produto Semanal A")).toBeVisible();
      await expect(page.getByText("R$ 500,00")).toBeVisible();
    });

    test("should filter products by monthly period", async ({ page }) => {
      await mockApiRoute(page);
      await page.goto("/");

      await page.waitForTimeout(1000);

      const monthlyButton = page.getByTestId("monthly-button");
      await monthlyButton.click();
      await page.waitForTimeout(1000);

      await expect(page.getByText("Produto Mensal A")).toBeVisible();
      await expect(page.getByText("R$ 1.000,00")).toBeVisible();
    });

    test("should filter products by yearly period", async ({ page }) => {
      await mockApiRoute(page);
      await page.goto("/");

      await page.waitForTimeout(1000);

      const yearlyButton = page.getByTestId("yearly-button");
      await yearlyButton.click();

      await page.waitForTimeout(1000);

      await expect(page.getByText("Produto Anual A")).toBeVisible();
      await expect(page.getByText("R$ 12.000,00")).toBeVisible();
    });

    test("should switch between different filters correctly", async ({
      page,
    }) => {
      await mockApiRoute(page);
      await page.goto("/");
      await page.waitForTimeout(1000);

      await expect(page.getByText("Produto Mensal A")).toBeVisible();

      await page.getByTestId("weekly-button").click();
      await page.waitForTimeout(1000);
      await expect(page.getByText("Produto Semanal A")).toBeVisible();

      await page.getByTestId("yearly-button").click();
      await page.waitForTimeout(1000);
      await expect(page.getByText("Produto Anual A")).toBeVisible();
      await page.getByTestId("monthly-button").click();
      await page.waitForTimeout(1000);
      await expect(page.getByText("Produto Mensal A")).toBeVisible();
    });

    test("should visually highlight the active filter", async ({ page }) => {
      await mockApiRoute(page);
      await page.goto("/");
      await page.waitForTimeout(1000);

      const monthlyButton = page.getByTestId("monthly-button");
      await expect(monthlyButton).toHaveAttribute("data-state", "active");
      await expect(monthlyButton).toHaveClass(/font-semibold/);

      await page.getByTestId("weekly-button").click();
      await page.waitForTimeout(500);

      const weeklyButton = page.getByTestId("weekly-button");
      await expect(weeklyButton).toHaveAttribute("data-state", "active");
      await expect(weeklyButton).toHaveClass(/font-semibold/);
    });
  });

  test.describe("Data visualization", () => {
    test("should display data in the table correctly", async ({ page }) => {
      await mockApiRoute(page);
      await page.goto("/");
      await page.waitForTimeout(1000);

      await expect(
        page.getByRole("columnheader", { name: "Produtos" }),
      ).toBeVisible();
      await expect(
        page.getByRole("columnheader", { name: "Lucros" }),
      ).toBeVisible();
      await expect(
        page.getByRole("columnheader", { name: "Vendas" }),
      ).toBeVisible();
      await expect(
        page.getByRole("columnheader", { name: "Período" }),
      ).toBeVisible();

      await expect(page.getByText("Produto Mensal A")).toBeVisible();
      await expect(page.getByText("R$ 1.000,00")).toBeVisible();
      await expect(page.getByText("100")).toBeVisible();
    });

    test("should render the bar chart", async ({ page }) => {
      await mockApiRoute(page);
      await page.goto("/");
      await page.waitForTimeout(1000);

      const chart = page.locator(".recharts-surface");
      await expect(chart).toBeVisible();
    });
  });
});
