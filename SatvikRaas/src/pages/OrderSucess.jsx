// OrderSuccessPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import styles from "../styles/OrderSuccess.module.scss";

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Check if we have the required data
    if (
      !location.state ||
      !location.state.orderId ||
      !location.state.cartProducts
    ) {
      navigate("/"); // Redirect to home if data is missing
      return;
    }

    // Set window dimensions for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Stop confetti after 8 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [location, navigate]);

  // Early return if data is not available
  if (!location.state) {
    return null;
  }

  const { orderId, cartProducts, formData, finalTotalAmount, deliveryCharge } =
    location.state;
  // console.log(location.state);


  // copy id 
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy status after 2 sec
  };
  return (
    <div className={styles.successContainer}>
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={true}
          numberOfPieces={300}
        />
      )}

      <div className={styles.successCard}>
        <div className={styles.header}>
          <div className={styles.checkmark}>
            <svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
              <circle cx="26" cy="26" r="25" fill="none" />
              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h1>Order Successful!</h1>
        <div className={styles.orderDiv}>
        <p className={styles.orderNumber}>Order #{orderId}</p>
          <button className={styles.copyButton} onClick={handleCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-icon lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
      </button>
        </div>
      {copied && <span className={styles.copiedText}>Copied!</span>}
        </div>

        <div className={styles.deliveryInfo}>
          <h2>Delivery Information</h2>
          {formData && (
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Name:</span>
                <span>{formData.name}</span>
              </div>
             
              <div className={styles.infoItem}>
                <span className={styles.label}>Phone:</span>
                <span>{formData.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span>{formData.emailId}</span>
              </div> <div className={styles.infoItem}>
                <span className={styles.label}>Address:</span>
                <span>{formData.street}, {formData.landmark},{formData.city}</span>
              </div>
            </div>
          )}
        </div>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.productList}>
            {cartProducts &&
              cartProducts.map((product) => (
                <div key={product.id} className={styles.productItem}>
                  <div className={styles.productImage}>
                  
                    <img
                      src={`data:image/jpeg;base64,${product.mainImage}`}
                      alt={product.name}
                    
                    />
                  </div>
                  <div className={styles.productDetails}>
                    <h3>{product.name}</h3>
                    <div className={styles.productMeta}>
                      <span>Qty: {product.qty}</span>
                      <span>₹{product.price.toFixed(2)} each</span>
                    </div>
                  </div>
                  <div className={styles.productTotal}>
                    ₹{(product.price * product.qty).toFixed(2)}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className={styles.priceSummary}>
          <div className={styles.priceRow}>
            <span>Subtotal</span>
            <span>₹{(finalTotalAmount - deliveryCharge).toFixed(2)}</span>
          </div>
          <div className={styles.priceRow}>
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge.toFixed(2)}</span>
          </div>
          <hr />
          <br />
          <div className={styles.priceRow }>
            <span>Total</span>
            <span>₹{finalTotalAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.continueButton}
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
          <button
            className={styles.trackButton}
            onClick={() => navigate("/trackorder")}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
