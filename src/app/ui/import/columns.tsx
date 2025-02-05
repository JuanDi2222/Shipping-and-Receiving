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
        accessorKey: "carrier",
        header: "Carrier",
    },

    {
        accessorKey: "tracking",
        header: "Tracking",
    },
    {
        accessorKey: "country",
        header: "Country",
        
    },
    {
        accessorKey: "description",
        header: "Description",
        
    },
    {
        accessorKey: "bulks",
        header: "Bulks",
        
    },
    {
        accessorKey: "supplier",
        header: "Supplier",
        
    }, 
]