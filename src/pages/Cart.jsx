import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /*
    Empty Cart
  */
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-transparent px-4 py-10 text-slate-900 sm:px-6 lg:px-8">

        <div className="w-full max-w-lg rounded-[32px] border border-white/80 bg-white/85 p-8 text-center shadow-[0_18px_60px_rgba(71,54,120,0.10)] backdrop-blur-xl sm:p-12">

          {/* Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] bg-violet-50 text-3xl shadow-sm">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-950">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Looks like you haven't added anything to your cart yet.
            Explore our products and find something you'll love.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            Start Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="bg-transparent px-4 py-8 text-slate-900 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
              Shopping Cart
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Your Cart
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {/* Clear Cart */}
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="self-start rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-500 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-auto"
          >
            Clear Cart
          </button>

        </div>

        {/* Main Layout */}
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* Cart Items */}
          <section className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}
          </section>

          {/* Order Summary */}
          <aside className="h-fit rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-[0_18px_55px_rgba(71,54,120,0.10)] backdrop-blur-xl sm:p-6 lg:sticky lg:top-24">

            {/* Heading */}
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
              Order Summary
            </p>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              Checkout
            </h2>

            <div className="my-6 h-px bg-slate-200" />

            {/* Summary Details */}
            <div className="space-y-4">

              {/* Items */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Items
                </span>

                <span className="font-semibold text-slate-900">
                  {totalItems}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Subtotal
                </span>

                <span className="font-semibold text-slate-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Shipping
                </span>

                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                  Free
                </span>
              </div>

            </div>

            <div className="my-6 h-px bg-slate-200" />

            {/* Total */}
            <div className="flex items-center justify-between">

              <span className="text-lg font-semibold text-slate-800">
                Total
              </span>

              <span className="text-2xl font-bold tracking-tight text-slate-950">
                ${totalPrice.toFixed(2)}
              </span>

            </div>

            {/* Checkout */}
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/25 active:translate-y-0 active:scale-[0.98]"
            >
              Proceed to Checkout

              <span className="text-base">
                →
              </span>
            </button>

            {/* Security */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>🔒</span>

              <span>
                Secure checkout · Free shipping
              </span>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;