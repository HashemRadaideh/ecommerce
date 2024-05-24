import Link from "next/link";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "./ThemeToggle";

export default function Usernav({ id }: { id: string }) {
  return (
    <nav className={cn("flex justify-between text-xl")}>
      <div className={cn("flex justify-between")}>
        <ul className={cn("flex gap-8 p-4")}>
          <li>
            <Link href={`/profile/user/${id}`}>Dashboard</Link>
          </li>

          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
