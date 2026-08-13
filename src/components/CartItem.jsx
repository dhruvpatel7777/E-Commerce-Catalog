import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  const [isChanging, setIsChanging] = useState(false);

  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));

    setIsChanging(true);
  };

  const handleDecrease = () => {
    if (item.quantity <= 1) {
      return;
    }

    dispatch(decreaseQuantity(item.id));

    setIsChanging(true);
  };

  useEffect(() => {
    if (!isChanging) {
      return;
    }

    const timer = setTimeout(() => {
      setIsChanging(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [isChanging]);

  return (
    <article className="group flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-xl backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.07] sm:flex-row sm:items-center sm:p-5">

      {/* Product Image */}
      <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-2xl bg-white p-4 sm:h-24 sm:w-24">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">

        <p className="text-xs uppercase tracking-wider text-slate-500">
          {item.category}
        </p>

        <h2 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-white sm:text-base">
          {item.title}
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          ${item.price.toFixed(2)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-between gap-4 sm:justify-normal">

        <div className="flex items-center rounded-2xl border border-white/10 bg-black/20 p-1">

          {/* Decrease */}
          <button
            type="button"
            disabled={item.quantity <= 1}
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg text-slate-300 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
          >
            −
          </button>

          {/* Quantity */}
          <span
            className={`flex min-w-10 items-center justify-center text-sm font-bold text-white transition-transform duration-200 ${
              isChanging ? "scale-125" : "scale-100"
            }`}
          >
            {item.quantity}
          </span>

          {/* Increase */}
          <button
            type="button"
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg text-slate-300 transition hover:bg-white/10 hover:text-white active:scale-90"
          >
            +
          </button>

        </div>

        {/* Subtotal */}
        <div className="text-right sm:min-w-24">
          <p className="text-xs text-slate-500">
            Subtotal
          </p>

          <p className="mt-1 text-base font-bold text-white">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={() =>
          dispatch(removeFromCart(item.id))
        }
        className="self-start rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-red-400/10 hover:text-red-300 sm:self-auto"
      >
        Remove
      </button>

    </article>
  );
}

export default CartItem;