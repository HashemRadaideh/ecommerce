"use client";

import axios from "axios";
import { useQuery } from "react-query";

import { Navbar } from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/utils";

interface Data {
  message: string;
}

export default function Home() {
  const query = useQuery("data", async () =>
    axios.get<Data>(api + "/api/home"),
  );

  return (
    <>
      <Navbar></Navbar>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Fetching data from backend</CardTitle>
            <CardDescription>Please wait</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{query.isLoading ? "Loading..." : query.data?.data.message}</p>
          </CardContent>
          <CardFooter>
            <p>Hope you enjoyed this demo :3</p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
