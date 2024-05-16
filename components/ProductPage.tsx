"use client";

import { Skeleton } from "./ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

import { Product } from "@/api/models/products";
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
import { api } from "@/lib/utils";

export default function ProductPage({ id }: { id: string }) {
  const query = useQuery({
    queryKey: [id],
    queryFn: async () => axios.get<Product>(`${api}/api/product?id=${id}`),
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
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-[16/9] items-center justify-center p-6"></CardContent>
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
            {query.data?.data.name}
          </CardTitle>
          <CardDescription>{query.data?.data.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Image src={""} alt={query.data?.data.name!} />
          <span className="text-3xl">Price: {query.data?.data.price}$</span>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to cart</Button>
        </CardFooter>
      </Card>
    </>
  );
}
