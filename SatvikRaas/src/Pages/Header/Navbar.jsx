import React, { useState } from "react";
import   "./Navbar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/Logo/logo.png";
import cart from "../../Assets/Logo/cart.png"
import login from "../../Assets/Logo/admin.png"
 import { Link } from "react-router-dom";
const Navbar = () => {   const location = useLocation();
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
  
//  text color 
 // Define routes that require white text
 const whiteTextRoutes = ['/', '/about', '/contact'];

 // Determine if the current route requires white text
 const isWhiteText = whiteTextRoutes.includes(location.pathname);

  return (
    <nav >
      <header class="header" id="header">
	<nav class="navbar container">
  <Link to="/" class="brand"><img src={logo} alt="" className="brandlogo"/></Link>
		<div class="menu" id="menu">
			<ul class="menu-list">
				<li class="menu-item">
			  <Link to="/" class="menu-link ">
						<i class="menu-icon ion-md-home"></i>
						<span class="menu-name">Home</span>
					</Link>
				</li>
				<li class="menu-item">
				  <Link to="/products" class="menu-link ">
						<i class="menu-icon ion-md-pricetags"></i>
						<span class="menu-name">Our Products</span>
					</Link>
				</li>
				<li class="menu-item">
				  <Link to="/about" class="menu-link ">
						<i class="menu-icon ion-md-people"></i>
						<span class="menu-name">About Us</span>
					</Link>
				</li>
				<li class="menu-item">
				  <Link to="/contact" class="menu-link">
						<i class="menu-icon ion-md-call"></i>
						<span class="menu-name">Contact Us</span>
					</Link>
				</li>
			
			</ul>
		</div> <ul className="rightdiv">	<li class="menu-item">
					<a onClick={handlecartopen} class="menu-link">
						
						<span class="menu-name"><i class="menu-iconz ion-md-cart"></i></span>
					</a>
				</li>
				<li class="menu-item">
        <Link to="/login" class="menu-link">
					
						<span class="menu-name"> 	<i  class="menu-iconz ion-md-contact"></i></span>
					</Link>
				</li>
		</ul>
	</nav>
</header>
    </nav>
  );
};

export default Navbar;
