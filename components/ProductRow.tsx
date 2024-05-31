import Image from "next/image";

import { cn } from "@/lib/utils";

export default function ProductRow({
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
    <div
      className={cn(
        `flex gap-2 hover:outline hover:outline-gray-500 w-full h-full border rounded-md shadow-sm ${className}`,
      )}
    >
      <Image
        src={image}
        width={100}
        height={100}
        alt={imageAlt}
        className="rounded-md"
      />
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="">{description}</p>
        </div>
        <div className="flex justify-between items-end mt-4">
          <span className="text-xl font-bold">{price}$</span>
          <span className="text-sm">Only {stock} left in stock</span>
        </div>
      </div>
    </div>
  );
}
