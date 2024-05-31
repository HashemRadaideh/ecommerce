import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import Searchbar from "./Searchbar";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar: React.FC = () => {
  return (
    <nav className={cn("flex justify-between text-xl w-full")}>
      <Link className={cn("p-4")} href="/">
        Ecommerce
      </Link>

      <div className={cn("flex justify-between")}>
        <Searchbar />

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
