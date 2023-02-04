import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About/About";
import Admin from "./components/Admin/Admin";
import Cart from "./components/Cart/Cart";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Completed from "./components/OrderCompleted/Completed";
import PlaceOrder from "./components/PlaceOrder/PlaceOrder";
import ProductDetail from "./components/Product/ProductDetail";
import Product from "./components/ProductPage/Product";
import Profile from "./components/Profile/Profile";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import ScrollToTop from "./utils/ScrollToTop";

export default function AppRouting() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productDetail/:slug" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<Product />} />
        <Route path="/orderCompleted" element={<Completed />} />
        <Route path="/adminDashboard/*" element={<Admin />} />
      </Routes>
    </>
  );
}
