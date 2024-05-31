"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useState } from "react";

import { Navbar } from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { api, cn } from "@/lib/utils";

interface PaginatedProducts {
  products: Product[];
  total: number;
}

export default function Search() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams?.get("q") || "");
  const [skip, setSkip] = useState(0);
  const take = 10;

  const query = useQuery({
    queryKey: [search, skip],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedProducts>(`${api}/search`, {
        params: { skip, take, search },
        withCredentials: true,
      });
      console.log(data);
      return data;
    },
    enabled: !!search,
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

      <main className={cn("flex flex-col justify-start items-center")}>
        <div className="flex justify-center mt-4">
          <Button
            onClick={handlePrevPage}
            disabled={!skip}
            className="mr-2 px-4 py-2 border rounded disabled:opacity-50"
          >
            <ArrowLeft />
            <span className={cn("sr-only")}>Previous</span>
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={skip >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            <ArrowRight />
            <span className={cn("sr-only")}>Next</span>
          </Button>
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
