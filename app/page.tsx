"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

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
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full max-w-lg"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Link href={`/product/${index}`}>
                  <Card>
                    <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols7 grid-rows-3 gap-2 p-2">
          {query.isLoading
            ? Array.from({ length: 30 }, (_, index) => (
                <ProductSkeleton key={index}></ProductSkeleton>
              ))
            : query.data?.data.map((item, index) => (
                <Link href={`/product/${index}`} key={index}>
                  <ProductCard>{item.message}</ProductCard>
                </Link>
              ))}
        </div>
      </main>
    </>
  );
}
