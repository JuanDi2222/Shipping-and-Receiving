'use client'

import type { ColumnDef } from "@tanstack/react-table"
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
import { deleteImport, updateImport } from "~/server/db/actions";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils"

export type port = {
    id: number
    date: Date
    job: number | null
    carrier: string | null
    tracking: string | null
    supplier: string | null
    bulks: string | null
    description: string | null
    country: string | null
    requestor: string | null
    recievedDate: string | null
    requestorId: string | null
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
  
  function handleDelete (id: number) {
    deleteImport(id);
    window.location.reload();
  };
  
  const handleUpdate = (row : any, column : any, table : any) => {
    updateImport(table.options.data[row.index]);
  };

export const columns: ColumnDef<port>[] = [
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
    },

    {
        accessorKey: "tracking",
        header: "Tracking",
        cell: TableCell,
    },
    {
        accessorKey: "country",
        header: "Country",
        cell: TableCell,
    },
    { 
        accessorKey: "requestor",
        header: "Requestor",
    }, 
    {
        accessorKey: "description",
        header: "Description",
        cell: TableCell,
    },
    {
        accessorKey: "bulks",
        header: "Bulks",
        cell: TableCell,
    },
    {
        accessorKey: "recievedDate",
        header: "Recieved Date",
        cell: TableCell,
    },
    {
        accessorKey: "supplier",
        header: "Supplier",
        cell: TableCell,
    }, {
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
            <DropdownMenuItem onClick={() => handleDelete(shipment.id)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(row, column, table)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />

              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]