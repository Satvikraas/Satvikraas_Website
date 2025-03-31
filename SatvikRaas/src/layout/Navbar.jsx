import React ,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import { useAuth  } from "../context/AuthProvider.jsx";
import styles from "./Navbar.module.scss";
import Logo from "./logo.png";
import {UserIcon , CartIcon , LogOutIcon} from "../assets/ICONS.jsx";
import { useCart } from "../context/CartProvider";
import shop from "../assets/Images/shop.svg"
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
    <div className={`${styles.Navbar} ${isVisible ? styles.show : styles.hide}`}>
  <img src={Logo} className={styles.Navbarlogo }alt="" />
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
            <li><span className={styles.icons}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg></span>
              <Link to={"/"}>Home</Link>
            </li>
            <li><span className={styles.icons}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-bag-icon lucide-shopping-bag"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></span>
              <Link to={"/products"}>Shop</Link>
            </li>
            <li><span className={styles.icons}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-contact-round-icon lucide-contact-round"><path d="M16 2v2"/><path d="M17.915 22a6 6 0 0 0-12 0"/><path d="M8 2v2"/><circle cx="12" cy="12" r="4"/><rect x="3" y="4" width="18" height="18" rx="2"/></svg></span>
              <Link to={"/about"}>About</Link>
            </li>
            <li><span className={styles.icons}></span>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>
        <div className={styles.rightContent}>
        {
          totalItemsInCart !== 0 &&   <h2 className={styles.qtynumber}>{totalItemsInCart}</h2>
        }
          <button onClick={() => setIsCartSidebarOpen(true)}>
            <img src={shop} alt="" />
         </button>
        
      
        
        </div>
        </div>

      
      </div>
   
    </div>
  );
}
