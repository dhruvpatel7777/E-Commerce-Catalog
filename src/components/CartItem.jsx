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
    <article className="group flex flex-col gap-4 rounded-[26px] border border-white/80 bg-white/85 p-4 shadow-[0_10px_35px_rgba(71,54,120,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-[0_16px_40px_rgba(71,54,120,0.12)] sm:p-5 lg:flex-row lg:items-center">

      {/* Product Image */}
      <div className="relative flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-slate-100 bg-slate-50 p-5 sm:h-28 sm:w-28 lg:h-24 lg:w-24">

        {/* Subtle Image Glow */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-violet-200/30 blur-2xl" />

        <img
          src={item.image}
          alt={item.title}
          className="relative h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />

      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">

        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-600">
          {item.category}
        </p>

        <h2 className="mt-1 line-clamp-2 text-sm font-semibold leading-5 text-slate-900 sm:text-base">
          {item.title}
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-400">
          ${item.price.toFixed(2)} each
        </p>

      </div>

      {/* Quantity + Subtotal */}
      <div className="flex items-center justify-between gap-4 sm:justify-normal">

        {/* Quantity Controls */}
        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1">

          {/* Decrease */}
          <button
            type="button"
            disabled={item.quantity <= 1}
            onClick={handleDecrease}
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-medium text-slate-500 transition-all duration-200 hover:bg-white hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-500"
          >
            −
          </button>

          {/* Quantity */}
          <span
            className={`flex min-w-10 items-center justify-center text-sm font-bold text-slate-900 transition-transform duration-200 ${
              isChanging ? "scale-125 text-violet-600" : "scale-100"
            }`}
          >
            {item.quantity}
          </span>

          {/* Increase */}
          <button
            type="button"
            onClick={handleIncrease}
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-medium text-slate-500 transition-all duration-200 hover:bg-white hover:text-violet-600 active:scale-90"
          >
            +
          </button>

        </div>

        {/* Subtotal */}
        <div className="text-right sm:min-w-24">

          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Subtotal
          </p>

          <p className="mt-1 text-base font-bold text-slate-950">
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
        className="self-start rounded-xl px-3 py-2 text-xs font-semibold text-slate-400 transition-all duration-200 hover:bg-red-50 hover:text-red-500 lg:self-auto"
      >
        Remove
      </button>

    </article>
  );
}

export default CartItem;