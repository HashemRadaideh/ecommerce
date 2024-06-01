"use client";

import { Product, Image as ProductImage } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { api, cn } from "@/lib/utils";

interface ProductWithImages extends Product {
  images: ProductImage[];
}

export default function Latests() {
  const query = useQuery({
    queryKey: ["latests"],
    queryFn: async () => {
      const { data } = await axios.get<ProductWithImages[]>(
        `${api}/products/latest`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      return data;
    },
  });

  return (
    <>
      <Carousel
        plugins={[Autoplay({ delay: 2000 })]}
        className={cn("w-full max-w-lg")}
      >
        <CarouselContent>
          {query.isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
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
            : query.data?.map((product) => (
                <CarouselItem key={product.id}>
                  <Link href={`/product/${product.id}`}>
                    <Card>
                      <CardContent
                        className={cn("flex items-center justify-center p-6")}
                      >
                        {product.images.length > 0 ? (
                          <Image
                            src={`data:${product.images[0].fileType};base64,${product.images[0].data}`}
                            alt={product.name}
                            width={500}
                            height={500}
                          />
                        ) : (
                          <Image
                            src="/placeholder.png"
                            alt={product.name}
                            width={500}
                            height={500}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
