import { AlignJustify } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";

function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent side="left" className="py-12 gap-0">
          <SheetTitle className="hidden">Menu</SheetTitle>
          <SheetClose asChild>
            <Link
              href="/"
              className="px-8 py-4 border-b border-t font-heading font-bold uppercase text-2xl"
            >
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href="/menu"
              className="px-8 py-4 border-b font-heading font-bold uppercase text-2xl"
            >
              Menu
            </Link>
          </SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
