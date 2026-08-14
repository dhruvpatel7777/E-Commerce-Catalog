import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const location = useLocation();
  const [badgeAnimation, setBadgeAnimation] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isProductsPage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";

  useEffect(() => {
    if (cartCount === 0) {
      return;
    }

    setBadgeAnimation(true);

    const timer = setTimeout(() => {
      setBadgeAnimation(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [cartCount]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80  bg-white/90  backdrop-blur-xl">
      <nav className="mx-auto flex h-20 items-center justify-between px-6 sm:px-8 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          {/* Logo Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-base font-black text-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:shadow-md sm:h-10 sm:w-10 sm:rounded-2xl sm:text-lg">
            N
          </div>

          {/* Logo Text */}
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-base">
              Nexora
            </p>

            <p className="hidden text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:block">
              Store
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1.5 sm:gap-2">

          {/* Products */}
          <Link
            to="/"
            className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:py-2.5 sm:text-sm ${
              isProductsPage
                ? "bg-violet-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            Products
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className={`relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm ${
              isCartPage
                ? " bg-violet-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            {/* Cart Icon */}
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

            {/* Cart Badge */}
            {cartCount > 0 && (
              <span
                className={`absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-950 px-1.5 text-[10px] font-bold text-white shadow-md ring-2 ring-white transition-transform duration-200 ${
                  badgeAnimation ? "scale-125" : "scale-100"
                }`}
              >
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