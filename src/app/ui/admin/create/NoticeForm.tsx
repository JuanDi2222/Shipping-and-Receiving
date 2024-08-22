"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";

import { useState } from "react";


import { shipmentNotice } from "~/server/db/schema";

import { createShipmentNotice } from "~/server/db/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

const formSchema = z.object({
  other: z.string().optional(),
  epdc: z.boolean().default(false).optional(),
  etdc: z.boolean().default(false).optional(),
  drchih: z.boolean().default(false).optional(),
  dhl: z.boolean().default(false).optional(),
  fedex: z.boolean().default(false).optional(),
  panalpina: z.boolean().default(false).optional(),
  ups: z.boolean().default(false).optional(),
  ctransport: z.boolean().default(false).optional(),
  fedexGround: z.boolean().default(false).optional(),
  line: z.string().min(1,{message: "Line is required"}).max(50,{message: "Too many characters"}),
  plates: z.string().min(1,{message: "Plates is required "}).max(10),
  seal: z.coerce.number(),
  manifest: z.string().optional(),
  bulks: z.coerce.number().min(1,{message: "Bulks is required "}),
  description: z.string().min(1,{message: "A  description for goods is required"}).max(50,{message: "Too many characters"}),
  operator: z.string().min(1,{message: "Operator is required"}).max(50,{message: "Too many characters"}),
  creator: z.string().min(1,{message: "Creator is required"}).max(50,{message: "Too many characters"}),
  bulksfedex: z.coerce.number().max(10,{message: "Too many characters"}).optional(),
  bulksFedexFreight: z.coerce.number().optional(),
  bulksFedexGround: z.coerce.number().optional(),
  bulksDHL: z.coerce.number().optional(),
  bulksUPS: z.coerce.number().optional(),
  etdcdock: z.string().max(50,{message: "Too many characters"}).optional(),
  bulksetdc: z.string().max(50,{message: "Too many characters"}).optional(),
  epdcdock: z.string().max(50,{message: "Too many characters"}).optional(),
  bulksepdc: z.string().max(50,{message: "Too many characters"}).optional(),
  otherdock: z.string().max(50,{message: "Too many characters"}).optional(),
  bulksOther: z.string().max(50,{message: "Too many characters"}).optional(),
  pediment: z.coerce.number().optional(),
  pedimentCode: z.string().max(3).optional(),
  entry: z.coerce.number().optional(),
});

export function NoticeForm() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const AdditionalComponent = () => {
    return (
      <div className="m-28 mt-16 grid gap-4 lg:grid-cols-4">
        <FormField
          control={form.control}
          name="pediment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pediment</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Pediment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pedimentCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pediment Code</FormLabel>
              <FormControl>
                <Input placeholder="Pediment Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="entry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Entry Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      other: "",
      epdc: false,
      etdc: false,
      drchih: false,
      dhl: false,
      fedex: false,
      panalpina: false,
      ups: false,
      ctransport: false,
      fedexGround: false,
      line: "",
      plates: "",
      seal: 0,
      manifest: "",
      bulks: 0,
      description: "",
      operator: "",
      creator: "",
      bulksFedexFreight: 0,
      bulksFedexGround: 0,
      bulksfedex: 0,
      bulksDHL: 0,
      bulksUPS: 0,
      etdcdock: "",
      bulksetdc: "",
      epdcdock: "",
      bulksepdc: "",
      otherdock: "",
      bulksOther: "",
      pediment: 0,
      pedimentCode: "",
      entry: 0,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {

    createShipmentNotice (values);
    router.push("/dashboard/admin");
    toast.success("Shipment notice created successfully");

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Destination
        </h2>

        <div className="m-28 mt-16 grid gap-4 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="epdc"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>EPDC</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="etdc"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>ETDC</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="drchih"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>DRCHIH</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dhl"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>DHL</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fedex"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Fedex</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panalpina"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Panalpina</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ups"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>UPS</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ctransport"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>CTransport</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fedexGround"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Fedex Ground</FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Others" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Transport Information
        </h2>

        <div className="m-28 mt-16 grid gap-4 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="line"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transport Line</FormLabel>
                <FormControl>
                  <Input placeholder="Transport Line" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="plates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Plates</FormLabel>
                <FormControl>
                  <Input placeholder="Plates" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="seal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seal</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Seal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manifest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manifest</FormLabel>
                <FormControl>
                  <Input placeholder="Manifest" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bulks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bulks</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Bulks" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description of goods</FormLabel>
                <FormControl>
                  <Input placeholder="Description of goods" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operator</FormLabel>
                <FormControl>
                  <Input placeholder="Operator" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="creator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Generated By:</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Goods Arrangement
        </h2>

        <div className="m-2 mt-16 grid gap-2 lg:grid-cols-2">
          <div className="m-28 mt-16 grid gap-4 lg:grid-cols-1">
            <FormField
              control={form.control}
              name="bulksfedex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bulks Fedex</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Bulks Fedex" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bulksFedexGround"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bulks Fedex Ground</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Bulks Fedex Ground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bulksFedexFreight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bulks Fedex Freight</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Bulks Fedex Freight"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bulksDHL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bulks DHL</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Bulks DHL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bulksUPS"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bulks UPS</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Bulks UPS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="m-28 mt-16 grid gap-1 lg:grid-cols-3">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              ETDC
            </h3>
            <FormField
              control={form.control}
              name="etdcdock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Dock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bulksetdc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Bulks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              EPDC
            </h3>
            <FormField
              control={form.control}
              name="epdcdock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Dock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bulksepdc"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Bulks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Other
            </h3>
            <FormField
              control={form.control}
              name="otherdock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Dock" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bulksOther"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Bulks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <label
            htmlFor="checkbox"
            className="text-md font-medium text-gray-900"
          >
            Would you like to add cross data?
          </label>
          <Input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-5 w-5 rounded border-gray-300 bg-gray-100 text-red-600 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-red-600"
            id="checkbox"
          />
        </div>

        {isChecked && <AdditionalComponent />}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
