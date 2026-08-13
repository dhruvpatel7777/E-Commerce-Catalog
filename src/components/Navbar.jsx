import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const location = useLocation();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isProductsPage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:min-h-20 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-base font-black text-slate-950 shadow-lg transition duration-300 group-hover:scale-105 sm:h-10 sm:w-10 sm:rounded-2xl sm:text-lg">
            S
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-white sm:text-base">
              Spatial
            </p>

            <p className="hidden text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:block">
              Store
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Products */}
          <Link
            to="/"
            className={`rounded-xl px-3 py-2 text-xs font-medium transition sm:px-4 sm:py-2.5 sm:text-sm ${
              isProductsPage
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            Products
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
              isCartPage
                ? "bg-white text-slate-950"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6"
              />

              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            <span>Cart</span>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[10px] font-bold text-slate-950 shadow-lg ring-2 ring-slate-950">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;