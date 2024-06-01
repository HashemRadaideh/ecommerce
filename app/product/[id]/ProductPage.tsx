"use client";

import { Product, Image as ProductImage } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export default function ProductPage({ id }: { id: string }) {
  const [quantity, setQuantity] = useState(1);

  const query = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get<ProductWithImages>(
        `${api}/product?id=${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      return data;
    },
  });

  return query.isLoading ? (
    <>
      <Carousel className="w-full max-w-lg m-10">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <Skeleton className="aspect-[16/9]" />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Card className="m-10">
        <CardHeader>
          <CardTitle className="text-5xl font-semibold">
            <Skeleton />
          </CardTitle>
          <CardDescription>
            <Skeleton />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Skeleton />
        </CardContent>
        <CardFooter>
          <Skeleton />
          <Button className="w-full">
            <Skeleton />
          </Button>
        </CardFooter>
      </Card>
    </>
  ) : (
    <>
      <Carousel className="w-full max-w-lg m-10">
        <CarouselContent>
          {query.data?.images.map((image, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-[16/9] items-center justify-center p-6">
                  <Image
                    src={`data:${image.fileType};base64,${image.data}`}
                    alt={query.data?.name || ""}
                    width={500}
                    height={500}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Card className="m-10">
        <CardHeader>
          <CardTitle className="text-5xl font-semibold">
            {query.data?.name}
          </CardTitle>
          <CardDescription>{query.data?.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <span className="text-3xl">Price: {query.data?.price}$</span>
        </CardContent>
        <CardFooter className={cn("flex justify-between")}>
          <Button
            type="button"
            className=""
            onClick={async () => {
              await axios.post(
                `${api}/cart`,
                {
                  token: localStorage.getItem("token"),
                  product: query.data,
                  quantity,
                },
                {
                  headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                },
              );
            }}
          >
            Add to cart
          </Button>

          <div>
            <Button
              onClick={() => {
                if (quantity === query.data?.stockQuantity) return;
                setQuantity(quantity + 1);
              }}
            >
              +
            </Button>
            <span className={cn("px-6")}>{quantity}</span>
            <Button
              onClick={() => {
                if (quantity === 1) return;
                setQuantity(quantity - 1);
              }}
            >
              -
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
