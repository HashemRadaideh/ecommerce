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
  className,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number;
  stock: number;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        `hover:outline hover:outline-gray-500 w-full h-full ${className}`,
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} width={500} height={500} alt={imageAlt} />
      </CardContent>
      <CardFooter className={cn("space-y-1 flex flex-col")}>
        <p>{price + "$"}</p>
        <p>only {stock} items left in stock</p>
      </CardFooter>
    </Card>
  );
}
