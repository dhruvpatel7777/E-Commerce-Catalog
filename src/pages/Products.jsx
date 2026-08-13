import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

function Products() {
  const dispatch = useDispatch();

  const { products, isLoading, error } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showSkeleton, setShowSkeleton] = useState(true);

 useEffect(() => {
  const loadProducts = async () => {
    const startTime = Date.now();

    await dispatch(fetchProducts());

    const elapsedTime = Date.now() - startTime;
    const minimumTime = 1000;

    const remainingTime = Math.max(
      0,
      minimumTime - elapsedTime
    );

    setTimeout(() => {
      setShowSkeleton(false);
    }, remainingTime);
  };

  loadProducts();
}, [dispatch]);

  /*
    Get unique categories from API products.
  */
  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(products.map((product) => product.category)),
    ];
  }, [products]);

  /*
    Filter products.
  */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "all" ||
        product.category === category;

      const matchesPrice =
        product.price <= maxPrice;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice
      );
    });
  }, [products, search, category, maxPrice]);

  /*
    Loading state.
  */
  if (isLoading || showSkeleton) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Loading Header */}
        <section className="mb-8">
          <div className="h-4 w-24 animate-pulse rounded bg-white/10" />

          <div className="mt-4 h-12 w-72 animate-pulse rounded-xl bg-white/10" />

          <div className="mt-3 h-5 w-96 max-w-full animate-pulse rounded bg-white/10" />
        </section>

        {/* Loading Filters */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-xl">
          <div className="grid gap-5 lg:grid-cols-[1fr_220px_220px]">
            <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-12 animate-pulse rounded-2xl bg-white/10" />
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>

      </div>
    </main>
  );
}

  /*
    Error state.
  */
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="rounded-3xl border border-red-400/20 bg-red-400/10 p-8 text-center">
          <h1 className="text-xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-2 text-red-300">
            {error}
          </p>

          <button
            type="button"
            onClick={() => dispatch(fetchProducts())}
            className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <section className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-500">
            Discover
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Products
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Find something you'll love from our collection.
          </p>
        </section>

        {/* Filters */}
        <section className="mb-8 rounded-3xl border border-white/10 bg-white/[0.05] p-5 shadow-2xl backdrop-blur-xl">

          <div className="grid gap-5 lg:grid-cols-[1fr_220px_220px]">

            {/* Search */}
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
              >
                Search
              </label>

              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <path
                    strokeLinecap="round"
                    d="m20 20-4-4"
                  />
                </svg>

                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search products..."
                  className="w-full rounded-2xl border border-white/10 bg-black/20 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-white/25 focus:bg-black/30"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3.5 text-sm text-white outline-none transition focus:border-white/25"
              >
                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="bg-slate-900"
                  >
                    {item === "all"
                      ? "All Categories"
                      : item}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="price"
                  className="text-xs font-medium uppercase tracking-wider text-slate-500"
                >
                  Max Price
                </label>

                <span className="text-sm font-semibold text-white">
                  ${maxPrice}
                </span>
              </div>

              <input
                id="price"
                type="range"
                min="0"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(Number(event.target.value))
                }
                className="w-full accent-white"
              />

              <div className="mt-1 flex justify-between text-xs text-slate-600">
                <span>$0</span>
                <span>$1000</span>
              </div>
            </div>

          </div>

          {/* Filter Summary */}
          <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-white">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-white">
                {products.length}
              </span>{" "}
              products
            </p>

            {(search ||
              category !== "all" ||
              maxPrice !== 1000) && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setMaxPrice(1000);
                }}
                className="self-start rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white sm:self-auto"
              >
                Clear Filters
              </button>
            )}

          </div>
        </section>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.07] text-2xl">
              🔍
            </div>

            <h2 className="mt-5 text-2xl font-bold">
              No products found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-400">
              Try changing your search or adjusting the filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setMaxPrice(1000);
              }}
              className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default Products;