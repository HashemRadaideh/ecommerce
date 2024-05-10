import { Payment, columns } from "./column";
import { DataTable } from "./data-table";

import { Card } from "@/components/ui/card";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <Card className="w-9/12">
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  );
}