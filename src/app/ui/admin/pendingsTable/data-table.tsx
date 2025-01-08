"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { useState, useEffect } from "react";
import { updateShipment } from "~/server/db/actions";
import { toast } from "sonner"
import * as React from "react"

interface ShipmentData {
  tracking: string;
  status: string;
}

interface DataTableProps<TData extends ShipmentData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PendingsTable<TData extends ShipmentData, TValue>({
  columns,
  data: initialData,
  
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(initialData);

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              } as TData;
            }
            return row;
          }),
        );
      },
    },
  });

  const saveChanges = async () => {
    try {
      const promises = data.map(async (dataItem) => {
        if (dataItem.tracking) {
          dataItem.status = "processing";
          await updateShipment(dataItem); 
        }
      });
      
      await Promise.all(promises); 
      toast.success("Changes saved");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("That Notice id does not exist");
    }
  };

  
  return (
    <div>
      <div className="grid lg:grid-cols-4">
          <h2 className=" pb-2 text-3xl font-semibold ">
            Pendings
          </h2>
          <Button className="w-40" onClick={saveChanges}>Save</Button>
          <Button className="w-40" onClick={() => window.location.reload()}>Refresh</Button>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>


      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
