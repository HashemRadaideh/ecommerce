import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between text-xl border-2">
      <Link className="p-4" href="/">
        Ecommerce
      </Link>

      <div className="flex justify-between">
        <ul className="flex gap-8 p-4">
          <li>
            <ThemeToggle />
          </li>

          <li>
            <Link href="/home">Home</Link>
          </li>

          <li>
            <Link href="/about">About</Link>
          </li>

          <li>
            <Link href="/chat">chat</Link>
          </li>

          <li>
            <Link href="/profile">profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
