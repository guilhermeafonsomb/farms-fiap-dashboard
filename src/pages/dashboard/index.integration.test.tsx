import { render, waitFor } from "@/test/test-utils";
import { Dashboard } from ".";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("@/components/productBarChart ", () => ({
  ProductBarChart: ({ products }: { products: any[] }) => (
    <div data-testid="chart-container">
      {products.map((d) => (
        <div key={d.name} data-testid="chart-item">
          {d.name} - {d.profit}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("@/components/table", () => ({
  TableComponent: ({ data }: { data: any[] }) => (
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
    const user = userEvent.setup();
    const { getByText, queryByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getByText("Produto Mensal - 1000")).toBeInTheDocument();
    });

    const weeklyButton = getByText("Semanal");
    await user.click(weeklyButton);

    await waitFor(() => {
      expect(getByText("Produto Semanal - 500")).toBeInTheDocument();
    });

    expect(queryByText("Produto Mensal - 1000")).not.toBeInTheDocument();
  });
});
