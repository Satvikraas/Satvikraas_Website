import React ,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import { useAuth  } from "../context/AuthProvider.jsx";
import styles from "./Navbar.module.scss";
import logo from "../assets/Logo/logo.png";
import {UserIcon , CartIcon , LogOutIcon} from "../assets/ICONS.jsx";
import { useCart } from "../context/CartProvider";

export default function Navbar() {
 
   const {  isCartSidebarOpen, setIsCartSidebarOpen } = useCart();
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
    <div className={`${styles.Navbar} ${isVisible ? styles.show : styles.hide}`}>
  <img src={logo} className={`${styles.Navbarlogo} ${isVisible ? styles.hide : styles.show}`} alt="" />
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
            <img src={logo} alt="" />
          </div>
          <div className={styles.navContent}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/products"}>Shop</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className={styles.rightContent}>
          <button onClick={() => setIsCartSidebarOpen(true)}>
           <CartIcon />
          </button>
        
      
        
        </div>
        </div>

      
      </div>
    </div>
  );
}
