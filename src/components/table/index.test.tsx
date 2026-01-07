import type { Product } from "@/model/products";
import { render } from "@/test/test-utils";
import { Table } from ".";

const tableColumnsMock = [
  { accessorKey: "nome", header: "Produtos" },
  { accessorKey: "lucro", header: "Lucro" },
  { accessorKey: "vendas", header: "Vendas" },
  { accessorKey: "periodo", header: "Período" },
];

const productsMock: Product[] = [
  {
    nome: "Banana",
    lucro: 60.95,
    vendas: 7,
    periodo: "Anual",
  },
];

describe("Table tests", () => {
  test("should render the table", () => {
    const { getByText } = render(
      <Table data={productsMock} columns={tableColumnsMock} />
    );

    expect(getByText("Produtos")).toBeInTheDocument();
    expect(getByText("Lucro")).toBeInTheDocument();
    expect(getByText("Vendas")).toBeInTheDocument();
    expect(getByText("Período")).toBeInTheDocument();
  });

  test("should render the table with data", () => {
    const { getByText } = render(
      <Table data={productsMock} columns={tableColumnsMock} />
    );

    expect(getByText("Banana")).toBeInTheDocument();
    expect(getByText("60.95")).toBeInTheDocument();
    expect(getByText("7")).toBeInTheDocument();
    expect(getByText("Anual")).toBeInTheDocument();
  });
});
