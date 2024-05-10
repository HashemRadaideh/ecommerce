import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between text-xl">
      <Link className="p-4" href="/">
        Ecommerce
      </Link>

      <div className="flex justify-between">
        <ul className="flex gap-8 p-4">
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
