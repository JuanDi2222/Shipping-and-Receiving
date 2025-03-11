"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { db } from "~/server/db";
import { getDateShipments } from "~/server/db/actions";

// Define the props for the DatePickerWithRange component
interface DatePickerWithRangeProps {
  className?: string;
}

// DatePickerWithRange component
export function DatePickerWithRange({
  className,
}: DatePickerWithRangeProps) {
  // State to manage the selected date range
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(Date.now()),
    to: addDays(new Date(Date.now()), 20),
  });

  // Function to handle the submission of the date range
  const handleDateRangeSubmit = async (dateRange: DateRange) => {
    try {
      // Fetch shipments data for the selected date range
      const response = await getDateShipments(dateRange);

      // Create a new workbook and worksheet
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(response);

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, "Shipments");

      // Convert the workbook to binary and create a Blob
      const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

      // Save the Blob as an Excel file
      saveAs(blob, "shipments_report.xlsx");
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date) {
      handleDateRangeSubmit(date);
    }
  };

  // Helper function to convert a string to an ArrayBuffer
  function s2ab(s: string) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  return (
    <form onSubmit={handleSubmit} className={cn("grid lg:grid-cols-2 gap-60 ", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button type="submit" className="mt-2 w-60">
        Generate Report
      </Button>
    </form>
  );
}
