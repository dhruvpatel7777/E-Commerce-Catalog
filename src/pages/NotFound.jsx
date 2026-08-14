import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-90px)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">

        {/* 404 */}
        <p className="text-sm font-bold uppercase tracking-[0.35em] text-violet-600">
          404 Error
        </p>

        <h1 className="mt-4 text-6xl font-extrabold tracking-tight text-slate-950 sm:text-7xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-slate-500 sm:text-lg">
          Sorry, the page you're looking for doesn't exist or may have
          been moved.
        </p>

        {/* Back button */}
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-600 active:scale-95"
        >
          ← Back to Products
        </Link>

      </div>
    </main>
  );
}

export default NotFound;