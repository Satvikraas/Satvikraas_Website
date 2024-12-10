import styles from "./Footer.module.scss";
import logo from "./SatvikRaasLogo.svg";

export default function Footer() {
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
              <p>s</p>
            </div>
          </div>
        </div>

        {/* Explore and Resources */}
        <div className={styles.ExploreAndResources}>
          <div className={styles.Explore}>
            <h1>Explore</h1>
            {["Home", "About Us", "Our Product", "Blog", "Contact Us", "Cart"].map(
              (item) => (
                <a key={item} href="#">
                  {item}
                </a>
              )
            )}
          </div>
          <div className={styles.Resources}>
            <h1>Resources</h1>
            {[
              "Help Center",
              "Terms & Conditions",
              "Privacy Policy",
              "Payment & Pricing",
              "Shipping",
            ].map((item) => (
              <a key={item} href="#">
                {item}
              </a>
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
