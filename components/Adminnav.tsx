import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function Adminnav({ id }: { id: string }) {
  return (
    <nav className={cn("flex justify-between text-xl")}>
      <div className={cn("flex justify-between")}>
        <ul className={cn("flex gap-8 p-4")}>
          <li>
            <ThemeToggle />
          </li>

          <li>
            <Link href={`/profile/admin/${id}`}>Dashboard</Link>
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
        </ul>
      </div>
    </nav>
  );
}
