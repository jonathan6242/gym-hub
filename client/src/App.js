import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import Collection from "./pages/Collection";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Home from "./pages/Home";
import { useEffect } from "react";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collections/:category' element={<Collection />} />
        <Route path='/product/:id' element={<ProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/success' element={<Success />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
