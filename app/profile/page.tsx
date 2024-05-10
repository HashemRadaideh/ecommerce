"use client";

import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

import { User } from "@/api/models/users";
import { DataTable } from "@/components/DataTable";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/utils";

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

export default function DemoPage() {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => axios.get<User[]>(api + "/api/users"),
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        {query.data && (
          <Card>
            <DataTable columns={columns} data={query.data.data} />
          </Card>
        )}
      </div>
    </>
  );
}
