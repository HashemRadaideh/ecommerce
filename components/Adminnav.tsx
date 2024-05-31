"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "./ThemeToggle";

export default function Adminnav({ id }: { id: string }) {
  return (
    <nav className={cn("flex justify-between text-xl")}>
      <div className={cn("flex justify-between")}>
        <ul className={cn("flex gap-8 p-4")}>
          <li>
            <Link href={`/`}>Home</Link>
          </li>

          <li>
            <Link href={`/profile/admin/${id}/categories`}>Categories</Link>
          </li>

          <li>
            <Link href={`/profile/admin/${id}/products`}>Products</Link>
          </li>

          <li>
            <Link href={`/profile/admin/${id}/users`}>Users</Link>
          </li>

          <li>
            <Link href={`/profile/admin/${id}/orders`}>Orders</Link>
          </li>

          <li>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                document.cookie =
                  "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.reload();
              }}
            >
              <LogOut />
              <span className={cn("sr-only")}>log out</span>
            </button>
          </li>

          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
