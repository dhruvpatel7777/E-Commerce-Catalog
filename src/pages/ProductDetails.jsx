import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/cartSlice";
import { fetchProducts } from "../redux/productSlice";
import { showNotification } from "../redux/notificationSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    products,
    isLoading,
    error,
  } = useSelector((state) => state.products);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  /*
    If products are not already available,
    fetch them when this page loads.
  */
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    dispatch(showNotification(product.title));
  };

  /*
    Loading
  */
  if (isLoading || products.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-transparent px-4 text-slate-900">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading product...
          </p>

        </div>
      </main>
    );
  }

  /*
    Error
  */
  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-transparent px-4 text-slate-900">
        <div className="w-full max-w-md rounded-[28px] border border-red-200 bg-white/90 p-8 text-center shadow-[0_12px_40px_rgba(71,54,120,0.08)] backdrop-blur-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-950">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm leading-6 text-red-500">
            {error}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800"
          >
            Back to Products
          </Link>

        </div>
      </main>
    );
  }

  /*
    Product doesn't exist
  */
  if (!product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-transparent px-4 text-slate-900">
        <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white/90 p-8 text-center shadow-[0_12px_40px_rgba(71,54,120,0.08)] backdrop-blur-xl">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-2xl">
            🔍
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-950">
            Product not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't find the product you're looking for.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-slate-800"
          >
            Back to Products
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="bg-transparent px-4 py-8 text-slate-900 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-[1400px]">

        {/* Back Navigation */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition-all duration-200 hover:bg-white/70 hover:text-slate-950"
        >
          <span className="text-lg leading-none">
            ←
          </span>

          Back to Products
        </Link>

        {/* Product Container */}
        <div className="overflow-hidden rounded-[32px] border border-white/80 bg-white/85 p-4 shadow-[0_18px_60px_rgba(71,54,120,0.10)] backdrop-blur-xl sm:p-6 lg:p-8">

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">

            {/* Product Image Section */}
            <div className="relative overflow-hidden rounded-[28px] border border-slate-100 bg-slate-50">

              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-200/30 blur-3xl" />

              <div className="flex h-[360px] items-center justify-center p-8 sm:h-[460px] sm:p-10 lg:h-[540px]">

                <img
                  src={product.image}
                  alt={product.title}
                  className="relative max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                />

              </div>

              {/* Category Badge */}
              <div className="absolute left-5 top-5 rounded-full border border-white/80 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700 shadow-sm backdrop-blur-md">
                {product.category}
              </div>

            </div>

            {/* Product Details */}
            <div className="flex flex-col px-1 py-2 sm:px-2 lg:py-4">

              {/* Category */}
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-600">
                {product.category}
              </p>

              {/* Title */}
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[42px]">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-600">
                  <span>
                    ★
                  </span>

                  <span>
                    {product.rating?.rate?.toFixed(1) ?? "—"}
                  </span>
                </div>

                <span className="text-sm font-medium text-slate-400">
                  {product.rating?.count ?? 0} reviews
                </span>

              </div>

              {/* Divider */}
              <div className="my-7 h-px bg-slate-200" />

              {/* Description */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  About this product
                </p>

                <p className="text-[15px] leading-7 text-slate-500 sm:text-base">
                  {product.description}
                </p>
              </div>

              {/* Price + Button */}
              <div className="mt-auto pt-8">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                  {/* Price */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                      Price
                    </p>

                    <p className="mt-1 text-4xl font-bold tracking-tight text-slate-950">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-7 py-4 text-sm font-bold text-white shadow-md shadow-violet-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-600/25 active:translate-y-0 active:scale-[0.98] sm:min-w-[190px]"
                  >

                    <svg
                      className="h-5 w-5"
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

                    Add to Cart

                  </button>

                </div>

              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;