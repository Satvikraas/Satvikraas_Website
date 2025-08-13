import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useAuth  } from "../context/AuthProvider.jsx";
import styles from "./Navbar.module.scss";
import Logo from "./logo.png";
import { UserIcon, CartIcon, LogOutIcon } from "../assets/ICONS.jsx";
import { useCart } from "../context/CartProvider";
import shop from "../assets/Images/shop.svg";
import Checklist from "../assets/Images/CheckOrder.png";
import AboutIcon from "./AboutIcon.svg";
import HomeIcon from "./HomeIcon.svg";
import ContactIcon from "./ContactIcon.svg";
import ShopIcon from "./ShopIcon.svg";
export default function Navbar() {
  const { cartItems, isCartSidebarOpen, setIsCartSidebarOpen } = useCart();
  const totalItemsInCart = cartItems.length;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // setIsVisible(false); // Hide navbar on scroll down
      } else {
        setIsVisible(true); // Show navbar on scroll up
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <div
      className={`${styles.Navbar} ${isVisible ? styles.show : styles.hide}`}
    >
      <img src={Logo} className={styles.Navbarlogo} alt="" />
      <div className={styles.scrollDiv}>
        <div className={styles.scrollingtext}>
          <p>
            {[...Array(50)].map((_, index) => (
              <span key={index}>
                10% Discount on All Products! Hurry Up! &nbsp; &nbsp; &nbsp;
                &nbsp;
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className={styles.NavbarMain}>
        <div className={styles.NavbarDiv}>
          <div className={styles.logoDiv}>
            <img src={Logo} alt="" />
          </div>
          <div className={styles.navContent}>
            <ul>
              <li>
                <Link to={"/"}>
                  <span className={styles.icons}>
                    <img src={HomeIcon} alt="" />
                  </span>{" "}
                  Home
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/products"}>
                  <span className={styles.icons}>
                    <img src={ShopIcon} alt="" />
                  </span>{" "}
                  Shop
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/about"}>
                  <span className={styles.icons}>
                    <img src={AboutIcon} alt="" />
                  </span>{" "}
                  About
                </Link>
              </li>
              <li>
                {" "}
                <Link to={"/contact"}>
                  <span className={styles.icons}>
                    <img src={ContactIcon} alt="" />
                  </span>{" "}
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.rightContent}>
            {totalItemsInCart !== 0 && (
              <h2 className={styles.qtynumber}>{totalItemsInCart}</h2>
            )}{" "}
            <Link to={"/trackorder"}>
              <img src={Checklist} alt="" />
            </Link>
            <button onClick={() => setIsCartSidebarOpen(true)}>
              <img src={shop} alt="" />
            </button>
          </div>
        </div>
      </div>{" "}
      <div
        className={styles.scrollDiv }
        style={{ height: "30px", backgroundColor: "#006361" }}
      >
        <div
          className={styles.scrollingtext}
          style={{
            color: "white",
            fontSize: "14px",
            backgroundColor: "#006361",
          }}
        >
          <p>
            {[...Array(60)].map((_, index) => (
              <span key={index} style={{ color: "white", fontSize: "16px" }}>
                          Free Delivery on All Orders | Satvikraas Spices at Your Doorstep.
 &nbsp; &nbsp; &nbsp; &nbsp;
              </span>
            ))}
          </p>
        </div>
      </div> 
       <div
        className={styles.scrollDivmob }
        style={{ height: "30px",  backgroundColor: "#006361" }}
      >
        <div
          className={styles.scrollingtext}
          style={{
            color: "white",
            fontSize: "14px",
            backgroundColor: "#006361",
          }}
        >
          <p>
            {[...Array(60)].map((_, index) => (
              <span key={index} style={{ color: "white", fontSize: "16px" }}>
              Free Delivery on All Orders | Satvikraas Spices at Your Doorstep

| &nbsp; &nbsp; &nbsp; &nbsp;
              </span>
            ))}
          </p>
        </div>
      </div> 
    </div>
  );
}
