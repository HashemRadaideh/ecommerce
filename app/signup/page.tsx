"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(5),
  password: z.string().min(8),
});

export default function Signup() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(api + "/api/auth/register", values);
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast({
        title: "Signed up successfully!",
        description: "Redirecting to home page",
      });
      router.replace("/");
    } catch (error) {
      console.error("Authentication failed:", error);
      toast({
        title: "Could not sign up",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <nav className={cn("pl-4 pt-4")}>
        <Button type="button" onClick={() => router.back()}>
          go back
        </Button>
      </nav>

      <main
        className={cn("flex min-h-screen flex-col items-center justify-center")}
      >
        <Card>
          <CardHeader
            className={cn(
              "text-4xl font-extrabold items-center justify-center",
            )}
          >
            Sign Up
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
                        <Input placeholder="Enter your username" {...field} />
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
                        <Input placeholder="Enter your E-mail" {...field} />
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
                          placeholder="Enter your Password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className={cn("w-full")}>
                  Sign up
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className={cn("text-sm items-center justify-center")}>
            <span>
              Already have an account!{" "}
              <Link href="/signin" className={cn("text-sky-500 underline")}>
                Sign in
              </Link>
            </span>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
