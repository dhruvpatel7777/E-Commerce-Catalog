import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Toast from "./components/Toast";


function App() {
  return (
    <>
    
    <BrowserRouter>
     <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-white">

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.035] blur-3xl" />

        <div className="absolute -left-40 top-[35%] h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-3xl" />

        <div className="absolute -right-40 top-[65%] h-[450px] w-[450px] rounded-full bg-white/[0.02] blur-3xl" />

      </div>
      <Navbar />

      <Toast />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />
      </Routes>
      </div>
    </BrowserRouter>
    
    </>
  );
}
export default App;
