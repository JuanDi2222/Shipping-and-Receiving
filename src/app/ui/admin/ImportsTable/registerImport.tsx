"use client";
import { string, z } from "zod";
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

import { useState } from "react";

import { registerImport } from "~/server/db/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "~/components/ui/select"

const formSchema = z.object({
    id: z.coerce.number(),
    job: z.coerce.number(),
    carrier: z.string(),
    tracking: z.string(),
    supplier: z.string(),
    bulks: z.string(),
    description: z.string(),
    requestor: z.string(),
    country: z.string(),
    recievedDate: z.date(),
    requestorId: z.string(),
    
});

type NamesArray = {
    name: string | null ;
    userId: string | null
}

type ImportFormProps = {
    names: NamesArray[]; 
};

export function ImportForm({ names }: ImportFormProps) {
  const [isChecked, setIsChecked] = useState(false);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        id: 0,
        job: 0,
        carrier: "",
        tracking: "",
        supplier: "",
        bulks: "",
        description: "",
        requestor: "",
        country: "",
        recievedDate: new Date(Date.now()),
        requestorId: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    names.map((name) => {
        if (values.requestor === name.name) {
            values.requestorId = name.userId? name.userId : "";
        }
    });
    registerImport (values);
    router.push("/dashboard/admin/ImportTable");
    console.log(values);
    toast.success("Import Registered Successfully");

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className=" grid gap-4 grid-cols-10 border-2 border-gray-200 p-4">
      <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Id" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="job"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job</FormLabel>
              <FormControl>
                <Input type="number" placeholder="job" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="carrier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carrier</FormLabel>
              <FormControl>
                <Input placeholder="Carrier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                        <FormField
          control={form.control}
          name="tracking"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking</FormLabel>
              <FormControl>
                <Input placeholder="Tracking" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="supplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supplier</FormLabel>
              <FormControl>
                <Input placeholder="Supplier" {...field} />
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
                <Input placeholder="Bulks" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requestor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Nombre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {names.map((name, index) => (
                        <SelectItem key={index} value={name.name || ""}>
                        {name.name}
                        </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        
    <Button type="submit">Register</Button>
    </div>
        
      </form>
    </Form>
  );
}
