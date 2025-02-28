import React, { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import api from "../../api.jsx";
import img from "../../Assets/Images/orderimg.png";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const getAccessToken = () => sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const accessToken = getAccessToken();
      if (!accessToken) return;

      const response = await api.get("/api/user/getAllOrdersOfUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data?.data) {
        setOrders(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className={styles.OrderPage}>
     
        <div className={styles.OrderDiv}>
          <h1>Your Orders</h1>
          {loading ? (
        <div >
        <div className="order-card skeleton-loading skeleton-card">
        <div className="upcard">
          <div className="skeleton-box skeleton-text order-id"></div>
          <div className="skeleton-box skeleton-text order-date"></div>
        </div>
        <div className="bottomCard">
          <div className="skeleton-box skeleton-image"></div>
          <div className="info">
            <div className="skeleton-box skeleton-text total-amount"></div>
            <div className="skeleton-box skeleton-text order-items"></div>
          </div>
          <div className="btnDiv">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div> <div className="order-card skeleton-loading skeleton-card">
        <div className="upcard">
          <div className="skeleton-box skeleton-text order-id"></div>
          <div className="skeleton-box skeleton-text order-date"></div>
        </div>
        <div className="bottomCard">
          <div className="skeleton-box skeleton-image"></div>
          <div className="info">
            <div className="skeleton-box skeleton-text total-amount"></div>
            <div className="skeleton-box skeleton-text order-items"></div>
          </div>
          <div className="btnDiv">
            <div className="skeleton-button"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      </div>
      </div>
      ) : (
          <div className={styles.OrderCards}>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={order._id || index} className={styles.OrderCard}>
                  <div className={styles.upcard}>
                    <h2 className={styles.orderId}>
                      Order Id: <span>{order.razorpayOrderId}</span>
                    </h2>
                    <p>
                      Order Date:{" "}
                      {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className={styles.bottomCard}>
                    <img
                      src={
                        order.orderItems?.[0]?.productVariant?.mainImage
                          ? `data:image/jpeg;base64,${order.orderItems[0].productVariant.mainImage}`
                          : img
                      }
                      alt="Product"
                    />
                    <div className={styles.info}>
                      <p className={styles.totalamt}>
                        Total Amount:<span> ₹{order.totalAmount}/-</span>
                      </p>
                      <p className={styles.orderName}>
                        Order Items:{" "}
                        {order.orderItems?.length > 0
                          ? order.orderItems.map((item, index) => (
                              <span key={index}>
                                {item.productVariant?.productName}
                                {index < order.orderItems.length - 1
                                  ? ", "
                                  : "."}
                              </span>
                            ))
                          : "No items available."}
                      </p>
                    </div>
                    <div className={styles.btnDiv}>
                      <button
                        className={styles.viewBtn}
                        onClick={() => openModal(order)}
                      >
                        View Product
                      </button>
                      <button className={styles.trackBtn}>Track Package</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>  )}
        </div>
    
      {/* Modal Popup */}
      {showModal && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.header}>
              <h2>Product Details</h2>
              <button className={styles.closeBtn} onClick={closeModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <rect width="32" height="32" rx="16" fill="white" />
                  <path
                    d="M8.18565 9.08237C7.93812 8.83484 7.93812 8.4334 8.18565 8.18574C8.43318 7.93809 8.83461 7.93809 9.08227 8.18574L15.9999 15.1034L22.9176 8.18574C23.1651 7.93809 23.5666 7.93809 23.8144 8.18574C24.0619 8.43327 24.0619 8.83484 23.8144 9.08237L16.8964 15.9999L23.8142 22.9176C24.0618 23.1652 24.0618 23.5666 23.8142 23.8143C23.5666 24.0619 23.1651 24.0619 22.9175 23.8143L15.9998 16.8966L9.08227 23.8143C8.83474 24.0619 8.43331 24.0619 8.18565 23.8143C7.93812 23.5667 7.93812 23.1653 8.18565 22.9176L15.1033 15.9999L8.18565 9.08237Z"
                    fill="#333434"
                  />
                </svg>
              </button>
            </div>

            <div className={styles.productSection}>
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className={styles.productRow}>
                  <div className={styles.productInfo}>
                    <img
                      src={`data:image/jpeg;base64,${item.productVariant?.mainImage}`}
                      alt={item.productVariant?.productName}
                      className={styles.productImg}
                    />
                    <div className={styles.productDetails}>
                      <p className={styles.productName}>
                        {item.productVariant?.productName}
                      </p><p className={styles.quantity}>
                        Weight: <span>{item.productVariant.weight} </span>
                      </p>
                      <p className={styles.quantity}>
                        Quantity: <span>{item.quantity} </span>
                      </p> 
                      <p className={styles.price}> Item Price:
                        ₹{item.productVariant?.price || 0}
                      </p>
                    </div>
                  </div>
                  <div className={styles.orderStatus}>  <p>
                      Order Date:{" "}
                      {new Date(selectedOrder.createdAt).toLocaleDateString("en-GB")}
                    </p>
                    <p>Order ID: {selectedOrder.razorpayOrderId}</p>
                    <p className={styles.status}>
                      Status:{" "}
                      <span className={styles.cancelled}>
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.priceSection}>
              <h3>Price Details ({selectedOrder.orderItems.length} Items)</h3>
              <div className={styles.priceDetails}>
                {/* <div className={styles.priceRow}>
                  <span>Total Product Price</span>
                  <span>₹{selectedOrder.totalProductPrice || 0}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Payment Charge</span>
                  <span>₹{selectedOrder.paymentCharge || 0}</span>
                </div>
                <div className={styles.priceRow}>
                  <span>Courier Charges</span>
                  <span>₹{selectedOrder.courierCharges || 0}</span>
                </div> */}
                <div className={styles.priceRow}>
                  <span className={styles.totalOrder}>Total Order</span>
                  <span className={styles.totalAmount}>
                    ₹{selectedOrder.totalAmount || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
