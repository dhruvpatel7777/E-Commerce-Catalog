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
    <article className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">

      {/* Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl transition duration-500 group-hover:bg-white/[0.08]" />

      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative block overflow-hidden rounded-[22px] bg-white"
      >
        <div className="flex h-64 items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
          />
        </div>

        {/* Category Badge */}
        <span className="absolute left-3 top-3 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur">
          {product.category}
        </span>
      </Link>

      {/* Content */}
      <div className="px-2 pb-2 pt-5">

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-300">
            <span>★</span>
            <span>
              {product.rating?.rate?.toFixed(1) ?? "—"}
            </span>
          </div>

          <span className="text-xs text-slate-500">
            {product.rating?.count ?? 0} reviews
          </span>
        </div>

        {/* Title */}
        <Link to={`/product/${product.id}`}>
          <h2 className="mt-3 line-clamp-2 min-h-[52px] text-[17px] font-semibold leading-6 text-white transition-colors hover:text-slate-300">
            {product.title}
          </h2>
        </Link>

        {/* Price + Cart */}
        <div className="mt-5 flex items-center justify-between gap-3">

          <div>
            <p className="text-xs text-slate-500">
              Price
            </p>

            <p className="mt-0.5 text-2xl font-bold tracking-tight text-white">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-lg transition-all duration-200 hover:bg-slate-200 active:scale-95"
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