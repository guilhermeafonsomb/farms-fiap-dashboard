import { render } from "@/test/test-utils";
import { ProductBarChart } from ".";
import { vi } from "vitest";

vi.mock("react-chartjs-2", () => ({
  Bar: vi.fn(({ data, options }) => (
    <div
      data-testid="mock-bar-chart"
      data-chart-data={JSON.stringify(data)}
      data-chart-options={JSON.stringify(options)}
    >
      Mock Bar Chart
    </div>
  )),
}));

vi.mock("chart.js", () => ({
  Chart: { register: vi.fn() },
  CategoryScale: vi.fn(),
  LinearScale: vi.fn(),
  BarElement: vi.fn(),
  Title: vi.fn(),
  Tooltip: vi.fn(),
  Legend: vi.fn(),
}));

describe("ProductBarChart tests", () => {
  const mockData = [
    {
      nome: "Produto A",
      lucro: 100,
      vendas: 10,
      periodo: "Mensal" as const,
    },
    {
      nome: "Produto B",
      lucro: 200,
      vendas: 20,
      periodo: "Mensal" as const,
    },
  ];

  test("should render the component and pass correct data to chart", () => {
    const { getByTestId } = render(<ProductBarChart data={mockData} />);

    expect(getByTestId("mock-bar-chart")).toBeInTheDocument();

    const chart = getByTestId("mock-bar-chart");
    const passedData = JSON.parse(
      chart.getAttribute("data-chart-data") || "{}"
    );

    expect(passedData.labels).toEqual(["Produto A", "Produto B"]);
    expect(passedData.datasets[0].data).toEqual([100, 200]);
  });

  test("should handle empty data", () => {
    const { getByTestId } = render(<ProductBarChart data={[]} />);

    const chart = getByTestId("mock-bar-chart");
    const passedData = JSON.parse(
      chart.getAttribute("data-chart-data") || "{}"
    );

    expect(passedData.labels).toEqual([]);
    expect(passedData.datasets[0].data).toEqual([]);
  });

  test("should set categoryPercentage to 0.4 when data length <= 3", () => {
    const smallData = [mockData[0]];
    const { getByTestId } = render(<ProductBarChart data={smallData} />);

    const chart = getByTestId("mock-bar-chart");
    const passedData = JSON.parse(
      chart.getAttribute("data-chart-data") || "{}"
    );

    expect(passedData.datasets[0].categoryPercentage).toBe(0.4);
  });

  test("should set categoryPercentage to 0.8 when data length > 3", () => {
    const largeData = [mockData[0], mockData[0], mockData[0], mockData[0]];
    const { getByTestId } = render(<ProductBarChart data={largeData} />);

    const chart = getByTestId("mock-bar-chart");
    const passedData = JSON.parse(
      chart.getAttribute("data-chart-data") || "{}"
    );

    expect(passedData.datasets[0].categoryPercentage).toBe(0.8);
  });
});
