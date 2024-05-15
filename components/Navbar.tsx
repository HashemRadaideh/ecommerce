import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  return (
    <nav className={cn("flex justify-between text-xl")}>
      <Link className={cn("p-4")} href="/">
        Ecommerce
      </Link>

      <div className={cn("flex justify-between")}>
        <ul className={cn("flex gap-8 p-4")}>
          <li>
            <ThemeToggle />
          </li>

          <li>
            <Link href="/about">about</Link>
          </li>

          <li>
            <Link href="/cart">cart</Link>
          </li>

          <li>
            <Link href="/profile">profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
