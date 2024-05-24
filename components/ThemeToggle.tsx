"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, MouseEvent } from "react";

import { cn } from "@/lib/utils";

const Sun = dynamic(() => import("lucide-react").then((mod) => mod.Sun), {
  ssr: false,
});

const Moon = dynamic(() => import("lucide-react").then((mod) => mod.Moon), {
  ssr: false,
});

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof localStorage === "undefined") return "light";
    return localStorage.getItem("theme") as "dark" | "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <button
      className={cn("ml-0")}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      <span className={cn("sr-only")}>Theme mode toggle</span>
    </button>
  );
};
