import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import LandingPage from "./Pages/LandingScreen/LandingPage";
import LoginPage from "./Pages/User/Login.jsx"
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
import Blankpage from "./Pages/White.jsx";
export default function App() {
  return (
    <div className="App">

      <Blankpage/>
    {/* <Router>
    
      <main>
        <Navbar/>  
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/productdetail" element={<Productdetail />} />
            <Route path="/adminDashBoard" element={<Dashboard/>}/>
            <Route path="/cart" element={<ShoppingCart />} />  
            <Route path="/checkout" element={<CheckoutPage />} />      
            <Route path="/checkout1" element={<Checkout />} />      
            <Route path="/contact" element={<ContactUs />} />      
        </Routes>
        <Footer/>
      </main>
      
    </Router> */}
    </div>
  );
}
