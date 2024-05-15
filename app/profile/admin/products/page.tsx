"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Adminnav from "@/components/Adminnav";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { api, cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  stock_quantity: z.number(),
  price: z.number(),
});

export default function AdminProducts() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      stock_quantity: 0,
      price: 0,
    },
  });

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(api + "/api/product", values);
      toast({
        title: "Added product successfully",
      });
    } catch (error) {
      toast({
        title: "Product could not be added",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Adminnav />

      <main
        className={cn("flex min-h-screen flex-col items-center justify-center")}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className={cn("space-y-4")}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} {...form.register("name")} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Input {...field} {...form.register("description")} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Category</FormLabel>
                  <FormControl>
                    <Input {...field} {...form.register("category")} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stock_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("stock_quantity", {
                        valueAsNumber: true,
                      })}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      {...form.register("price", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className={cn("w-full")}>
              Add product
            </Button>
          </form>
        </Form>
      </main>
    </>
  );
}
