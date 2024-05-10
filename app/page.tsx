"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { Navbar } from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { api } from "@/lib/utils";

interface Data {
  message: string;
}

export default function Home() {
  const query = useQuery({
    queryKey: ["data"],
    queryFn: async () => axios.get<Data[]>(api + "/api/home"),
  });

  return (
    <>
      <Navbar></Navbar>
      <main className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols7 grid-rows-3 gap-2 p-2">
        {query.isLoading
          ? Array.from({ length: 30 }, (_, index) => (
              <ProductSkeleton key={index}></ProductSkeleton>
            ))
          : query.data?.data.map((item, index) => (
              <ProductCard key={index}>{item.message}</ProductCard>
            ))}
      </main>
    </>
  );
}
