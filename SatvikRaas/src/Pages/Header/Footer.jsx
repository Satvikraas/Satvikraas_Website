import styles from "./Footer.module.scss";
import logo from "./SatvikRaasLogo.svg";
import { Link } from "react-router-dom";
export default function Footer() { const links = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Our Product", path: "/products" },
  { name: "Contact Us", path: "/contact" },
  { name: "Cart", path: "/cart" }, 
]; const resources = [
  { name: "Help Center", path: "/help-center" },
  { name: "Terms & Conditions", path: "/terms-conditions" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Payment & Pricing", path: "/payment-pricing" },
  { name: "Shipping", path: "/shipping" },
];
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterMain}>
        {/* Logo and Info */}
        <div className={styles.MainLogo}>
          <img src={logo} alt="Satvik Raas Logo" />
          <p>
            From the farm to your table, we deliver more than just spices—we
            deliver authenticity, health, and bold flavors.
          </p>
          <div className={styles.SocialMedia}>
            <div className={styles.Email}>
              <a href="mailto:customercare@satvikraas.com">
                customercare@satvikraas.com
              </a>
              <br />
              <a href="mailto:satvikraas@gmail.com">satvikraas@gmail.com</a>
            </div>
            <div className={styles.SocialMediaLinks}>
              {/* <p>s</p> */}
            </div>
          </div>
        </div>

        {/* Explore and Resources */}
        <div className={styles.ExploreAndResources}>
        <div className={styles.Explore}>
      <h1>Explore</h1>
      {links.map((link) => (
        <Link key={link.name} to={link.path}>
          {link.name}
        </Link>
      ))}
    </div>
    <div className={styles.Resources}>
      <h1>Resources</h1>
      {resources.map((resource) => (
        <Link key={resource.name} to={resource.path}>
          {resource.name}
        </Link>
      ))}
    </div>
        </div>

        {/* Location */}
        <div className={styles.Location}>
          <h1>Location</h1>
          <a>
            RA Brewing venture LLP Plot No. 662/11, Jangali Maharaj Road, Pune,
            411004
          </a>
        </div>
      </div>

      <div className={styles.FooterBottom}>
        <div className={styles.Copywrite}>
          <p>Copyright © 2024. All rights reserved</p>
        </div>
        <div className={styles.MadeBy}>
          <p>Made by Haraay Design Studio</p>
        </div>
      </div>
    </footer>
  );
}
