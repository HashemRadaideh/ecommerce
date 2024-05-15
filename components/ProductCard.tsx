import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ProductCard({
  title,
  description,
  image,
  imageAlt,
  price,
  stock,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number;
  stock: number;
}) {
  return (
    <Card className={cn("hover:outline hover:outline-gray-500")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} alt={imageAlt} />
      </CardContent>
      <CardFooter className={cn("space-y-1 flex flex-col")}>
        <p>{price + "$"}</p>
        <p>only {stock} items left in stock</p>
      </CardFooter>
    </Card>
  );
}
