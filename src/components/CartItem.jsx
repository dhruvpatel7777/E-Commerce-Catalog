import { useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const subtotal = item.price * item.quantity;

  return (
    <div className="group flex flex-col gap-5 rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.07] sm:flex-row sm:items-center">

      {/* Product Image */}
      <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-white p-4">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
          {item.category}
        </p>

        <h2 className="line-clamp-2 text-base font-semibold text-white">
          {item.title}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => dispatch(decreaseQuantity(item.id))}
          disabled={item.quantity === 1}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lg text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>

        <span className="flex h-9 min-w-9 items-center justify-center rounded-xl bg-white/[0.08] px-3 text-sm font-semibold text-white">
          {item.quantity}
        </span>

        <button
          type="button"
          onClick={() => dispatch(increaseQuantity(item.id))}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-lg text-white transition hover:bg-white/10"
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="min-w-24 text-left sm:text-right">
        <p className="text-xs text-slate-500">
          Subtotal
        </p>

        <p className="mt-1 text-lg font-bold text-white">
          ${subtotal.toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() => dispatch(removeFromCart(item.id))}
        className="rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-2 text-sm font-medium text-red-300 transition hover:border-red-400/20 hover:bg-red-400/10"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;