import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import { useProductContext } from "../context/ProductContext";
import styles from "../styles/CartPage.module.scss";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateCartQty,
    isCartSidebarOpen,
    setIsCartSidebarOpen,
  } = useCart();
  const { products } = useProductContext();
  const [isProductLoaded, setIsProductLoaded] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (products && products.length > 0) {
      setIsProductLoaded(true);

      const processedCart = cartItems
        .map(({ productId, weight, qty }) => {
          const product = products.find(
            (p) => p.productId === productId || p.id === productId
          );
          if (!product) return null;

          const variant = product.variants.find((v) => v.weight === weight);
          if (!variant) return null;

          return { ...variant, name: product.name, productId, weight, qty };
        })
        .filter(Boolean);

      setCartProducts(processedCart);
      setTotalAmount(
        processedCart.reduce((sum, item) => sum + item.price * item.qty, 0)
      );
    }
  }, [products, cartItems]);

  if (!isProductLoaded) {
    return <p>Loading cart items...</p>;
  }

  return (
    <>
      {/* Overlay for background blur effect */}
      <div
        className={`${styles.overlay} ${
          isCartSidebarOpen ? styles.showOverlay : ""
        }`}
        onClick={() => setIsCartSidebarOpen(false)}
      ></div>

      {/* Side Cart */}
      <div
        className={`${styles.cartPage} ${isCartSidebarOpen ? styles.open : ""}`}
      >
        <div className={styles.header}>
          {" "}
          <button
            className={styles.closeButton}
            onClick={() => setIsCartSidebarOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                d="M0.220456 1.28531C-0.0734852 0.991369 -0.0734852 0.514665 0.220456 0.220571C0.514396 -0.0735235 0.991103 -0.0735235 1.2852 0.220571L9.49992 8.43526L17.7146 0.220571C18.0086 -0.0735235 18.4853 -0.0735235 18.7795 0.220571C19.0735 0.51451 19.0735 0.991369 18.7795 1.28531L10.5645 9.49984L18.7794 17.7147C19.0733 18.0086 19.0733 18.4853 18.7794 18.7794C18.4853 19.0735 18.0086 19.0735 17.7145 18.7794L9.49977 10.5647L1.2852 18.7794C0.991258 19.0735 0.514551 19.0735 0.220456 18.7794C-0.0734852 18.4855 -0.0734852 18.0088 0.220456 17.7147L8.43518 9.49984L0.220456 1.28531Z"
                fill="#333434"
              />
            </svg>
          </button>
          <h2>Your Cart</h2>
        </div>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className={styles.cartContainer}>
            {cartProducts.map(
              ({ productId, weight, qty, name, price, mainImage }) => (
                <div key={`${productId}-${weight}`} className={styles.cartItem}>
                  <img
                    src={`data:image/jpeg;base64,${mainImage}`}
                    alt={name}
                    className={styles.cartImage}
                  />
                  <div className={styles.cartInfo}>
                    <div className={styles.productText}>
                      <h3>{name}</h3>
                      <p>Weight: {weight}g</p>
                      <p className={styles.priceText}>
                        Price: <span>₹{price}</span>
                      </p>
                    </div>
                    <div className={styles.qtyControls}>
                      <div className={styles.qtycontrolsbtn}>
                        {" "}
                        <button
                          onClick={() =>
                            updateCartQty(
                              productId,
                              weight,
                              Math.max(1, qty - 1)
                            )
                          }
                          disabled={qty <= 1}
                        >
                          -
                        </button>
                        <span>{qty}</span>
                        <button
                          onClick={() =>
                            updateCartQty(productId, weight, qty + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(productId, weight)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M10.154 26.6666C9.55668 26.6666 9.04824 26.4568 8.62868 26.0372C8.20913 25.6177 7.99935 25.1097 7.99935 24.5132V7.99989H6.66602V6.66656H11.9993V5.63989H19.9993V6.66656H25.3327V7.99989H23.9993V24.5132C23.9993 25.1266 23.794 25.639 23.3833 26.0506C22.9727 26.4621 22.4598 26.6674 21.8447 26.6666H10.154ZM22.666 7.99989H9.33268V24.5132C9.33268 24.7523 9.40957 24.9488 9.56335 25.1026C9.71713 25.2563 9.91402 25.3332 10.154 25.3332H21.846C22.0505 25.3332 22.2385 25.2479 22.41 25.0772C22.5816 24.9066 22.6669 24.7181 22.666 24.5119V7.99989ZM13.0767 22.6666H14.41V10.6666H13.0767V22.6666ZM17.5887 22.6666H18.922V10.6666H17.5887V22.6666Z"
                            fill="#0A0C0C"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
            
            {/* <div className={styles.darkColor}></div> */}
          </div>
        )}
        <div className={styles.bottomContent}>
          <h3 className={styles.totalAmount}>
            Total: ₹{totalAmount.toFixed(2)}
          </h3>
          {cartItems.length === 0 ? (
          <p>  <Link
          to="/products"
          onClick={() => setIsCartSidebarOpen(false)}
          className={styles.checkoutBtn}
        >
          Add Products
        </Link></p>
        ) : (  <Link
          to="/checkout"
          onClick={() => setIsCartSidebarOpen(false)}
          className={styles.checkoutBtn}
        >
          Check Out
        </Link>)}
        
        </div>
      </div>
    </>
  );
};

export default CartPage;
