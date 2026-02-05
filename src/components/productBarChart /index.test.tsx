import { render } from "@/test/test-utils";
import { ProductBarChart } from ".";
import { vi } from "vitest";

vi.mock("recharts", () => {
  const OriginalRecharts = vi.importActual("recharts");
  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    BarChart: ({
      data,
      children,
    }: {
      data: any[];
      children: React.ReactNode;
    }) => (
      <div data-testid="bar-chart" data-chart-data={JSON.stringify(data)}>
        {children}
      </div>
    ),
    Bar: ({ dataKey }: { dataKey: string }) => (
      <div data-testid="bar" data-data-key={dataKey} />
    ),
  };
});

vi.mock("@/components/ui/chart", () => ({
  ChartContainer: ({
    children,
    config,
  }: {
    children: React.ReactNode;
    config: any;
  }) => (
    <div data-testid="chart-container" data-config={JSON.stringify(config)}>
      {children}
    </div>
  ),
}));

describe("ProductBarChart tests", () => {
  const mockProducts = [
    {
      name: "Produto A",
      profit: 100,
      sales: 10,
      period: "MONTHLY" as const,
    },
    {
      name: "Produto B",
      profit: 200,
      sales: 20,
      period: "MONTHLY" as const,
    },
  ];

  test("should render the component and pass correct data to chart", () => {
    const { getByTestId } = render(<ProductBarChart products={mockProducts} />);

    expect(getByTestId("chart-container")).toBeInTheDocument();
    expect(getByTestId("bar-chart")).toBeInTheDocument();

    const chart = getByTestId("bar-chart");
    const passedData = JSON.parse(
      chart.getAttribute("data-chart-data") || "[]",
    );

    expect(passedData).toHaveLength(2);
    expect(passedData[0]).toEqual(
      expect.objectContaining({
        name: "Produto A",
        profit: 100,
      }),
    );
    expect(passedData[1]).toEqual(
      expect.objectContaining({
        name: "Produto B",
        profit: 200,
      }),
    );
  });

  test("should render Bar with correct props", () => {
    const { getByTestId } = render(<ProductBarChart products={mockProducts} />);

    const bar = getByTestId("bar");
    expect(bar).toHaveAttribute("data-data-key", "profit");
  });

  test("should handle empty data", () => {
    const { getByTestId } = render(<ProductBarChart products={[]} />);

    const chart = getByTestId("bar-chart");
    const passedData = JSON.parse(
      chart.getAttribute("data-chart-data") || "[]",
    );

    expect(passedData).toEqual([]);
  });

  test("should configure chart config correctly", () => {
    const { getByTestId } = render(<ProductBarChart products={mockProducts} />);

    const container = getByTestId("chart-container");
    const config = JSON.parse(container.getAttribute("data-config") || "{}");

    expect(config["Produto A"]).toBeDefined();
    expect(config["Produto A"].label).toBe("Produto A");
    expect(config["Produto A"].color).toBe("#EBF2E8");
  });
});
