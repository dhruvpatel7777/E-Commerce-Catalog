import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart } from "../redux/cartSlice";
import { showNotification } from "../redux/notificationSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(showNotification(product.title));
  };

  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/90 p-3 shadow-[0_10px_35px_rgba(71,54,120,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_45px_rgba(71,54,120,0.14)]">

      {/* Subtle Card Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-200/30 blur-3xl transition-all duration-500 group-hover:bg-violet-300/40" />

      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden rounded-[20px] border border-slate-100 bg-slate-50"
      >
        <div className="flex h-56 items-center justify-center p-7 sm:h-60">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Category Badge */}
        <span className="absolute left-3 top-3 max-w-[75%] truncate rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-md">
          {product.category}
        </span>
      </Link>

      {/* Content */}
      <div className="px-2 pb-2 pt-4">

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600">
            <span>★</span>

            <span>
              {product.rating?.rate?.toFixed(1) ?? "—"}
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {product.rating?.count ?? 0} reviews
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h2 className="mt-3 line-clamp-2 min-h-[48px] text-[16px] font-semibold leading-6 text-slate-900 transition-colors duration-200 hover:text-violet-600">
            {product.title}
          </h2>
        </Link>

        {/* Price + Cart */}
        <div className="mt-4 flex items-end justify-between gap-3">

          {/* Price */}
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Price
            </p>

            <p className="mt-0.5 text-[22px] font-bold tracking-tight text-slate-950">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Add To Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-violet-600 px-3.5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md active:scale-95"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H6"
              />

              <circle
                cx="10"
                cy="20"
                r="1"
              />

              <circle
                cx="18"
                cy="20"
                r="1"
              />
            </svg>

            Add
          </button>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;