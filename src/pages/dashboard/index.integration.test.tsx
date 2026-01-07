import { render, screen, fireEvent, waitFor } from "@/test/test-utils";
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
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText("Produto Mensal - 1000")).toBeInTheDocument();
    });

    const weeklyButton = screen.getByText("Semanal");
    fireEvent.click(weeklyButton);

    await waitFor(() => {
      expect(screen.getByText("Produto Semanal - 500")).toBeInTheDocument();
    });

    expect(screen.queryByText("Produto Mensal - 1000")).not.toBeInTheDocument();
  });
});
