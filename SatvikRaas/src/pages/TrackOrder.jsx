// import styles from "../styles/TrackOrder.module.scss";
// import { useState } from "react";
// export default function TrackOrder() {
//   const [orderId, setOrderId] = useState("");
//   const [orderDetails, setOrderDetails] = useState(null);

//   const sampleOrder = {
//     orderId: "1",
//     totalShipments: 1,
//     orderDate: "18 Mar, 2025",
//     trackingId: "77435112580",
//     currentStatus: "Delivered on 26th Mar 2025 10:23 am",
//    products:{
//     name: "Red Chilli Powder 500gm",
//     estimatedDelivery: "Wed, 26 Mar - Thu, 27 Mar",
//     image: "https://via.placeholder.com/100",
//   },
//     statusTimeline: [
//       { status: "Order Placed", date: "22nd, Mar @ 12:02 PM" },
//       { status: "Dispatched", date: "23rd, Mar @ 01:59 PM" },
//       { status: "Out For Delivery", date: "26th, Mar @ 09:58 AM" },
//       { status: "Delivered", date: "26th, Mar @ 10:23 AM", location: "SOLAPUR" }
//     ]
//   };const product = [
//     {
//       name: "Red Chilli Powder 500gm",
//       estimatedDelivery: "Wed, 26 Mar - Thu, 27 Mar",
//       image: "https://via.placeholder.com/100",
//     },
//     {
//       name: "Red Chilli Powder 500gm",
//       estimatedDelivery: "Wed, 26 Mar - Thu, 27 Mar",
//       image: "https://via.placeholder.com/100",
//     },
//   ];
  
//   const handleCheckStatus = () => {
//     if (orderId === sampleOrder.orderId) {
//       setOrderDetails(sampleOrder);
//     }
//   };

//   const products = [
//     {
//       id: 1,
//       name: "Coriander Powder",
//       qty: 2,
//       price: 45.0,
//       mainImage: "BASE64_ENCODED_STRING_HERE",
//     },
//     {
//       id: 2,
//       name: "Red Chilli Powder",
//       qty: 1,
//       price: 60.0,
//       mainImage: "BASE64_ENCODED_STRING_HERE",
//     },
//     {
//       id: 3,
//       name: "Turmeric Powder",
//       qty: 3,
//       price: 30.0,
//       mainImage: "BASE64_ENCODED_STRING_HERE",
//     },
//   ];
  
  
//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h2 className={styles.orderHeader}>Track Your Order</h2>
//         <div className={styles.inputGroup}>
//           <input
//             className={styles.input}
//             placeholder="Enter Order ID"
//             value={orderId}
//             onChange={(e) => setOrderId(e.target.value)}
//           />
//           <button className={styles.button} onClick={handleCheckStatus}>Check Status</button>
//         </div>
//       </div>

//       {orderDetails && (
     
//           <div className={styles.orderDetails}>
//             <div className={styles.card}>
//             <div className={styles.sec1Card}>
//             <h3 className={styles.orderHeader}>Order ID: <span> {orderDetails.orderId}</span></h3>
//               <p>Total Shipments: <span>{orderDetails.totalShipments}</span></p>
//               <p>Order Date: <span>{orderDetails.orderDate}</span></p>
//             </div>
      
//              <div className={styles.sec2}>
//              <h4 className={styles.orderHeader}>Track your Deliveries</h4>
//               <p>Tracking ID: <strong>{orderDetails.trackingId}</strong></p>
//               <p className={styles.trackingStatus}>{orderDetails.currentStatus}</p>
//              </div>
      
//              <div className={styles.productList}>
//   {products.map((product) => (
//     <div key={product.id} className={styles.productItem}>
//       <div className={styles.productImage}>
//         <img
//           src={`data:image/jpeg;base64,${product.mainImage}`}
//           alt={product.name}
//         />
//       </div>
//       <div className={styles.productDetails}>
//         <h3>{product.name}</h3>
//         <div className={styles.productMeta}>
//           <span>Qty: {product.qty}</span>
//           <span>₹{product.price.toFixed(2)} each</span>
//         </div>
//       </div>
//       <div className={styles.productTotal}>
//         ₹{(product.price * product.qty).toFixed(2)}
//       </div>
//     </div>
//   ))}
// </div>

//         {/* <div className={styles.productInfo}>
//           <img src={orderDetails.products.image} alt="Product" className={styles.productImage} />
//           <div>
//             <p className={styles.productName}>{orderDetails.products.name}</p>
//             <p className={styles.estimatedDelivery}>Estimated Delivery: {orderDetails.products.estimatedDelivery}</p>
//           </div>
//         </div> */}
              
      
//               {/* <a href="#" className={styles.trackButton}>Track Order in Detail</a> */}
//             </div>
//           </div>
       
    
      
//       )}
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import styles from "../styles/TrackOrder.module.scss";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userorderId = urlParams.get("orderId");

    if (userorderId) {
      setOrderId(userorderId); // Set the order ID from the URL
    }
  }, []); // Runs only once when the component mounts

  const handleCheckStatus = async () => {
    if (!orderId) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.satvikraas.com/api/public/getDeliveryStatus?razorpayOrderId=${orderId}`
      );
      const data = await response.json();
      if (data.status === 200) {
        setOrderDetails(data.data); // Store API data in state
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
            <button className={styles.button} onClick={handleCheckStatus} disabled={isLoading}>
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
               <p> Order ID: <strong>{orderDetails.razorpayOrderId}</strong></p>
              <p>User Name: <span>{orderDetails.userName}</span></p>
            </div>

            <div className={styles.sec2}>
              <h4 className={styles.orderHeader}> Delivery Status  </h4>
              {/* <p>Razorpay Order ID: <strong>{orderDetails.razorpayOrderId}</strong></p> */}
              <p className={styles.trackingStatus}>{orderDetails.deliveryStatusUpdates.slice(-1)[0]?.currentStatus}</p>
            </div>

            {/* Order Timeline */}
            <div className={styles.timeline}>
              {orderDetails.deliveryStatusUpdates.map((update) => (
                <div key={update.id} className={styles.timelineItem}>
                  <strong>{update.currentStatus}</strong>
                  <p>{update.currentTimestamp}</p>
                </div>
              ))}
            </div>

            {/* Product List */}
            <div className={styles.productList}>
              
              {orderDetails.orderItems.map((item) => (
                <div key={item.orderItemId} className={styles.productItem}>
                  <div className={styles.productDetails}>
                    <h3>Product ID: {item.productVariantId}</h3>
                    <div className={styles.productMeta}>
                      <span>Qty: {item.quantity}</span>
                      <span>₹{item.priceAtOrder.toFixed(2)} each</span>
                    </div>
                  </div>
                  <div className={styles.productTotal}>
                    ₹{(item.priceAtOrder * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
