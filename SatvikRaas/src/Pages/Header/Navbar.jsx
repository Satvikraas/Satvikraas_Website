import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [activeTab, setActiveTab] = useState("Home"); // Default active tab
  const navigate = useNavigate();
  const handleTabClick = (tabName) => {
    setActiveTab(tabName); // Update the active tab when clicked
  };

  const getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  const handlecartopen = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("Please Login First")
      navigate("/login");

    } else {
      navigate("/cart");

    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li
          className={`${styles.navItem} ${
            activeTab === "Home" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Home")}
        >
          <a href="/" className={styles.link}>
            Home
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            activeTab === "Our Products" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Our Products")}
        >
          <a href="/products" className={styles.link}>
            Our Products
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            activeTab === "About Us" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("About Us")}
        >
          <a href="/about" className={styles.link}>
            About Us
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            activeTab === "Blogs" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Blogs")}
        >
          <a href="#" className={styles.link}>
            Blogs
          </a>
        </li>
        <li
          className={`${styles.navItem} ${
            activeTab === "Contact Us" ? styles.active : ""
          }`}
          onClick={() => handleTabClick("Contact Us")}
        >
          <a href="#" className={styles.link}>
            Contact Us
          </a>
        </li>
      </ul>
      <div className={styles.icons}>
      
        <button onClick={handlecartopen}>
          {" "}
          <span className={styles.icon}>&#128722;</span>{" "}
        </button>
        <a href="/login">
          {" "}
          <span className={styles.icon}>&#128100;</span>{" "}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
