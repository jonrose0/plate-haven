"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex">
      <ul className="flex gap-4">
        <li>
          <Link
            href="/"
            className={cn(
              "py-2 uppercase font-heading font-bold text-2xl hover:border-b-2",
              pathname === "/" && "border-b-2"
            )}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/menu"
            className={cn(
              "py-2 uppercase font-heading font-bold text-2xl hover:border-b-2",
              pathname === "/menu" && "border-b-2"
            )}
          >
            Menu
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
