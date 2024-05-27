import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "./ThemeToggle";

export const Navbar: React.FC = () => {
  return (
    <nav className={cn("flex justify-between text-xl w-full h-[30px]")}>
      <Link className={cn("p-4")} href="/">
        Ecommerce
      </Link>

      <div className={cn("flex justify-between")}>
        <ul className={cn("flex gap-8 p-4")}>
          <li>
            <ThemeToggle />
          </li>

          <li>
            <a href="/cart">
              <ShoppingCart />
              <span className={cn("sr-only")}>cart</span>
            </a>
          </li>

          <li>
            <a href="/profile">profile</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
