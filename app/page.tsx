"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState("Loading...");

  useEffect(() => {
    fetch(`http://localhost:8080/api/home`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.message);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data}
    </main>
  );
}
