import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.09]">

      {/* Product Image */}
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          {product.category}
        </p>

        <h2 className="line-clamp-2 min-h-12 text-lg font-semibold text-white">
          {product.title}
        </h2>

        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;