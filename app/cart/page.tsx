"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Product } from "@/api/models/products";
import { DataTable } from "@/components/DataTable";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];

export default function Cart() {
  const getCart = () => {
    const cart = localStorage.getItem("cart");

    if (!cart) return null;

    const json: Product[] = JSON.parse(cart)!;

    return json;
  };

  const data = getCart();

  return (
    <>
      <Navbar />
      {data && (
        <Card>
          <DataTable columns={columns} data={data} />
        </Card>
      )}
    </>
  );
}
