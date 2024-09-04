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

import { useState, useEffect } from "react";

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
        value={value ?? ''}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  };
  
  function handleDelete (id: number) {
    deleteShipment(id);
    window.location.reload();
  };
  
  const handleUpdate = (row : any, column : any, table : any) => {
    updateShipment(table.options.data[row.index]);
  };

export const columns: ColumnDef<shipment>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {  
        accessorKey: "company",
        header: "Client",
        cell: TableCell,
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
        accessorKey: "service",
        header: "Service",
        cell: TableCell,
    },
    {
        accessorKey: "account",
        header: "Account",
        cell: TableCell,
    },
    {
        accessorKey: "address",
        header: "Address",
        cell: TableCell,
    },
    {
        accessorKey: "area",
        header: "Area",
        cell: TableCell,
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "state",
        header: "State",
        cell: TableCell,
    },
    {
        accessorKey: "zip",
        header: "Zip",
        cell: TableCell,
    },
    {
        accessorKey: "country",
        header: "Country",
        cell: TableCell,
    },
    { 
        accessorKey: "recipient",
        header: "Recipient",
        cell: TableCell,
    }, 
    {
        accessorKey: "phone",
        header: "Phone",
        cell: TableCell,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: TableCell,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: TableCell,
    },
    {
        accessorKey: "project",
        header: "Project",
        cell: TableCell,
    },
    {
        accessorKey: "goods",
        header: "Goods",
        cell: TableCell,
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
        cell: TableCell,
    },
    {
        accessorKey: "pieces",
        header: "Pieces",
        cell: TableCell,
    },
    {
        accessorKey: "cost",
        header: "Cost",
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
        cell: TableCell,
    },
    {
        accessorKey: "noticeId",
        header: "Notice ID",
        cell: TableCell,
    },
    {
        accessorKey: "shippingDate",
        header: "Shipping Date",
        cell: ({row}) => {
            return row.original.shippingDate?.toLocaleDateString()
        }
    },
    {
        accessorKey: "recievedDate",
        header: "Recieved Date",
        cell: ({row}) => {
            return row.original.recievedDate?.toLocaleDateString()
        }
    },
    {
        accessorKey: "expectedDate",
        header: "Expected Date",
        cell: ({row}) => {
            return row.original.expectedDate?.toLocaleDateString()
        }
    },
    {
        accessorKey: "recievedBy",
        header: "Recieved By",
        cell: TableCell,
    },
    {
        accessorKey: "bol",
        header: "BOL",
        cell: TableCell,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            return <Status status={row.original.status} />
        }
    },  {
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