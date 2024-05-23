"use client";

import Adminnav from "@/components/Adminnav";

export default function AdminProducts({ params }: { params: { id: string } }) {
  return (
    <>
      <Adminnav id={params.id} />
    </>
  );
}
