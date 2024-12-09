import React, { useState } from "react";
import   "./Navbar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/Logo/logo.png"
import cart from "../../Assets/Logo/cart.png"
import login from "../../Assets/Logo/admin.png"
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
  }; const menuLinks = document.querySelectorAll(".menu-link");

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuLinks.forEach((link) => {
        link.classList.remove("is-active");
      });
      link.classList.add("is-active");
    });
  });
  

  return (
    <nav >
      {/* <ul className={styles.navLinks}>
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
      </div> */} <header class="header" id="header">
	<nav class="navbar container">
		<a href="./index.html" class="brand"><img src={logo} alt="" /></a>
		<div class="menu" id="menu">
			<ul class="menu-list">
				<li class="menu-item">
					<a href="/" class="menu-link ">
						<i class="menu-icon ion-md-home"></i>
						<span class="menu-name">Home</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/products" class="menu-link ">
						<i class="menu-icon ion-md-pricetags"></i>
						<span class="menu-name">Our Products</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/about" class="menu-link ">
						<i class="menu-icon ion-md-people"></i>
						<span class="menu-name">About Us</span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/contact" class="menu-link">
						<i class="menu-icon ion-md-call"></i>
						<span class="menu-name">Contact Us</span>
					</a>
				</li>
			
			</ul>
		</div> <ul className="rightdiv">	<li class="menu-item">
					<a onClick={handlecartopen} class="menu-link">
						
						<span class="menu-name"><i class="menu-iconz ion-md-cart"></i></span>
					</a>
				</li>
				<li class="menu-item">
					<a href="/login" class="menu-link">
					
						<span class="menu-name"> 	<i  class="menu-iconz ion-md-contact"></i></span>
					</a>
				</li>
		</ul>
	</nav>
</header>
    </nav>
  );
};

export default Navbar;
