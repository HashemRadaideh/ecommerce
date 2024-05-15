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
});

export default function AdminCategories() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(api + "/api/category", values);
      toast({
        title: "Added category successfully",
      });
    } catch (error) {
      toast({
        title: "Category could not be added",
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
                  <FormLabel>Category Name</FormLabel>
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
                  <FormLabel>Category Description</FormLabel>
                  <FormControl>
                    <Input {...field} {...form.register("description")} />
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
