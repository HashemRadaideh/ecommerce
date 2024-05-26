"use client";

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

import Adminnav from "@/components/Adminnav";
import { DataTable } from "@/components/DataTable";
import { Card } from "@/components/ui/card";
import { api, cn } from "@/lib/utils";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "password",
    header: "Password",
  },
];

export default function AdminUsers({ params }: { params: { id: string } }) {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios.get(`${api}/users`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return data;
    },
  });

  return (
    <>
      <Adminnav id={params.id} />

      <div className={cn("container mx-auto py-10")}>
        {query.data && (
          <Card>
            <DataTable columns={columns} data={query.data} />
          </Card>
        )}
      </div>
    </>
  );
}
