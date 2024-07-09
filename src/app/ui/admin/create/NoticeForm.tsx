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
  fedexground: z.boolean().default(false).optional(),
  line: z.string().min(1).max(100),
  plates: z.string().min(1).max(10),
  seal: z.coerce.number().min(1),
  manifest: z.string().optional(),
  bulks: z.coerce.number().min(1),
  description: z.string().min(1).max(100),
  operator: z.string().min(1).max(100),
  creator: z.string().min(1).max(100),
  bulksfedex: z.coerce.number().max(100).optional(),
  bulksfdxfreight: z.coerce.number().max(100).optional(),
  bulksfdxground: z.coerce.number().max(100).optional(),
  bulksdhl: z.coerce.number().max(100).optional(),
  bulksups: z.coerce.number().max(100).optional(),
  etdcdock: z.string().max(100).optional(),
  bulksetdc: z.string().max(100).optional(),
  epdcdock: z.string().max(100).optional(),
  bulksepdc: z.string().max(100).optional(),
  otherdock: z.string().max(100).optional(),
  bulksother: z.string().max(100).optional(),
});

export function ProfileForm() {
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
      fedexground: false,
      line: "",
      plates: "",
      seal: 0,
      manifest: "",
      bulks: 0,
      description: "",
      operator: "",
      creator: "",
      bulksfdxfreight: 0,
      bulksfdxground: 0,
      bulksfedex: 0,
      bulksdhl: 0,
      bulksups: 0,
      etdcdock: "",
      bulksetdc: "",
      epdcdock: "",
      bulksepdc: "",
      otherdock: "",
      bulksother: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
            name="fedexground"
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
              name="bulksfdxground"
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
              name="bulksfdxfreight"
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
              name="bulksdhl"
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
              name="bulksups"
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
              name="bulksother"
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export function onSubmit() {
  console.log("hola");
}
