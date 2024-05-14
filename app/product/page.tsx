"use client";

import { Navbar } from "@/components/Navbar";
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

export default function AdminProducts() {
  return (
    <>
      <Navbar></Navbar>
      <main className="grid grid-cols-2 flex-col pl-3">
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
            <CardTitle className="text-5xl font-semibold">Card Title</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <span className="text-3xl">Price</span>
            <p>this is the description of the product</p>
            <CardFooter>
              <Button className="w-full">
                Add to cart
              </Button>
            </CardFooter>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
