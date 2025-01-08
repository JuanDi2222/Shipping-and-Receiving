'use client'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useState, useEffect, ChangeEvent } from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils"
import { Checkbox } from "~/components/ui/checkbox"

export type shipment = {
  id: number
  date: Date
  carrier: "DHL" | "UPS" | "FedEx" | "FedEx Freight" | "Estafeta" 
  tracking: string
  service: "Standard Overnight" | "Second Business Day" | "Ground" | "Priority Overnight" | "Next Day Delivery" | "International" 
  account: string
  company: string
  address: string
  area: string
  city: string
  state: string
  zip: string
  country: string
  recipient: string
  phone: string
  email: string
  description: string
  project: string
  goods: any
  quantity: number
  pieces: number
  cost: number
  debit: number
  requestor: string
  noticeId: number | null
  shippingDate: string | null
  recievedDate: string | null
  expectedDate: string | null
  recievedBy: string
  bol: string
  status: "sent" | "pending" | "processing" | "delivered" | "failed" | "transit"
  shippingCost: number
}

interface TableCellProps {
  getValue: () => any;
  row: any;
  column: any;
  table: any;
}

type Option = {
  label: string;
  value: string;
};

const TableCell: React.FC<TableCellProps> = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  return columnMeta?.type === "select" ? (
    <select
    className={cn(
      "flex h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    )}
     onChange={onSelectChange} value={initialValue ?? ""}>
      {columnMeta?.options?.map((option: Option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  ) : (
    <Input className="w-40"
      value={value ?? ""}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      type={columnMeta?.type || "text"}
    />
  );
};


export const columns: ColumnDef<shipment>[] = [
  
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return row.original.date.toLocaleDateString()
    }
  },
  {
    accessorKey: "carrier",
    header: "Carrier",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "DHL", label: "DHL" },
        { value: "UPS", label: "UPS" },
        { value: "FedEx", label: "FedEx" },
        { value: "Estafeta", label: "Estafeta" },
        { value: "FedEx Freight", label: "FedEx Freight" },
      ],
    }
  },

  {
    accessorKey: "tracking",
    header: "Tracking",
    cell: TableCell,
  },
  {
    accessorKey: "shippingCost",
    header: "Shipping Cost",
    cell: TableCell,
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Standard Overnight", label: "Standard Overnight" },
        { value: "Second Business Day", label: "Second Business Day" },
        { value: "Priority Overnight", label: "Priority Overnight" },
        { value: "Next Day Delivery", label: "Next Day Delivery" },
        { value: "International", label: "International" },
      ],
    }
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: TableCell,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: TableCell,
  },
  {
    accessorKey: "debit",
    header: "Debit",
    cell: TableCell,
  },
  {
    accessorKey: "requestor",
    header: "Requestor",
  },
  {
    accessorKey: "noticeId",
    header: "Notice ID",
    cell: TableCell,
  },
  {
    accessorKey: "bol",
    header: "BOL",
    cell: TableCell,
  },
]