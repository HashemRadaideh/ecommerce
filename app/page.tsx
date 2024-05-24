"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { useState } from "react";

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
import { Skeleton } from "@/components/ui/skeleton";
import { api, cn } from "@/lib/utils";

interface PaginatedProducts {
  products: Product[];
  total: number;
}

export default function Home() {
  const [skip, setSkip] = useState(0);
  const take = 10;

  const query = useQuery({
    queryKey: ["home_page", skip],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedProducts>(`${api}/products`, {
        params: { skip, take },
        withCredentials: true,
      });
      return data;
    },
  });

  const totalProducts = query.data?.total || 0;
  const totalPages = Math.ceil(totalProducts / take);

  const handleNextPage = () => {
    if (skip < totalPages) {
      setSkip((prevPage) => prevPage + take);
    }
  };

  const handlePrevPage = () => {
    setSkip((prevPage) => Math.max(prevPage - take, 0));
  };

  return (
    <>
      <Navbar />

      <main className={cn("flex flex-col items-center")}>
        <Input placeholder="Search" className={cn("w-4/6 m-5 border-2")} />

        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className={cn("w-full max-w-lg")}
        >
          <CarouselContent>
            {query.isLoading
              ? Array.from({ length: take }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent
                        className={cn(
                          "flex h-[510px] w-[510px] items-center justify-center p-6",
                        )}
                      >
                        <Skeleton className={cn("w-full h-full")} />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))
              : query.data?.products.map((product) => (
                  <CarouselItem key={product.id}>
                    <Link href={`/product/${product.id}`}>
                      <Card>
                        <CardContent
                          className={cn("flex items-center justify-center p-6")}
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

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={!skip}
            className="mr-2 px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={skip >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <div
          className={cn(
            "grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols7 grid-rows-2 gap-2 p-2",
          )}
        >
          <Suspense fallback={<LoadingSkeleton />}>
            {query.data?.products.map((product) => (
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
          </Suspense>
        </div>
      </main>
    </>
  );
}

function LoadingSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <ProductSkeleton key={index} />
  ));
}
