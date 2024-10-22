import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "~/components/ui/dialog"
  import { Button } from "~/components/ui/button"

interface SummaryTableProps {
    id: number;
    items: any;
    cost: number;
    shipment: any;
}

export function Summary({ id, items = [], cost, shipment}: SummaryTableProps) {
    return (<>
        <div className=" grid sm:grid-cols-1 ">
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Customs Summary for {id}
            </h2>
            <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Country of Destination: {shipment.country}
            </h2>
            <Dialog>
          <DialogTrigger asChild>
            <Button className="w-40">See address</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle><h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Address</h2></DialogTitle>
              <div className="grid gap-4 lg:grid-cols-3">
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
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
            <Table className="rounded-md border">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Part Number</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Country of Origin</TableHead>
                        <TableHead >Brand</TableHead>
                        <TableHead >Model</TableHead>
                        <TableHead >Serial</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((items: any) => (
                        <TableRow key={items.partNumber}>
                            <TableCell className="font-medium">{items.partNumber}</TableCell>
                            <TableCell>{items.name}</TableCell>
                            <TableCell>{items.countryOfOrigin}</TableCell>
                            <TableCell>{items.brand}</TableCell>
                            <TableCell>{items.model}</TableCell>
                            <TableCell>{items.serial}</TableCell>
                            <TableCell className="text-right">{items.quantity}</TableCell>
                            <TableCell className="text-right">{items.unitPrice}</TableCell>
                            <TableCell className="text-right">${items.quantity * items.unitPrice}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={8}>Total</TableCell>
                        <TableCell className="text-right">${cost}</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    </>
    )
}