"use client"

import { ColumnDef} from "@tanstack/react-table";
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

 export type Shipment = {
    id: string;
    tracking: number;
    status: string;
    client: string;
    date: string;
  };
  

  export const columns: ColumnDef<Shipment>[] = [
    {
      accessorKey: "client",
      header: "Client",
    },
    {
      accessorKey: "tracking",
      header: "Tracking",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {

        return <Status status={row.getValue("status")} />
      },
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const payment = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copy shipment info
                </DropdownMenuItem>
                <DropdownMenuItem>See shipment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
  ];