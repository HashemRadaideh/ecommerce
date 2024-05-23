"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
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
import { Input } from "@/components/ui/input";
import { api, cn } from "@/lib/utils";

export default function Home() {
  const query = useQuery({
    queryKey: ["home_page"],
    queryFn: async () =>
      axios.get<Product[]>(`${api}/products`, {
        withCredentials: true,
      }),
  });

  return (
    <>
      <Navbar />

      <main className={cn("flex flex-col items-center")}>
        <Input placeholder="Search" className={cn("w-4/6 mb-5 border-2")} />

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className={cn("w-full max-w-lg")}
        >
          <CarouselContent>
            {query.isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent
                        className={cn(
                          "flex aspect-[16/9] items-center justify-center p-6",
                        )}
                      ></CardContent>
                    </Card>
                  </CarouselItem>
                ))
              : query.data?.data.slice(0, 5).map((product) => (
                  <CarouselItem key={product.id}>
                    <Link href={`/product/${product.id}`}>
                      <Card>
                        <CardContent
                          className={cn(
                            "flex aspect-[16/9] items-center justify-center p-6",
                          )}
                        >
                          <Image
                            src={"/placeholder.png"}
                            alt={product.name}
                            width={500}
                            height={500}
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div
          className={cn(
            "grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols7 grid-rows-3 gap-2 p-2",
          )}
        >
          {query.isLoading
            ? Array.from({ length: 30 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))
            : query.data?.data.map((product) => (
                <Link href={`/product/${product.id}`} key={product.id}>
                  <ProductCard
                    title={product.name}
                    description={product.description || ""}
                    image={"/placeholder.png"}
                    imageAlt={product.name}
                    price={product.price}
                    stock={product.stockQuantity}
                  />
                </Link>
              ))}
        </div>
      </main>
    </>
  );
}
