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
import { api } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().min(5),
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
      const response = await axios.post(api + "/api/auth/login", values);
      const { token } = response.data;
      localStorage.setItem("token", token);
      toast({
        title: "Signed in successfully!",
        description: "Redirecting to home page",
      });
      router.replace("/");
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
      <nav className="pl-4 pt-4">
        <Button type="button" onClick={() => router.back()}>
          go back
        </Button>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <CardHeader className="text-4xl font-extrabold items-center justify-center">
            Sign In
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
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
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-sm items-center justify-center">
            <span>
              Create an account for free!{" "}
              <Link href="/signup" className="text-sky-500 underline">
                Sign up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
