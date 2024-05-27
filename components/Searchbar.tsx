"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { api, cn } from "@/lib/utils";

export default function Searchbar() {
  const [skip, setSkip] = useState(0);
  const take = 10;

  const query = useQuery({
    queryKey: ["search", skip],
    queryFn: async () => {
      const { data } = await axios.get(`${api}/products`, {
        params: { skip, take },
        withCredentials: true,
      });
      return data;
    },
  });

  return (
    <>
      <Input placeholder="Search" className={cn("w-4/6 m-5 border-2")} />
    </>
  );
}
