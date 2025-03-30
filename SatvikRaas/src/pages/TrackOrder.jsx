import styles from "../styles/TrackOrder.module.scss";
import { useState } from "react";
export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const sampleOrder = {
    orderId: "2794027",
    totalShipments: 1,
    orderDate: "18 Mar, 2025",
    trackingId: "77435112580",
    currentStatus: "Delivered on 26th Mar 2025 10:23 am",
    product: {
      name: "Red Chilli Powder 500gm",
      estimatedDelivery: "Wed, 26 Mar - Thu, 27 Mar",
      image: "https://via.placeholder.com/100"
    },
    statusTimeline: [
      { status: "Order Placed", date: "22nd, Mar @ 12:02 PM" },
      { status: "Dispatched", date: "23rd, Mar @ 01:59 PM" },
      { status: "Out For Delivery", date: "26th, Mar @ 09:58 AM" },
      { status: "Delivered", date: "26th, Mar @ 10:23 AM", location: "SOLAPUR" }
    ]
  };

  const handleCheckStatus = () => {
    if (orderId === sampleOrder.orderId) {
      setOrderDetails(sampleOrder);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.orderHeader}>Track Your Order</h2>
        <div className={styles.inputGroup}>
          <input
            className={styles.input}
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
          <button className={styles.button} onClick={handleCheckStatus}>Check Status</button>
        </div>
      </div>

      {orderDetails && (
        <div className={styles.orderDetails}>
          <div className={styles.card}>
            <h3 className={styles.orderHeader}>Order ID: {orderDetails.orderId}</h3>
            <p>Total Shipments: {orderDetails.totalShipments}</p>
            <p>Order Date: {orderDetails.orderDate}</p>
            <h4 className={styles.orderHeader}>Track your Deliveries</h4>
            <p>Tracking ID: {orderDetails.trackingId}</p>
            <p className={styles.trackingStatus}>{orderDetails.currentStatus}</p>

            <div className={styles.productInfo}>
              <img src={orderDetails.product.image} alt="Product" className={styles.productImage} />
              <div>
                <p className={styles.productName}>{orderDetails.product.name}</p>
                <p className={styles.estimatedDelivery}>Estimated Delivery: {orderDetails.product.estimatedDelivery}</p>
              </div>
            </div>

            <h4 className={styles.orderHeader}>Order Status</h4>
            <div className={styles.timeline}>
              {orderDetails.statusTimeline.map((item, index) => (
                <div key={index} className={styles.timelineItem}>
                  <strong>{item.status}</strong>
                  <p>{item.date}</p>
                  {item.location && <p className={styles.location}>{item.location}</p>}
                </div>
              ))}
            </div>
           
          </div>
        </div>
      )}
    </div>
  );
}