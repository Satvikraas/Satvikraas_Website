import { useState, useEffect } from "react";
import styles from "../styles/TrackOrder.module.scss";
import { useProductContext } from "../context/ProductContext.jsx";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useProductContext(); // Get all products from context
  const [cartProducts, setCartProducts] = useState([]);

  // Process order items and get product details from context
  useEffect(() => {
    if (orderDetails && products && products.length > 0) {
      console.log("Products from context:", products);
      
      // Map through the order items from the API response
      const processedProducts = orderDetails.orderItems
        .map(({ productVariantId, quantity, finalPrice }) => {
          // Find the product that contains this variant
          const productWithVariant = products.find((product) => 
            product.variants && product.variants.some(variant => variant.id === productVariantId)
          );
          
          if (!productWithVariant) {
            console.log(`Product not found for variant ID: ${productVariantId}`);
            return null;
          }
          
          // Find the specific variant
          const variant = productWithVariant.variants.find(
            (v) => v.id === productVariantId
          );
          
          if (!variant) {
            console.log(`Variant not found with ID: ${productVariantId}`);
            return null;
          }
          
          // Return combined product info - matching the structure from CartPage
          // Using the mainImage from the variant, not from the product
          return {
            ...variant,
            name: productWithVariant.name,
            mainImage: variant.mainImage, // Use variant's mainImage instead of productWithVariant.mainImage
            qty: quantity,
            price: finalPrice / quantity, // Price per unit
            category: productWithVariant.category
          };
        })
        .filter(Boolean); // Remove any null entries
      
      console.log("Final processed products:", processedProducts);
      setCartProducts(processedProducts);
    }
  }, [orderDetails, products]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userorderId = urlParams.get("orderId");

    if (userorderId) {
      setOrderId(userorderId); // Set the order ID from the URL
      handleCheckStatus(userorderId); // Auto-fetch when ID is in URL
    }
  }, []); // Runs only once when the component mounts

  const handleCheckStatus = async (id = orderId) => {
    if (!id) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.satvikraas.com/api/public/getDeliveryStatus?razorpayOrderId=${id}`
      );
      const data = await response.json();
      if (data.status === 200) {
        setOrderDetails(data.data); // Store API data in state
        console.log("API response data:", data.data);
      } else {
        alert("Order not found!");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
      alert("Failed to fetch order details.");
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* Hide search box after successful API fetch */}
      {!orderDetails && (
        <div className={styles.card}>
          <h2 className={styles.orderHeader}>Track Your Order</h2>
          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button 
              className={styles.button} 
              onClick={() => handleCheckStatus()} 
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Check Status"}
            </button>
          </div>
        </div>
      )}

      {/* Show Order Details if data is available */}
      {orderDetails && (
        <div className={styles.orderDetails}>
          <div className={styles.card}>
            <div className={styles.sec1Card}>
             <div> <p>Order ID: <strong>{orderDetails.razorpayOrderId}</strong></p>
              <p>User Name: <span>{orderDetails.userName}</span></p>
              <p>Type: <span>{orderDetails.status}</span></p>
              <p>Total Amount: <span>₹{orderDetails.totalAmount.toFixed(2)}</span></p></div>
              <div className={styles.currentStatus}> <p>
    {orderDetails.deliveryStatusUpdates && orderDetails.deliveryStatusUpdates.length > 0 ? 
      orderDetails.deliveryStatusUpdates[orderDetails.deliveryStatusUpdates.length - 1].currentStatus : 
      "Processing"
    }</p>
  </div>
            </div>

            {/* Order Timeline */}
            <div className={styles.timeline}>
              <h2>Order Status</h2>
              {orderDetails.deliveryStatusUpdates.map((update, index) => (
                <div key={index} className={styles.timelineItem}>
                  <h4>{update.currentStatus}</h4>
                  <p>{new Date(update.currentTimestamp).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
                </div>
              ))}
            </div>

            {/* Product List */}
            <div className={styles.orderSummary}>
              <h2>Order Summary</h2>
              <div className={styles.productList}>
                {cartProducts && cartProducts.length > 0 ? (
                  cartProducts.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                      <div className={styles.productImage}>
                        {product.mainImage ? (
                          product.category === "COMBO" ? (
                            <img
                              src={`data:image/jpeg;base64,${product.mainImage}`}
                              alt={product.name}
                              className={styles.cartImage1}
                            />
                          ) : (
                            <img
                              src={`data:image/jpeg;base64,${product.mainImage}`}
                              alt={product.name}
                              className={styles.cartImage}
                            />
                          )
                        ) : (
                          <div className={styles.noImage}>No Image</div>
                        )}
                      </div>
                      <div className={styles.productDetails}>
                        <h3>{product.name}</h3>
                        <div className={styles.productMeta}>
                          <span>Weight: {product.weight}g</span>
                          <span>Qty: {product.qty}</span>
                          
                        </div>
                      </div>
                      <div className={styles.productTotal}>
                        ₹{(product.price * product.qty).toFixed(2)}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading product details...</p>
                )}
              </div>
              
              {/* Order Total */}
              <div className={styles.orderTotal}>
                <p><strong>Total:</strong> ₹{orderDetails.totalAmount.toFixed(2)}</p>
                {orderDetails.totalWeight && (
                  <p><strong>Total Weight:</strong> {orderDetails.totalWeight}g</p>
                )}
              </div>
              
              {/* Shipping Address */}
              {orderDetails.address && (
                <div className={styles.shippingInfo}>
                  <h3>Shipping Address</h3>
                  <p>{orderDetails.address.street}</p>
                  <p>{orderDetails.address.city}, {orderDetails.address.state} {orderDetails.address.postalCode}</p>
                  <p>{orderDetails.address.country}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}