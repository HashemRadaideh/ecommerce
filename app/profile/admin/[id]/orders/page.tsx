"use client";

import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

import { DataTable } from "@/components/DataTable";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/utils";

interface Orders {
  id: String;
  userId: String;
  productId: String;
  quantity: number;
  createdAt: Date;
}

const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "user.email",
    header: "Email",
  },
  {
    accessorKey: "quantity",
    header: "Total",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];

export default function UserId({ params }: { params: { id: string } }) {
  const { id } = params;

  const query = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const { data } = await axios.get(`${api}/orders`, {
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
            <DataTable columns={columns} data={query.data} />
          </Card>
        )}
      </main>
    </>
  );
}
