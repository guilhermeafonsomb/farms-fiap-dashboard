import { render, fireEvent, waitFor } from "@/test/test-utils";
import { Dashboard } from ".";
import { vi } from "vitest";

vi.mock("@/components/productBarChart ", () => ({
  ProductBarChart: ({ data }: { data: any[] }) => (
    <div data-testid="chart-container">
      {data.map((d) => (
        <div key={d.nome} data-testid="chart-item">
          {d.nome} - {d.lucro}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("@/components/table", () => ({
  Table: ({ data }: { data: any[] }) => (
    <div data-testid="table-container">
      {data.map((d) => (
        <div key={d.products} data-testid="table-item">
          {d.products} - {d.profit}
        </div>
      ))}
    </div>
  ),
}));

describe("Dashboard Integration", () => {
  it("should update data when filter changes", async () => {
    const { getByText, queryByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText("Produto Mensal - 1000")).toBeInTheDocument();
    });

    const weeklyButton = getByText("Semanal");
    fireEvent.click(weeklyButton);

    await waitFor(() => {
      expect(getByText("Produto Semanal - 500")).toBeInTheDocument();
    });

    expect(queryByText("Produto Mensal - 1000")).not.toBeInTheDocument();
  });
});
