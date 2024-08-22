"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { useState, useEffect } from "react";
import {
  deleteShipmentNotice,
  updateShipmentNotice,
} from "~/server/db/actions";

import { ColumnDef } from "@tanstack/react-table"

export type ShipmentNotice = {
  id: number;
  date: Date;
  epdc: boolean  | null;
  etdc: boolean  | null;
  drchih: boolean  | null;
  dhl: boolean   | null;
  fedex: boolean  | null;
  panalpina: boolean  | null;
  ups: boolean  | null;
  ctransport: boolean  | null;
  fedexground: boolean  | null;
  other: string  | null;
  line: string  | null;
  plates: string  | null;
  seal: number  | null;
  manifest: string  | null;
  bulks: number  | null;
  description: string  | null;
  operator: string  | null;
  creator: string  | null;
  pedimentCode: string  | null;
  entry: number  | null;
  bulksfedex: number  | null;
  bulksfdxfreight: number  | null;
  bulksfdxground: number  | null;
  bulksdhl: number  | null;
  bulksups: number  | null;
  etdcdock: string  | null;
  epdcdock: string  | null;
  otherdock: string  | null;
  bulksetdc: string  | null;
  bulksepdc: string  | null;
  bulksOther: string  | null;
};

interface TableCellProps {
  getValue: () => any;
  row: any;
  column: any;
  table: any;
}

const TableCell: React.FC<TableCellProps> = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};

function handleDelete (id: number) {
  deleteShipmentNotice(id);
  window.location.reload();
};

const handleUpdate = (row : any, column : any, table : any) => {
  updateShipmentNotice(table.options.data[row.index]);
};

async function printPDF(id: number){
  window.open("/dashboard/admin/print/" + id);
};

export const columns: ColumnDef<ShipmentNotice>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "epdc",
    header: "EPDC",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "etdc",
    header: "ETDC",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "drchih",
    header: "DRCHIH",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "dhl",
    header: "DHL",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "fedex",
    header: "FEDEX",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "panalpina",
    header: "PANALPINA",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "ups",
    header: "UPS",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "ctransport",
    header: "CTRANSPORT",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "fedexground",
    header: "FEDEX GROUND",
    cell: TableCell,
    meta: {
      type: "checkbox",
    },
  },
  {
    accessorKey: "other",
    header: "OTHER",
    cell: TableCell,
  },
  {
    accessorKey: "line",
    header: "LINE",
    cell: TableCell,
  },
  {
    accessorKey: "plates",
    header: "PLATES",
    cell: TableCell,
  },
  {
    accessorKey: "seal",
    header: "SEAL",
    cell: TableCell,
  },
  {
    accessorKey: "manifest",
    header: "MANIFEST",
    cell: TableCell,
  },
  {
    accessorKey: "bulks",
    header: "BULKS",
    cell: TableCell,
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
    cell: TableCell,
  },
  {
    accessorKey: "operator",
    header: "OPERATOR",
    cell: TableCell,
  },
  {
    accessorKey: "creator",
    header: "CREATOR",
    cell: TableCell,
  },
  {
    accessorKey: "pediment",
    header: "PEDIMENT",
    cell: TableCell,
  },
  {
    accessorKey: "pedimentCode",
    header: "PEDIMENT CODE",
    cell: TableCell,
  },
  {
    accessorKey: "entry",
    header: "ENTRY",
    cell: TableCell,
  },
  {
    accessorKey: "bulksfedex",
    header: "BULKS FEDEX",
    cell: TableCell,
  },
  {
    accessorKey: "bulksfdxfreight",
    header: "BULKS FEDEX FREIGHT",
    cell: TableCell,
  },
  {
    accessorKey: "bulksfdxground",
    header: "BULKS FEDEX GROUND",
    cell: TableCell,
  },
  {
    accessorKey: "bulksdhl",
    header: "BULKS DHL",
    cell: TableCell,
  },
  {
    accessorKey: "bulksups",
    header: "BULKS UPS",
    cell: TableCell,
  },
  {
    accessorKey: "etdcdock",
    header: "ETDC DOCK",
    cell: TableCell,
  },
  {
    accessorKey: "epdcdock",
    header: "EPDC DOCK",
    cell: TableCell,
  },
  {
    accessorKey: "otherdock",
    header: "OTHER DOCK",
    cell: TableCell,
  },
  {
    accessorKey: "bulksetdc",
    header: "BULKS ETDC",
    cell: TableCell,
  },
  {
    accessorKey: "bulksepdc",
    header: "BULKS EPDC",
    cell: TableCell,
  },
  {
    accessorKey: "bulksOther",
    header: "BULKS OTHER",
    cell: TableCell,
  },
  {
    id: "actions",
    cell: ({ row, column, table }) => {
      const ShipmentNotice = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleDelete(ShipmentNotice.id)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(row, column, table)}>
              Update
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => printPDF(ShipmentNotice.id)}>Print ShipmentNotice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
