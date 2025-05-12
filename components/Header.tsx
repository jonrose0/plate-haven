import Cart from "./Cart";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className="sticky top-0 w-full border-b flex items-center bg-nav-background text-white p-4 z-50">
      <MainNav />
      <MobileNav />
      <div className="flex items-center justify-end flex-1">
        <Cart />
      </div>
    </header>
  );
}

export default Header;
