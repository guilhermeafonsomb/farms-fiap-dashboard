import { render } from "@/test/test-utils";
import { Dashboard } from ".";
import { useProductsByPeriod } from "@/hooks/useProductsByPeriod";
import { useDashboardFilterStore } from "@/store/dashboard";
import { vi, type Mock } from "vitest";

vi.mock("@/hooks/useProductsByPeriod");
vi.mock("@/store/dashboard");
vi.mock("@/components/productBarChart ", () => ({
  ProductBarChart: () => <div data-testid="mock-chart">Mock Chart</div>,
}));

vi.mock("@/components/table", () => ({
  Table: ({ data }: { data: { products: string }[] }) => (
    <div data-testid="mock-table">
      {data.map((d, i) => (
        <div key={i}>{d.products}</div>
      ))}
    </div>
  ),
}));

describe("Dashboard tests", () => {
  const mockProducts = [
    {
      nome: "Produto A",
      lucro: 100,
      vendas: 10,
      periodo: "Mensal",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    (useDashboardFilterStore as unknown as Mock).mockReturnValue({
      selectFilterOption: "MONTHLY",
    });
  });

  it("should render loading state", () => {
    (useProductsByPeriod as Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      isError: false,
    });

    const { getByText } = render(<Dashboard />);
    expect(getByText("Carregando dados do dashboard...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useProductsByPeriod as Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
      isError: true,
    });

    const { getByText } = render(<Dashboard />);
    expect(getByText("Erro ao carregar dados")).toBeInTheDocument();
    expect(
      getByText(/Ocorreu um erro ao buscar os dados do dashboard/i)
    ).toBeInTheDocument();
  });

  it("should render dashboard with data", () => {
    (useProductsByPeriod as Mock).mockReturnValue({
      isLoading: false,
      data: mockProducts,
      isError: false,
    });

    const { getByText, getByTestId } = render(<Dashboard />);

    expect(getByText("Dashboard de Produtos")).toBeInTheDocument();
    expect(getByTestId("mock-chart")).toBeInTheDocument();
    expect(getByTestId("mock-table")).toBeInTheDocument();
  });
});
