import React, { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import api from "../../api.jsx";
import img from "../../Assets/Images/orderimg.png";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for selected order
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const getAccessToken = () => sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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
                  <img src={img} alt="Product" />
                  <div className={styles.info}>
                    <p className={styles.totalamt}>
                      Total Amount: ₹{order.totalAmount}/-
                    </p>
                    <p className={styles.orderName}>
                      Order Items:{" "}
                      {order.orderItems?.length > 0
                        ? order.orderItems.map((item, index) => (
                            <span key={index}>
                              {item.productVariant?.productName}
                              {index < order.orderItems.length - 1 ? ", " : "."}
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
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={closeModal}>
              ✖
            </button>
            <h2>Order Details</h2>
            <div className={styles.modalContent}>
              {selectedOrder.orderItems.map((item, index) => (
                <div key={index} className={styles.productRow}>
                  <img
                    src={`data:image/jpeg;base64,${item.productVariant?.mainImage}`}
                    alt="Product"
                    className={styles.productImg}
                  />
                  <p className={styles.productName}>
                    {item.productVariant?.productName}
                  </p>
                  <p className={styles.productQty}>Qty: {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
