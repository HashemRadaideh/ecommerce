import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

import { cn } from "@/lib/utils";

export default function Adminnav() {
  return (
    <nav className={cn("flex justify-between text-xl")}>
      <div className={cn("flex justify-between")}>
        <ul className={cn("flex gap-8 p-4")}>
          <li>
            <ThemeToggle />
          </li>

          <li>
            <Link href="/profile/admin/">Dashboard</Link>
          </li>

          <li>
            <Link href="/profile/admin/categories/">Categories</Link>
          </li>

          <li>
            <Link href="/profile/admin/products">Products</Link>
          </li>

          <li>
            <Link href="/profile/admin/users">Users</Link>
          </li>

          <li>
            <Link href="/profile/admin/orders">Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
