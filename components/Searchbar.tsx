"use client";

import { Product, Image as ProductImage } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { api, cn } from "@/lib/utils";

import ProductRow from "./ProductRow";
import { Button } from "./ui/button";

interface ProductWithImages extends Product {
  images: ProductImage[];
}

interface PaginatedProducts {
  products: ProductWithImages[];
  total: number;
}

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [skip, setSkip] = useState(0);
  const take = 10;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const query = useQuery({
    queryKey: [search, skip],
    queryFn: async () => {
      const { data } = await axios.get<PaginatedProducts>(`${api}/search`, {
        params: { skip, take, search },
        withCredentials: true,
      });
      return data;
    },
    enabled: !!search,
  });

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSearch = encodeURIComponent(search);
    router.push(`/search?q=${encodedSearch}`);
  };

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
    <div className="flex flex-col gap-2 p-2">
      <form
        onSubmit={onSearch}
        className={cn("flex gap-2 items-center justify-center w-full px-4")}
      >
        <Input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Quick search                  Ctrl K"
        />
        <Button type="submit">
          <Search />
          <span className={cn("sr-only")}>search</span>
        </Button>
      </form>

      <div
        className={cn(
          `rounded-lg border bg-card text-card-foreground shadow-sm`,
          { visible: search.length > 0, invisible: search.length === 0 },
        )}
      >
        {query.isLoading ? (
          <div className="flex items-center justify-center w-full px-4">
            ...
          </div>
        ) : (
          <div className="flex flex-col items-center justify-start max-w-sm">
            <ul>
              {query.data?.products.map((product) => (
                <li key={product.id}>
                  <Link href={`/product/${product.id}`}>
                    <ProductRow
                      title={product.name}
                      description={product.description || ""}
                      image={
                        product.images.length > 0
                          ? `data:${product.images[0].fileType};base64,${product.images[0].data}`
                          : "/placeholder.png"
                      }
                      imageAlt={product.name}
                      price={product.price}
                      stock={product.stockQuantity}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
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
        )}
      </div>
    </div>
  );
}
