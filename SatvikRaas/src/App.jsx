import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./Pages/LandingScreen/LandingPage";
import LoginPage from "./Pages/User/Login.jsx";
import SignupPage from "./Pages/User/SignUp.jsx";
import AllProducts from "./Pages/Products/AllProducts.jsx";
import ShoppingCart from "./Pages/Products/Cart.jsx";
import Productdetail from "./Pages/Products/Productdetail.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Navbar from "./Pages/Header/Navbar.jsx";
import CheckoutPage from "./Pages/Products/Checkout.jsx";
import Checkout from "./Pages/CheckOut/Checkout.jsx";
import Footer from "./Pages/Header/Footer.jsx";
import ContactUs from "./Pages/Extra/ContactUs.jsx";
import Aboutpage from "./Pages/Aboutus.jsx";
import TermsService from "./Pages/TermsService.jsx";
import ShippingPolicy from "./Pages/ShippingPolicy.jsx";
import RefundPolicy from "./Pages/RefundPolicy.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import Order from "./Pages/Order/OrderPage.jsx"
import ScrollToTop from "../src/Pages/ScrollToTop.jsx";  import { ToastContainer } from 'react-toastify';
// import Blankpage from "./Pages/White.jsx";TermsService ShippingPolicy RefundPolicy
export default function App() {
  return (
    <div className="App">
      <Router>
        {/* Ensures the page scrolls to the top on navigation */}
        <ScrollToTop /> 

        {/* Navigation bar displayed across all pages */}
        <Navbar />

        {/* Main content area */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/productdetail" element={<Productdetail />} />
            <Route path="/adminDashBoard" element={<Dashboard />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/orders" element={<Order/>} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/checkout1" element={<Checkout />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/terms-conditions" element={<TermsService />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>

        {/* Footer displayed across all pages */}
        <Footer />
      </Router>  <ToastContainer />
    </div>
  );
}