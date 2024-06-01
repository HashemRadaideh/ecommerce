"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

import { DataTable } from "@/components/DataTable";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Map } from "./map";

interface CartItems {
  product: Product;
  quantity: number;
}

const columns: ColumnDef<CartItems>[] = [
  {
    accessorKey: "product.name",
    header: "Name",
  },
  {
    accessorKey: "product.price",
    header: "Price",
  },
  {
    accessorKey: "product.stockQuantity",
    header: "Stock",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];

export default function UserId({ params }: { params: { id: string } }) {
  const { id } = params;

  const query = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(`${api}/cart?id=${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return data;
    },
  });

  return (
    <>
      <Navbar />

      <main className="">
        {query.data && (
          <Card>
            <Button
            type="button"
            className=""
            onClick={async () => {
              await axios.post(
                `${api}/orders`,
                {
                  token: localStorage.getItem("token"),
                  product: query.data,
                  
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
            <DataTable columns={columns} data={query.data} />
          </Card>
        )}
        <Map />
      </main>
    </>
  );
}
