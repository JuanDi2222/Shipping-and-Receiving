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


export const columns: ColumnDef<shipment>[] = [
    {  
        accessorKey: "company",
        header: "Client",
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
  },
    {
        accessorKey: "tracking",
        header: "Tracking Number",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {
            return <Status status={row.original.status} />
        }
    },  {
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
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText("Hola")}
                >
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
]

