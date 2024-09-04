'use client'

import { ColumnDef } from "@tanstack/react-table"
import Status from "~/app/ui/export/status";
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

import { useState, useEffect, ChangeEvent } from "react";

import { deleteShipment, updateShipment } from "~/server/db/actions";

export type shipment = {
    id: number
    date: Date 
    carrier: "DHL" | "UPS"| "FedEx"| "FedEx Freight"| "Estafeta"
    tracking: string
    service: "Standard Overnight"| "Second Business Day"| "Ground"| "Priority Overnight"| "Next Day Delivery"| "International"
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
    shippingDate: Date | null
    recievedDate: Date | null
    expectedDate: Date | null
    recievedBy: string
    bol: string
    status: "sent"| "pending"| "processing"| "delivered" | "failed"
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
      <select onChange={onSelectChange} value={initialValue ?? ""}>
        {columnMeta?.options?.map((option: Option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    ) : (
      <input
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  };
  
  const handleDetails = (row : any, column : any, table : any) => {
    
  };

  

export const columns: ColumnDef<shipment>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({row}) => {
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
    {
        id: "actions",
        cell: ({ row, column, table }) => {
          const shipment = row.original
     
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
            <DropdownMenuItem onClick={() => handleDetails(row, column, table)}>
              See Details
            </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },

]