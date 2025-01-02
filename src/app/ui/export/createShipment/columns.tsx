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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"


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


export const columns: ColumnDef<shipment>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "company",
    header: "Client",
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
  },
  {
    accessorKey: "tracking",
    header: "Tracking Number",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <Status status={row.original.status} />
    }
  }, {
    id: "actions",
    cell: ({ row }) => {
      const shipment = row.original

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button>See Summary</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle><h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Shipment Summary</h2></DialogTitle>
              <div className="grid gap-4 lg:grid-cols-3">
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Creation Date: {shipment.date.toLocaleDateString()}</h3> </DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Carrier: {shipment.carrier}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Tracking Number: {shipment.tracking}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Status: {shipment.status}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Company: {shipment.company}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Address: {shipment.address}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Area: {shipment.area}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">City: {shipment.city}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">State: {shipment.state}</h3></DialogDescription>              
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Zip: {shipment.zip}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Country: {shipment.country}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Recipient: {shipment.recipient}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Phone: {shipment.phone}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Email: {shipment.email}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Description: {shipment.description}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Project: {shipment.project}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Number of Boxes: {shipment.quantity}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Pieces: {shipment.pieces}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Cost:  $ {shipment.cost}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Debit: {shipment.debit}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Shipping Date: {shipment.shippingDate}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Recieved Date: {shipment.recievedDate}</h3></DialogDescription>
                <DialogDescription><h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Expected Date: {shipment.expectedDate}</h3></DialogDescription>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )
    },
  },
]

