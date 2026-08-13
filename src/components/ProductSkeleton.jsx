function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
      {/* Image */}
      <div className="h-64 animate-pulse rounded-[22px] bg-white/10" />

      {/* Content */}
      <div className="px-2 pb-2 pt-5">
        {/* Rating */}
        <div className="flex gap-2">
          <div className="h-7 w-14 animate-pulse rounded-full bg-white/10" />
          <div className="h-7 w-20 animate-pulse rounded bg-white/10" />
        </div>

        {/* Title */}
        <div className="mt-4 space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-white/10" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-white/10" />
        </div>

        {/* Price + Button */}
        <div className="mt-6 flex items-end justify-between gap-3">
          <div>
            <div className="h-3 w-10 animate-pulse rounded bg-white/10" />
            <div className="mt-2 h-7 w-20 animate-pulse rounded bg-white/10" />
          </div>

          <div className="h-11 w-24 animate-pulse rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export default ProductSkeleton;