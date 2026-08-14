import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Toast from "./components/Toast";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="app-background">

        {/* Background decoration */}
        <div
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          {/* Soft blurred glow */}
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-white/60 blur-[110px]" />

          <div className="absolute -right-40 top-[10%] h-[550px] w-[550px] rounded-full bg-violet-400/20 blur-[120px]" />

          <div className="absolute left-[30%] top-[40%] h-[500px] w-[500px] rounded-full bg-white/40 blur-[130px]" />

          <div className="absolute -bottom-40 left-[10%] h-[500px] w-[500px] rounded-full bg-indigo-400/15 blur-[120px]" />

          {/* Decorative dashed lines */}
          <div className="absolute left-[-8%] top-[18%] h-px w-[45%] rotate-[-25deg] border-t border-dashed border-violet-500/20" />

          <div className="absolute right-[-5%] top-[32%] h-px w-[38%] rotate-[28deg] border-t border-dashed border-violet-500/15" />

          <div className="absolute left-[-5%] top-[62%] h-px w-[32%] rotate-[22deg] border-t border-dashed border-violet-500/15" />

          <div className="absolute right-[-10%] top-[78%] h-px w-[45%] rotate-[-25deg] border-t border-dashed border-violet-500/20" />

          <div className="absolute left-[40%] top-[-5%] h-px w-[30%] rotate-[35deg] border-t border-dashed border-violet-500/10" />
        </div>

        {/* APPLICATION CONTAINER */}
        <div className="app-shell">

          {/* Fixed Navbar */}
          <Navbar />

          {/* ONLY THIS AREA SCROLLS */}
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Products />} />

              <Route path="/cart" element={<Cart />} />

              <Route
                path="/product/:id"
                element={<ProductDetails />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

        </div>

        {/* Toast */}
        <Toast />

      </div>
    </BrowserRouter>
  );
}

export default App;