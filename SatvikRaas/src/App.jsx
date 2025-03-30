import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { CartProvider } from "./context/CartProvider.jsx";
// import { AuthProvider } from "./context/AuthProvider";
import MessageAlert from "./components/MessageAlert";
import { useEffect, useState } from "react";
import Preloader from "./components/Preloader.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import CartPage from "./pages/Cart.jsx";

// new VConsole();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 0);
  }, []);
 
  return (
    <>
      {" "}
      <BrowserRouter>
        {/* <AuthProvider> */}
        <CartProvider>
          <MessageAlert />
          {loading ? (
            <Preloader />
          ) : (
            <CartProvider>
              <ProductProvider>
                {/* <Navbar /> */}

                <CartPage />
                <Router />
                {/* <Footer /> */}
              </ProductProvider>
            </CartProvider>
          )}
        </CartProvider>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </>
  );
};

export default App;
