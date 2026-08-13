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

  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="flex min-h-[60vh] items-center justify-center px-4">
  <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/[0.05] p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">

    {/* Icon */}
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/[0.07] text-3xl">
      🛒
    </div>

    <h1 className="mt-6 text-3xl font-bold text-white">
      Your cart is empty
    </h1>

    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-400">
      Looks like you haven't added anything to your cart yet.
      Explore our products and find something you'll love.
    </p>

    <Link
      to="/"
      className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-200 active:scale-95"
    >
      Start Shopping
    </Link>

  </div>
</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
              Shopping Cart
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              Your Cart
            </h1>

            <p className="mt-2 text-slate-400">
              {totalItems}{" "}
              {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="self-start rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-red-400/20 hover:bg-red-400/10 hover:text-red-300 sm:self-auto"
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
         <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl sm:p-6 lg:sticky lg:top-24">

            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Order Summary
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Checkout
            </h2>

            <div className="my-6 h-px bg-white/10" />

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Items
                </span>

                <span className="font-medium text-white">
                  {totalItems}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Subtotal
                </span>

                <span className="font-medium text-white">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Shipping
                </span>

                <span className="font-medium text-emerald-400">
                  Free
                </span>
              </div>
            </div>

            <div className="my-6 h-px bg-white/10" />

            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">
                Total
              </span>

              <span className="text-2xl font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-2xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-slate-200 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>

            <p className="mt-4 text-center text-xs text-slate-500">
              Secure checkout · Free shipping
            </p>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;