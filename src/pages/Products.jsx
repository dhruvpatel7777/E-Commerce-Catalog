import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";

function Products() {
  const dispatch = useDispatch();

  const {
    products,
    isLoading,
    error,
  } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showSkeleton, setShowSkeleton] = useState(true);

  /*
    Fetch products
  */
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
    Get unique categories
  */
  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        products.map((product) => product.category)
      ),
    ];
  }, [products]);

  /*
    Filter products
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
  }, [
    products,
    search,
    category,
    maxPrice,
  ]);

  /*
    Loading state
  */
  if (isLoading || showSkeleton) {
    return (
      <main className="bg-transparent px-4 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-[1280px]">

          {/* Loading Header */}
          <section className="mb-6">
            <div className="h-3.5 w-24 animate-pulse rounded bg-slate-300/60" />

            <div className="mt-3 h-10 w-64 max-w-full animate-pulse rounded-xl bg-slate-300/60" />

            <div className="mt-2 h-4 w-80 max-w-full animate-pulse rounded bg-slate-300/50" />
          </section>

          {/* Loading Filters */}
          <div className="mb-6 rounded-[24px] border border-white/80 bg-white/85 p-4 shadow-[0_10px_35px_rgba(71,54,120,0.08)] backdrop-blur-xl sm:p-5">

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_210px_210px]">

              <div className="h-11 animate-pulse rounded-xl bg-slate-200/80" />

              <div className="h-11 animate-pulse rounded-xl bg-slate-200/80" />

              <div className="h-11 animate-pulse rounded-xl bg-slate-200/80" />

            </div>

          </div>

          {/* Skeleton Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>

        </div>
      </main>
    );
  }

  /*
    Error state
  */
  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-transparent px-4 text-slate-900">
        <div className="w-full max-w-md rounded-3xl border border-red-200 bg-white/85 p-8 text-center shadow-xl backdrop-blur-xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-xl">
            !
          </div>

          <h1 className="mt-5 text-xl font-bold text-slate-950">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm leading-6 text-red-500">
            {error}
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="bg-transparent px-4 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-8">

      <div className="mx-auto w-full max-w-[1280px]">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <section className="mb-6">

          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-violet-600 sm:text-xs">
            Discover
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Explore Products
          </h1>

          <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
            Find something you'll love from our collection.
          </p>

        </section>


        {/* =====================================================
            FILTER CONTAINER
        ====================================================== */}
        <section
          className="
            mb-7
            rounded-[24px]
            border border-white/80
            bg-white/85
            p-4
            shadow-[0_10px_35px_rgba(71,54,120,0.08)]
            backdrop-blur-xl
            sm:p-5
          "
        >

          {/* Filters */}
          <div
            className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
              lg:grid-cols-[minmax(0,1fr)_210px_210px]
            "
          >

            {/* =================================================
                SEARCH
            ================================================== */}
            <div className="min-w-0">

              <label
                htmlFor="search"
                className="
                  mb-1.5
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-slate-500
                "
              >
                Search
              </label>

              <div className="relative">

                <svg
                  className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    h-[18px]
                    w-[18px]
                    -translate-y-1/2
                    text-slate-400
                  "
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
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50/80
                    py-3
                    pl-11
                    pr-4
                    text-sm
                    text-slate-800
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-violet-300
                    focus:bg-white
                    focus:ring-2
                    focus:ring-violet-100
                  "
                />

              </div>

            </div>


            {/* =================================================
                CATEGORY
            ================================================== */}
            <div className="min-w-0">

              <label
                htmlFor="category"
                className="
                  mb-1.5
                  block
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-slate-500
                "
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50/80
                  px-3.5
                  py-3
                  text-sm
                  text-slate-700
                  outline-none
                  transition
                  focus:border-violet-300
                  focus:bg-white
                  focus:ring-2
                  focus:ring-violet-100
                "
              >

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "all"
                      ? "All Categories"
                      : item}
                  </option>
                ))}

              </select>

            </div>


            {/* =================================================
                MAX PRICE
            ================================================== */}
            <div className="min-w-0">

              <div className="mb-2 flex items-center justify-between">

                <label
                  htmlFor="price"
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-slate-500
                  "
                >
                  Max Price
                </label>

                <span className="text-sm font-bold text-slate-900">
                  ${maxPrice}
                </span>

              </div>

             <input
  type="range"
  min="0"
  max="1000"
  value={maxPrice}
  onChange={(e) => setMaxPrice(Number(e.target.value))}
  className="
    h-1.5
    w-full
    cursor-pointer
    appearance-none
    rounded-full
  "
  style={{
    background: `linear-gradient(
      to right,
      #7c3aed 0%,
      #7c3aed ${(maxPrice / 1000) * 100}%,
      #e2e8f0 ${(maxPrice / 1000) * 100}%,
      #e2e8f0 100%
    )`,
  }}
/>

              <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                <span>$0</span>
                <span>$1000</span>
              </div>

            </div>

          </div>


          {/* =================================================
              FILTER SUMMARY
          ================================================== */}
          <div
            className="
              mt-4
              flex
              flex-col
              gap-3
              border-t
              border-slate-200
              pt-4
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <p className="text-sm text-slate-500">

              Showing{" "}

              <span className="font-bold text-slate-900">
                {filteredProducts.length}
              </span>{" "}

              of{" "}

              <span className="font-bold text-slate-900">
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
                className="
                  self-start
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-3.5
                  py-2
                  text-xs
                  font-semibold
                  text-slate-600
                  shadow-sm
                  transition
                  hover:border-violet-200
                  hover:bg-violet-50
                  hover:text-violet-700
                  sm:self-auto
                "
              >
                Clear Filters
              </button>

            )}

          </div>

        </section>


        {/* =====================================================
            EMPTY STATE
        ====================================================== */}
        {filteredProducts.length === 0 ? (

          <div
            className="
              rounded-[24px]
              border
              border-white/80
              bg-white/75
              px-6
              py-14
              text-center
              shadow-[0_10px_35px_rgba(71,54,120,0.06)]
              backdrop-blur-xl
            "
          >

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-xl">
              🔍
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950 sm:text-2xl">
              No products found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try changing your search or adjusting the filters.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("all");
                setMaxPrice(1000);
              }}
              className="
                mt-5
                rounded-xl
                bg-slate-950
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition
                hover:bg-violet-700
                active:scale-95
              "
            >
              Reset Filters
            </button>

          </div>

        ) : (

          /* =================================================
             PRODUCT GRID
          ================================================== */
          <div
            className="
              grid
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >

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