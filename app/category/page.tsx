"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
      <Navbar />

      <main className="flex flex-col items-center">
        <Input placeholder="Search" className="w-4/6 mb-5 border-2"></Input>
        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols7 grid-rows-3 gap-2 p-2">
          {query.isLoading
            ? Array.from({ length: 30 }, (_, index) => (
                <ProductSkeleton key={index}></ProductSkeleton>
              ))
            : query.data?.data.map((item, index) => (
                <Link href={`/category/${index}`} key={index}>
                  <ProductCard>{item.message}</ProductCard>
                </Link>
              ))}
        </div>
      </main>
    </>
  );
}
