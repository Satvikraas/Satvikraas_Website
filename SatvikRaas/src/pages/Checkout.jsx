import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartProvider";
import { useProductContext } from "../context/ProductContext.jsx";
import styles from "../styles/CheckoutPage.module.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import api from "../api/apiService.js"
import backbtn from "../assets/Images/back-button.png";
const api = axios.create({
  // baseURL: "http://localhost:8080"
  // baseURL: "https://15.207.46.61:443",
  baseURL: "https://api.satvikraas.com:443",
  // baseURL: "http://localhost:8080",
  // , // Backend URL
  withCredentials: true, // Allows cookies to be sent
  headers: {
    "Content-Type": "application/json", // JSON requests
  },
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302; // Accepts 302 as valid
  },
});
const CheckoutPage = () => {
  //------------ Fetch product and Cart
  const location = useLocation();
  const { cartItems: cartContextItems } = useCart();
  const cartItems = location.state?.items?.length
    ? location.state.items
    : cartContextItems;
  // const { cartItems } = useCart();
  const { products } = useProductContext();
  //------------ product Const
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [deliveryCharge] = useState(50);
  //------------ Address Const
  const [selectedAddress, setSelectedAddress] = useState({});
  const [isServiceable, setIsServiceable] = useState(null);
  // const [paymentMethod, setPaymentMethod] = useState("prepaid");
  const [errors, setErrors] = useState({}); //Error Forms
  const navigate = useNavigate();
  // Existing state for form and other checkout logic
  const [formData, setFormData] = useState({
    emailId: "",
    addressType: "Home",
    postalCode: "",
    fname: "",
    lname: "",
    name: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    phone: "",
    paymentMethod: "prepaid",
  });
  const [addressData, setAddressData] = useState({
    emailId: "",
    addressType: "Home",
    postalCode: "",
    name: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    phone: "",
  });
  // Process cart items when products are loaded
  useEffect(() => {
    if (products.length > 0) {
      const processedCart = cartItems
        .map(({ productId, weight, qty }) => {
          // Find the product in the product context
          const product = products.find(
            (p) => p.productId === productId || p.id === productId
          );
          if (!product) return null;
          // Find the specific variant matching the weight
          const variant = product.variants.find((v) => v.weight === weight);
          if (!variant) return null;
          // console.log(product);
          // Return processed cart item with all necessary details
          return {
            ...variant,
            name: product.name,
            productId,
            weight,
            qty,
            mainImage: variant.mainImage, // Assuming mainImage is in the product object
          };
        })
        .filter(Boolean); // Remove any null items
      // Update cart products state
      setCartProducts(processedCart);
      // Calculate total amount
      const total = processedCart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      setTotalAmount(total);
    }
  }, [products, cartItems]);
  // Check Pincode is Servicable
  const checkServiceability = async (numericPincode) => {
    try {
      const response = await fetch(
        ` https://api.satvikraas.com/api/delhiveryOne/checkServiceability?postalcode=${numericPincode}`
      );
      if (!response.ok) throw new Error("Failed to fetch serviceability");
      const data = await response.json();
      setIsServiceable(data.serviceable);
      // Set City and State in Form Data
      formData.city = data.details.location.city;
      formData.state = getFullStateName(data.details.location.state);
      document.getElementById("formCity").value = getFullStateName(
        data.details.location.city
      );
    } catch (error) {
      console.error("Error checking serviceability:", error);
      setIsServiceable(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value,
      };
      // Automatically update `name` when `fname` or `lname` changes
      if (name === "fname" || name === "lname") {
        updatedData.name = `${updatedData.fname} ${updatedData.lname}`.trim();
      }
      return updatedData;
    });
  };
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    // If the field is "postalCode", check serviceability
    if (name === "postalCode" && value.trim().length === 6) {
      checkServiceability(value);
    }
    // console.log("validation check ",name)
    if (name === "emailId" && value.trim()) {
      try {
        const response = await fetch(
          `https://api.satvikraas.com/api/public/isFirstOrder?email=${value}`
        );
        const data = await response.json();
        setOffer(data === true);
      } catch (error) {
        console.error("Error checking first order:", error);
        setOffer(false);
      }
    }
  };
  const saveAddress = () => {
    setAddressData({
      emailId: formData.emailId,
      addressType: formData.addressType,
      postalCode: formData.postalCode,
      name: `${formData.fname} ${formData.lname}`.trim(), // Combine fname & lname
      street: formData.street,
      landmark: formData.landmark,
      city: formData.city,
      state: formData.state,
      phone: formData.phone,
    });
  };
  const validateField = (name, value) => {
    if (!value) value = ""; // Prevent undefined values
    let errorMsg = "";
    if (name === "emailId") {
      if (!value.trim()) errorMsg = "Enter an Email";
      else if (!/^\S+@\S+\.\S+$/.test(value)) errorMsg = "Enter a valid email";
    } else if (name === "fname") {
      if (!value.trim()) errorMsg = "Enter a first name";
    } else if (name === "lname") {
      if (!value.trim()) errorMsg = "Enter a last name";
    } else if (name === "street") {
      if (!value.trim()) errorMsg = "Enter an address";
    } else if (name === "city") {
      if (!value.trim()) errorMsg = "Enter a city";
    } else if (name === "state") {
      if (!value.trim()) errorMsg = "Enter a state";
    } else if (name === "postalCode") {
      if (!value.trim()) {
        errorMsg = "Enter a pincode";
      } else if (!/^\d{6}$/.test(value)) {
        errorMsg = "Pincode must be 6 digits";
      }
    } else if (name === "phone") {
      if (!value.trim()) {
        errorMsg = "Enter a phone number";
      } else if (!/^\d{10}$/.test(value)) {
        errorMsg = "Phone number must be 10 digits";
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };
  const validateForm = () => {
    if (!formData) return false; // Prevent errors if formData is undefined
    const newErrors = {};
    if (!formData.emailId?.trim()) {
      newErrors.emailId = "Enter an Email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
      newErrors.emailId = "Enter a valid email";
    }
    if (!formData.fname?.trim()) newErrors.fname = "Enter a first name";
    if (!formData.lname?.trim()) newErrors.lname = "Enter a last name";
    if (!formData.street?.trim()) newErrors.street = "Enter an address";
    if (!formData.city?.trim()) newErrors.city = "Enter a city";
    if (!formData.state?.trim()) newErrors.state = "Enter a state";
    if (!formData.postalCode?.trim()) {
      newErrors.postalCode = "Enter a pincode";
    } else if (!/^\d{6}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Pincode must be 6 digits";
    }
    if (!formData.phone?.trim()) {
      newErrors.phone = "Enter a phone number";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isServiceable === false) {
        alert("Selected area is not serviceable");
        return;
      }
      // console.log(formData)
      saveAddress();
      // Proceed with checkout
      // handlePayment()
    }
  };
  // Raxorpay
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const API_URL = "https://api.satvikraas.com/api/razorpay";
  // razorpay  ✅
  useEffect(() => {
    loadRazorpayScript();
  }, []);
  // ✅
  const handleOnlinePayment = async () => {
    if (validateForm()) {
      try {
        console.log("in Online payment");
        const FinaltotalAmount = totalAmount + deliveryCharge -discount;
        console.log(formData);
        const orderData = await payOnline(
          cartProducts,
          formData,
          FinaltotalAmount,
          discount,
          deliveryCharge
        );
        // console.log(orderData);
        const options = {
          key: "rzp_live_mJcffWL1hLYxgL",
          // key: "rzp_test_YH8zCfwQrn8l5q",
          amount: FinaltotalAmount * 100, // Amount in paise
          currency: "INR",
          name: "SATVIK RASS",
          description: "Purchase Description",
          order_id: orderData.id,
          handler: async function (response) {
            console.log("orderData.id" + orderData.id);
            // if(completeOrderResponse)
            // navigate("/ordersuccess");
            // navigate('/ordersuccess', {
            //   state: {
            //     // orderId: orderData.id,
            //     cartProducts: cartProducts,
            //     formData: formData,
            //     finalTotalAmount: FinaltotalAmount,
            //     deliveryCharge: deliveryCharge
            //   }
            // });
            navigate("/ordersuccess", {
              state: {
                orderId: orderData.id,
                cartProducts: cartProducts,
                formData: formData,
                finalTotalAmount: FinaltotalAmount,
                discountCharge: discount,
                deliveryCharge: deliveryCharge,
              },
            });
          },
          prefill: {
            name: formData.name,
            email: formData.emailId,
            contact: formData.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Payment failed!");
      }
    } else {
      alert("Please fill the required fields");
      validateForm();
    }
  };
  // downside cod
  const handleCodPayment = async () => {
    if (validateForm()) {
      try {
        console.log("in COD payment");
        const FinaltotalAmount = totalAmount + deliveryCharge -discount;
        // console.log("final price ",FinaltotalAmount);
        const orderData = await createCODOrder(
          cartProducts,
          formData,
          FinaltotalAmount,
          discount,
          deliveryCharge
        );
        console.log("order data ", orderData);
        if (orderData) {
          navigate("/ordersuccess", {
            state: {
              orderId: orderData,
              cartProducts: cartProducts,
              formData: formData,
              discountCharge: discount,
              finalTotalAmount: FinaltotalAmount,
              deliveryCharge: deliveryCharge,
            },
          });
        } else alert("Order failed!");
      } catch (error) {
        console.error("Payment failed:", error);
        alert("Order failed!");
      }
    } else {
      alert("Please fill the required fields");
      validateForm();
    }
  };
  // offer order
  const [offer, setOffer] = useState(null);
  const calculateDiscount = () => {
    return  Math.floor(totalAmount * 0.1);; // 10% discount
  };
  const discount = calculateDiscount();
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.leftSection}>
        <Link className={styles.backbtn} to={"/products"}>
          <img src={backbtn} alt="" />
        </Link>
        <form onSubmit={handleCheckout} className={styles.checkoutForm}>
          <h2>Contact</h2>
          {/*  */}
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="emailId"
              placeholder=" " // Important for :not(:placeholder-shown)
              value={formData.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.emailId ? styles.errorInput : ""}
            />
            <label>Email</label>
            {errors.emailId && (
              <span className={styles.errorText}>{errors.emailId}</span>
            )}
          </div>
          {/*  */}
          {/* <div className={styles.inputGroup}>
            <input
              type="email"
              name="emailId"
              placeholder="Email"
              value={formData.emailId}
              onChange={handleChange}
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>{" "} */}
          {/* <div className={styles.inputGroup}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? styles.errorInput : ""}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div> */}
          <div className={styles.addressRow}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="fname"
                placeholder=" " // Important for :not(:placeholder-shown)
                value={formData.fname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.fname ? styles.errorInput : ""}
              />
              <label>First Name</label>
              {errors.fname && (
                <span className={styles.errorText}>{errors.fname}</span>
              )}
            </div>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="lname"
                placeholder=" " // Important for :not(:placeholder-shown)
                value={formData.lname}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.lname ? styles.errorInput : ""}
              />
              <label>Last Name</label>
              {errors.lname && (
                <span className={styles.errorText}>{errors.lname}</span>
              )}
            </div>
          </div>
          {/* <div className={styles.inputGroup}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? styles.errorInput : ""}
            />
          </div> */}
          <div className={styles.inputGroup}>
            <input
              maxLength="10"
              type="tel"
              name="phone"
              placeholder=" " // Important for :not(:placeholder-shown)
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.phone ? styles.errorInput : ""}
            />
            <label>Phone</label>
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>
          <h2>Delivery</h2>
          <div className={styles.addresstype}>
            {["Home", "Office", "Others"].map((type, index) => (
              <div key={index}>
                {" "}
                {/* Add key here */}
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={formData.addressType === type}
                  onChange={handleChange}
                />{" "}
                <label htmlFor="">{type}</label>
              </div>
            ))}
          </div>
          {/* Delivery Address */}
          {/* <div className={styles.inputGrouppincode}>
            <label>Check Delivery Availability</label>
            <input
              type="text"
              name="postalCode"
              placeholder="PIN code"
              maxLength={6}
              value={formData.postalCode}
              onChange={handleChange}
              className={errors.postalCode ? styles.errorInput : ""}
            />
            {isServiceable === true && (
              <p className={styles.serviceableText}>✅ Delivery Available!</p>
            )}
            {isServiceable === false && (
              <p className={styles.unserviceableText}>❌ Not Serviceable</p>
            )}
          </div> */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              key={formData.city} // Forces React to re-render when city changes
              name="postalCode"
              placeholder=" " // Important for :not(:placeholder-shown)
              value={formData.postalCode}
              onChange={handleChange}
              // onBlur={handleBlur}
              onBlur={(e) => checkServiceability(e.target.value)}
              maxLength={6}
              className={errors.postalCode ? styles.errorInput : ""}
            />
            <label> Pincode (Check Delivery Availability)</label>
            {errors.postalCode && (
              <span className={styles.errorText}>{errors.postalCode}</span>
            )}
            {isServiceable === true && (
              <p className={styles.serviceableText}>✅ Delivery Available!</p>
            )}
            {isServiceable === false && (
              <p className={styles.unserviceableText}>❌ Not Serviceable</p>
            )}
          </div>
          {/* <div className={styles.inputGroup}>
            <input
              type="text"
              name="street"
              placeholder="Full Address (House no., Area, etc)"
              value={formData.street}
              onChange={handleChange}
              className={errors.street ? styles.errorInput : ""}
            />
          </div> */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="street"
              placeholder=" " // Important for :not(:placeholder-shown)
              value={formData.street}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.street ? styles.errorInput : ""}
            />
            <label>Full Address (House no., Area,etc)</label>
            {errors.street && (
              <span className={styles.errorText}>{errors.street}</span>
            )}
          </div>
          {/* 
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="landmark"
              placeholder="Landmark (optional)"
              value={formData.landmark}
              onChange={handleChange}
            />
          </div> */}
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="landmark"
              placeholder=" " // Important for :not(:placeholder-shown)
              value={formData.landmark}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.landmark ? styles.errorInput : ""}
            />
            <label>Landmark (optional)</label>
            {errors.landmark && (
              <span className={styles.errorText}>{errors.landmark}</span>
            )}
          </div>
          <div className={styles.addressRow}>
            {/* <div className={styles.inputGroup}>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? styles.errorInput : ""}
              />
            </div> */}
            <div className={styles.inputGroup}>
              <input
                id="formCity"
                type="text"
                name="city"
                placeholder=" " // Important for :not(:placeholder-shown)
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.city ? styles.errorInput : ""}
              />
              <label>City</label>
              {errors.city && (
                <span className={styles.errorText}>{errors.city}</span>
              )}
            </div>
            {/* <div className={styles.inputGroup}>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? styles.errorInput : ""}
              />
            </div> */}
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="state"
                placeholder=" " // Important for :not(:placeholder-shown)
                value={formData.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.state ? styles.errorInput : ""}
              />
              <label>State</label>
              {errors.state && (
                <span className={styles.errorText}>{errors.state}</span>
              )}
            </div>
          </div>
          <div className={styles.paymentSection}>
            <h3>Prepaid or COD</h3>
            <div className={styles.paymentOptions}>
              {["prepaid", "cod"].map((method) => (
                <label key={method} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                  />
                  <span>
                    {method === "prepaid"
                      ? "Pay Online "
                      : "Cash on Delivery - COD"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* <a
              onClick={(e) => formData.paymentMethod === "prepaid" ? handleOnlinePayment(e) : handleCodPayment(e)}
            className={styles.checkoutButton}
          >
            Checkout
          </a> */}
          <div className={styles.payementInfo}>
            <h3>Payemnt </h3>
            <p>All transactions are secure and encrypted.</p>
            <div className={styles.headDiv}>
              <div className={styles.left}>
                <p>Pay Now - via UPI, Cards, Wallets, NetBanking and more</p>
              </div>
              <div className={styles.right}>
                <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/upi.CmgCfll8.svg"
                  alt=""
                />
                <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/master.CzeoQWmc.svg"
                  alt=""
                />
                <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg"
                  alt=""
                />
                <img
                  src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/rupay.Bl62X6PG.svg"
                  alt=""
                />
                <h2>+4</h2>{" "}
              </div>
            </div>
            <div className={styles.bottomDiv}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-270.8 371 102 52"
                class="zjrzY"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M-182 404v16.8c0 .7-.4 1.2-1 1.2h-75.7c-.7 0-1.2-.6-1.2-1.2v-47.6c0-.7.6-1.2 1.2-1.2h75.7c.7 0 1 .6 1 1.2V395m-78-14h78m-17 18h27m-3.9-4.6 4.5 4.6-4.5 4.6"
                ></path>
                <circle
                  cx="-255.5"
                  cy="376.5"
                  r="1.5"
                  fill="currentColor"
                ></circle>
                <circle
                  cx="-250.5"
                  cy="376.5"
                  r="1.5"
                  fill="currentColor"
                ></circle>
                <circle
                  cx="-245.5"
                  cy="376.5"
                  r="1.5"
                  fill="currentColor"
                ></circle>
              </svg>
              <p>
                After clicking “PAY NOW”, you will be redirected to Pay Now -
                via UPI, Cards, Wallets, NetBanking and more to complete your
                purchase securely.
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.detailsRight}>
          <h3>Order Summary</h3>
          <div className={styles.cartSummary}>
            {cartProducts.map((item) => (
              <div
                key={`${item.productId}-${item.weight}`}
                className={styles.cartItem}
              >
                {/* {     console.log(item)} */}
                <img
                  src={`data:image/jpeg;base64,${item.mainImage}`}
                  alt={item.name}
                  className={styles.cartImage}
                />
                <div className={styles.itemDetails}>
                  {item.productId === 9 || item.productId === 10 ? (
                    <h6>{item.name}</h6>
                  ) : (
                    <h4>{item.name}</h4>
                  )}
                  {/* {console.log(item)} */}
                  <p>
                    Quantity: {item.qty} | {item.weight}g
                  </p>
                </div>{" "}
                <p>₹{item.price}</p>
              </div>
            ))}
          </div>
          <div className={styles.orderTotal}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>₹{totalAmount.toLocaleString()}</span>
            </div>
            <div className={styles.totalRow}>
              <span>Shipping Charges</span>
              <span>₹ {deliveryCharge}</span>
            </div>
            {offer !== null && (
              <p>
                {offer ? (  <div className={styles.totalRow}>
              <span>First Order Discount </span>
              <span>₹ {discount}</span>
            </div>
) : ``}
              </p>
            )}
            <div className={styles.totalRow}>
              <span>Total</span>
              <span className={styles.grandTotal}>
                {offer
                  ? `₹${(
                      totalAmount +
                      deliveryCharge -
                      discount
                    ).toLocaleString()}`
                  : `₹${(totalAmount + deliveryCharge).toLocaleString()}`}
              </span>
            </div>
          </div>{" "}
          <a
            onClick={(e) =>
              formData.paymentMethod === "prepaid"
                ? handleOnlinePayment(e)
                : handleCodPayment(e)
            }
            className={styles.checkoutButton}
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
export const payOnline = async (
  items,
  selectedAddress,
  totalAmount,
  totalDiscount,
  deliveryCharges
) => {
  console.log("items=====>", totalAmount);
  // Prepare the request payload
  const requestPayload = {
    items: items.map((item) => ({
      quantity: item.qty,
      productVariant: {
        id: item.id,
        price: item.price,
        discount: item.discount,
        weight: item.weight,
        finalPrice: item.price * item.quantity,
      },
    })),
    selectedAddress: {
      ...selectedAddress,
      // Ensure all properties are included
      id: selectedAddress.id || 0,
      name: selectedAddress.name || "",
      phone: selectedAddress.phone || "",
      emailId: selectedAddress.emailId || "",
      postalCode: selectedAddress.postalCode || "",
      street: selectedAddress.street || "",
      city: selectedAddress.city || "",
      state: selectedAddress.state || "",
      country: "INDIA",
      addressType: selectedAddress.addressType || "",
      landmark: selectedAddress.landmark || "",
    },
    totalAmount,
    totalDiscount,
    deliveryCharges,
  };
  console.log("requestPayload===", selectedAddress);
  try {
    const response = await axios.post(
      `https://api.satvikraas.com:443/api/razorpay/createorder`,
      requestPayload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// cod down
export const createCODOrder = async (
  items,
  selectedAddress,
  totalAmount,
  totalDiscount,
  deliveryCharges
) => {
  // Prepare the request payload
  const requestPayload = {
    items: items.map((item) => ({
      quantity: item.qty,
      productVariant: {
        id: item.id,
        price: item.price,
        discount: item.discount,
        weight: item.weight,
        finalPrice: item.price * item.quantity,
      },
    })),
    selectedAddress: {
      ...selectedAddress,
      // Ensure all properties are included
      id: selectedAddress.id || 0,
      name: selectedAddress.name || "",
      phone: selectedAddress.phone || "",
      emailId: selectedAddress.emailId || "",
      postalCode: selectedAddress.postalCode || "",
      street: selectedAddress.street || "",
      city: selectedAddress.city || "",
      state: selectedAddress.state || "",
      country: "INDIA",
      addressType: selectedAddress.addressType || "",
      landmark: selectedAddress.landmark || "",
    },
    totalAmount,
    totalDiscount,
    deliveryCharges,
  };
  console.log("request COD Payload===", requestPayload);
  try {
    const response = await axios.post(
      `https://api.satvikraas.com:443/api/codorders/createcodorder`,
      requestPayload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
// States
const getFullStateName = (shortCode) => {
  return stateMapping[shortCode.toUpperCase()] || shortCode;
};
const stateMapping = {
  AN: "Andaman and Nicobar Islands",
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CG: "Chhattisgarh",
  CH: "Chandigarh",
  DD: "Daman and Diu",
  DL: "Delhi",
  DN: "Dadra and Nagar Haveli",
  GA: "Goa",
  GJ: "Gujarat",
  HP: "Himachal Pradesh",
  HR: "Haryana",
  JH: "Jharkhand",
  JK: "Jammu and Kashmir",
  KA: "Karnataka",
  KL: "Kerala",
  LA: "Ladakh",
  LD: "Lakshadweep",
  MH: "Maharashtra",
  ML: "Meghalaya",
  MN: "Manipur",
  MP: "Madhya Pradesh",
  MZ: "Mizoram",
  NL: "Nagaland",
  OD: "Odisha",
  PB: "Punjab",
  PY: "Puducherry",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TS: "Telangana",
  TR: "Tripura",
  UP: "Uttar Pradesh",
  UK: "Uttarakhand",
  WB: "West Bengal",
};
