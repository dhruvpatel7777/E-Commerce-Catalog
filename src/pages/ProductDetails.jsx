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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm text-slate-400">
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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="rounded-3xl border border-red-400/20 bg-red-400/10 p-8 text-center">
          <h1 className="text-xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-red-300">
            {error}
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
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
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Product not found
          </h1>

          <p className="mt-2 text-slate-400">
            We couldn't find the product you're looking for.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Back */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          ← Back to Products
        </Link>

        {/* Product */}
        <div className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl backdrop-blur-xl sm:gap-8 sm:p-6 lg:grid-cols-2">

          {/* Image */}
          <div className="flex h-[350px] items-center justify-center rounded-3xl bg-white p-8 sm:h-[450px] sm:p-10 lg:h-[500px]">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition duration-500 hover:scale-105"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">

            {/* Category */}
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
              {product.category}
            </p>

            {/* Title */}
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-300">
                ⭐ {product.rating?.rate}
              </span>

              <span className="text-sm text-slate-500">
                ({product.rating?.count} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="mt-8 text-base leading-7 text-slate-300 sm:text-lg">
              {product.description}
            </p>

            {/* Price + Button */}
            <div className="mt-auto pt-10">

              <p className="text-sm text-slate-500">
                Price
              </p>

              <div className="mt-1 text-4xl font-bold">
                ${product.price.toFixed(2)}
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="mt-6 w-full rounded-2xl bg-white px-6 py-4 text-lg font-bold text-slate-950 transition hover:bg-slate-200 active:scale-[0.98]"
              >
                Add to Cart
              </button>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;