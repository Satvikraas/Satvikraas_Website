import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Checkout1 from "../pages/Checkout1";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer"; 
import Aboutus from "../pages/About.jsx"
import Contact from "../pages/ContactUs"
import OrderSucess from "../pages/OrderSucess"
import TermsCondition from "../pages/Terms/TermsCondition"
import RefundPolicy from "../pages/Terms/RefundPolicy"
import PrivacyPolicy from "../pages/Terms/PrivacyPolicy"
import ShipingPolicy from "../pages/Terms/ShippingPolicy"
 import { useLocation } from "react-router-dom";
import ProductDetailPage from "../pages/ProductDetail";
import TrackOrder from "../pages/TrackOrder";

const RouterComponent = () => {
  const location = useLocation(); 
  return (
    <>
      {/* {location.pathname !== "/checkout" && <Navbar />} */}
      {!["/checkout", "/ordersuccess"].includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout1" element={<Checkout1 />} />
     
        <Route path="/productdetail" element={<ProductDetailPage />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/ordersuccess" element={<OrderSucess />} />

        {/* Extra Pages  */}
        <Route path="/about" element={<Aboutus/>} />
        <Route path="/contact" element={<Contact />} />

{/* terms Pages */}
<Route path="/terms-conditions" element={<TermsCondition />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/shipping-policy" element={<ShipingPolicy />} />

      </Routes>{" "}
      {location.pathname !== "/checkout" && <Footer />}{" "}
    </>
  );
};

export default RouterComponent;
