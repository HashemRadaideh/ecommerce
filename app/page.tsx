"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
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
import { api, cn } from "@/lib/utils";

interface PaginatedProducts {
  products: Product[];
  total: number;
}

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const query = useQuery({
    queryKey: ["home_page", page],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedProducts>(`${api}/products`, {
        params: { page, limit },
        withCredentials: true,
      });
      return data;
    },
  });

  const totalProducts = query.data?.total || 0;
  const totalPages = Math.ceil(totalProducts / limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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
              : query.data?.products.slice(0, 5).map((product) => (
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
            "grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols7 grid-rows-2 gap-2 p-2",
          )}
        >
          {query.isLoading
            ? Array.from({ length: 10 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))
            : query.data?.products.map((product) => (
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

        <div className="flex justify-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={page === 1}
            className="mr-2 px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={page >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
}
