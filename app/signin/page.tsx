"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ArrowBigLeftDash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
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
  email: z.string().email().min(5),
  password: z.string().min(8),
});

export default function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${api}/api/auth/login`, values, {
        withCredentials: true,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      toast({
        title: "Signed in successfully!",
        description: "Redirecting to home page",
      });

      router.back();
    } catch (error) {
      toast({
        title: "Could not sign in",
        description: "If you don't have an account yet, please sign up first.",
        variant: "destructive",
        action: (
          <Button type="button" onClick={() => router.push("/signup")}>
            Sign up
          </Button>
        ),
      });
    }
  };

  return (
    <>
      <nav className={cn("pl-4 pt-4")}>
        <Button type="button" onClick={() => router.back()}>
          <ArrowBigLeftDash />
          <span className={cn("sr-only")}>go back</span>
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
            Sign In
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={cn("space-y-4")}
              >
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
                  Sign in
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className={cn("text-sm items-center justify-center")}>
            <span>
              Create an account for free!{" "}
              <Link href="/signup" className={cn("text-sky-500 underline")}>
                Sign up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
