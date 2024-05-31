"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Adminnav from "@/components/Adminnav";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
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

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
];

const formSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(5),
  password: z.string().min(8),
});

export default function AdminUsers({ params }: { params: { id: string } }) {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${api}/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const sortedData = data.sort((a: User, b: User) =>
        a.username.localeCompare(b.username),
      );
      return sortedData;
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`${api}/users`, values, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast({
        title: "Added user successfully",
      });
    } catch (error) {
      toast({
        title: "User could not be added",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Adminnav id={params.id} />

      <Card>
        <CardHeader
          className={cn("text-4xl font-extrabold items-center justify-center")}
        >
          Add user
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className={cn("space-y-4")}
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter E-mail" {...field} />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className={cn("w-full")}>
                Add user
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className={cn("container mx-auto py-10")}>
        {query.data && (
          <Card>
            <DataTable columns={columns} data={query.data} />
          </Card>
        )}
      </div>
    </>
  );
}
