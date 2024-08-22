"use client"

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
import { Input } from "~/components/ui/input"
import { useState, useEffect } from "react"
import { updateAllUsers } from "~/server/db/actions"
import { ColumnDef } from "@tanstack/react-table"

export type User = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
    phone: number | null
    department: number | null
}

interface TableCellProps {
  getValue: () => any;
  row: any;
  column: any;
  table: any;
}

const TableCell: React.FC<TableCellProps> = ({ getValue, row, column, table }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    const onBlur = () => {
      table.options.meta?.updateData(row.index, column.id, value)
    }
  
    return (<input value={value}  onChange={(e) => setValue(e.target.value)} onBlur={onBlur} />);
  }

  const handleUpdate = (row: any, table: any) => {
    updateAllUsers(table.options.data[row.index])
  }

export const columns: ColumnDef<User>[] = [
      {
        accessorKey: 'id',
        header: 'ID',

      },
      {
        accessorKey: 'name',
        header: "Name",
        
      },
      {
        accessorKey: 'email',
        header: "Email",
        
      },
      {
        accessorKey: 'phone',
        header: "Phone",
        cell: TableCell,
      },
      {
        accessorKey: 'department',
        header: "Department",
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
                <DropdownMenuItem onClick={() => handleUpdate(row, table)}>
                  Update
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
]