"use client";

import axios from "axios";
import { useQuery } from "react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const query = useQuery("data", async () =>
    axios.get("http://localhost:8080/api/home"),
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {query.data?.data.message}

      <Button variant="outline">Button</Button>

      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </main>
  );
}
