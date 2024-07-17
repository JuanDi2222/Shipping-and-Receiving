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
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";

import Info from "~/app/ui/info";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { getData } from "country-list";

import React, { useState } from "react";

const formSchema = z.object({
  company: z.string().min(1).max(30),
  address: z.string().min(1).max(100),
  area: z.string().min(1).max(100),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(100),
  zip: z.string().min(1).max(100),
  country: z.string().max(100),
  Recipient: z.string().min(1).max(100),
  phone: z.string().min(1).max(100),
  email: z.string().email().min(1).max(100),
  description: z.string().min(1).max(100),
  project: z.string().min(1).max(100),
  account: z.string().max(100),
  type: z.enum(
    [
      "Standard Overnight",
      "Second Business Day",
      "Ground",
      "Priority Overnight",
      "Next Day Delivery",
      "International",
    ],
    { required_error: "Please select a service type" },
  ),
});

export function MailForm() {
  const countries = getData();
  const [selectedOption, setSelectedOption] = useState<String | null>(null);

  const handleChange = (value: String) => {
    setSelectedOption(value);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      address: "",
      area: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      Recipient: "",
      phone: "",
      email: "",
      description: "",
      project: "",
      type: "Standard Overnight",
      account: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Ship to:
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Please fill in the following information to ship your goods to the
          desired destination. In case of not using the recipients information
          it could cause delays in the delivery.
        </p>
        <div className="m-28 mt-16 grid gap-4 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Area</FormLabel>
                <FormControl>
                  <Input placeholder="Area" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
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
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="Zip Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Recipient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient's name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input placeholder="E-Mail" {...field} />
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
            name="project"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project </FormLabel>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Please insert the number that appears on the project's time
                    sheet. In case that it does not apply, leave it blank.
                  </HoverCardContent>
                </HoverCard>
                <FormControl>
                  <Input placeholder="Project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Service Type:
        </h2>

        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Please select a service type for shipment. In case of needing special
          packaging or transport, please contact the shipping team for more
          information.
        </p>

        <div className="m-28 mt-16 grid gap-4 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-5"
                  >
                    {selectedOption === "United States of America" && (
                      <>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Standard Overnight" />
                          </FormControl>
                          <FormLabel className="text-xl font-normal">
                            Standard Overnight
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Second Business Day" />
                          </FormControl>
                          <FormLabel className="text-xl font-normal">
                            Second Business Day
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Ground" />
                          </FormControl>
                          <FormLabel className="text-xl font-normal">
                            Ground
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Priority Overnight" />
                          </FormControl>
                          <FormLabel className="text-xl font-normal">
                            Priority Overnight
                          </FormLabel>
                          <HoverCard>
                            <HoverCardTrigger>
                              <Info />
                            </HoverCardTrigger>
                            <HoverCardContent>
                              This option requires approval of level 7 or 8.
                              Please contact the shipping team for more
                              information.
                            </HoverCardContent>
                          </HoverCard>
                        </FormItem>
                      </>
                    )}

                    {selectedOption == "Mexico" && (
                      <>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Next Day Delivery" />
                          </FormControl>
                          <FormLabel className="text-xl font-normal">
                            Next Day Delivery
                          </FormLabel>
                        </FormItem>
                      </>
                    )}

                    {selectedOption !== "Mexico" &&
                      selectedOption !== "United States of America" &&
                      selectedOption !== null && (
                        <>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="International" />
                            </FormControl>
                            <FormLabel className="text-xl font-normal">
                              International (3 to 5 transit days)
                            </FormLabel>
                          </FormItem>
                        </>
                      )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedOption !== null && <>            <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient's shipment account    </FormLabel>
                <HoverCard>
                  <HoverCardTrigger>
                    <Info />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    In case that the recipient gives you a shipment account, please insert it here.
                  </HoverCardContent>
                </HoverCard>
                <FormControl>
                  <Input placeholder="Account Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /></>}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}