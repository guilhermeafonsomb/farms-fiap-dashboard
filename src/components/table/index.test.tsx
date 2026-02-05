import { render } from "@/test/test-utils";
import { TableComponent as Table } from ".";
import type { ProductTable } from "@/model/products";

const tableColumnsMock = ["Produtos", "Lucro", "Vendas", "Período"];

const productsMock: ProductTable[] = [
  {
    name: "Banana",
    profit: "R$ 60,95",
    sales: 7,
    period: "Anual",
  },
];

describe("Table tests", () => {
  test("should render the table", () => {
    const { getByText } = render(
      <Table data={productsMock} columns={tableColumnsMock} />,
    );

    expect(getByText("Produtos")).toBeInTheDocument();
    expect(getByText("Lucro")).toBeInTheDocument();
    expect(getByText("Vendas")).toBeInTheDocument();
    expect(getByText("Período")).toBeInTheDocument();
  });

  test("should render the table with data", () => {
    const { getByText } = render(
      <Table data={productsMock} columns={tableColumnsMock} />,
    );

    expect(getByText("Banana")).toBeInTheDocument();
    expect(getByText("R$ 60,95")).toBeInTheDocument();
    expect(getByText(7)).toBeInTheDocument();
    expect(getByText("Anual")).toBeInTheDocument();
  });
});
