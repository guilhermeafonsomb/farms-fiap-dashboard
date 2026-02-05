import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { ProductTable } from "@/model/products";

interface TableProps {
  data: ProductTable[];
  columns: string[];
}

export const TableComponent = ({ data, columns }: TableProps) => {
  return (
    <>
      {data.length > 0 ? (
        <Table className="border border-primary-200 rounded-lg">
          <TableCaption className="sr-only">
            Dashboard de dados dos produtos
          </TableCaption>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className="font-bold text-black" key={column}>
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.name}>
                <TableCell className="font-semibold text-black">
                  {item.name}
                </TableCell>
                <TableCell className="font-semibold text-primary-500">
                  {item.profit}
                </TableCell>
                <TableCell className="font-semibold text-primary-500">
                  {item.sales}
                </TableCell>
                <TableCell className="font-semibold text-primary-500">
                  {item.period}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center text-black py-4">Nenhum dado disponível</p>
      )}
    </>
  );
};
