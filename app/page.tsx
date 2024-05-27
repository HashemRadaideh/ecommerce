"use client";

import { Category } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Navbar } from "@/components/Navbar";
import Searchbar from "@/components/Searchbar";
import { api, cn } from "@/lib/utils";

import CategoryProducts from "./(home)/CategoryProducts";
import Latests from "./(home)/Latest";

export default function Home() {
  const query = useQuery({
    queryKey: ["home_page"],
    queryFn: async () => {
      const { data } = await axios.get<Category[]>(`${api}/categories`, {
        withCredentials: true,
      });
      return data;
    },
  });

  return (
    <>
      <Navbar />

      <main className={cn("flex flex-col items-center")}>
        <Searchbar />

        <Latests />

        {query.data?.map((category, index) => (
          <CategoryProducts key={index} category={category} />
        ))}
      </main>
    </>
  );
}
