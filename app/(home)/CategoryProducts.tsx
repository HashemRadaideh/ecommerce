"use client";

import { Category, Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useState } from "react";

import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { api, cn } from "@/lib/utils";

interface PaginatedProducts {
  products: Product[];
  total: number;
}

export default function CategoryProducts({ category }: { category: Category }) {
  const [skip, setSkip] = useState(0);
  const take = 5;

  const query = useQuery({
    queryKey: [category.id, skip],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedProducts>(`${api}/products`, {
        params: { skip, take, search: category.id },
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
      <div className={cn("flex items-center justify-between w-full px-4")}>
        <div>
          <span className={cn("text-2xl font-bold")}>{category.name}</span>
          <span className={cn("block text-sm")}>{category.description}</span>
        </div>

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
      </div>

      <div className={cn("flex overflow-y-scroll w-full max-h-[425px]")}>
        <Suspense fallback={<LoadingSkeleton />}>
          {query.data?.products.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className={cn("max-w-[250px] m-2")}
            >
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
    </>
  );
}

function LoadingSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <ProductSkeleton key={index} />
  ));
}
