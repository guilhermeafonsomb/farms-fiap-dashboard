import { render } from "@/test/test-utils";
import { Table } from ".";

const tableColumnsMock = [
  { accessorKey: "name", header: "Produtos" },
  { accessorKey: "profit", header: "Lucro" },
  { accessorKey: "sales", header: "Vendas" },
  { accessorKey: "period", header: "Período" },
];

const productsMock = [
  {
    name: "Banana",
    profit: 60.95,
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
    expect(getByText("60.95")).toBeInTheDocument();
    expect(getByText("7")).toBeInTheDocument();
    expect(getByText("Anual")).toBeInTheDocument();
  });
});
