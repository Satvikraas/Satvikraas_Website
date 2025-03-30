import React from "react";
import styles from "./Terms.module.scss";
export default function ShippingPolicy() {
  return (
    <div className={styles.mainPage}>
      <div className={styles.heroSection}>
        <h1>Shipping Policy</h1>
      </div>{" "}
      <h2>Order Processing</h2>
      <div className={styles.section1}>
        <h2>Prepaid Orders</h2>
        <p>We exclusively accept prepaid orders through our online platform . Order processing begins immediately after successful payment completion. Processing times are 1-3 business days, excluding weekends and holidays All payments must be completed in full during checkout to initiate order processing</p>
      </div>
      <div className={styles.section1}>
        <h2>Shipping Methods</h2>
        <p>We use Delhivery as our exclusive logistics partner. Only surface delivery is offered. Shipping is available across India</p>
      </div>
      <div className={styles.section1}>
        <h2>Delivery Estimates</h2>
        <p>
          Typical delivery windows range from 5-10 business days .Actual
          delivery times may vary depending on
          <ul>
            <li>Distance from warehouse</li>
            <li>Local logistics conditions</li>
            <li>Potential transit challenges</li>
          </ul>
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Shipping Charges</h2>
        <p>
          Shipping costs are calculated based on two primary factors:
          <ul>
            <li>Total weight of goods</li>
            <li>Distance from our warehouse to delivery location</li>
          </ul>
          Shipping rates are automatically calculated and displayed at checkout.
          Charges vary dynamically based on weight and distance. Orders totaling
          ₹999 or more qualify for free shipping
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Shipping Restrictions</h2>
        <p>
          Delivery is limited to locations within India . P.O. Box addresses are
          not accepted. Remote or difficult-to-access locations may experience
          extended delivery times
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Customer Responsibilities</h2>
        <p>
          Provide accurate and complete delivery address during checkout. Ensure
          availability to receive package or provide alternative delivery
          instructions. Verify payment method and complete full prepayment. Keep
          contact information updated
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Tracking</h2>
        <p>
          Once shipped, you will receive a tracking number via email. You can
          track your shipment through the Delhivery tracking system.
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Additional Considerations</h2>
        <p>
          Delivery times are estimates and not guaranteed
          <br />
          We are not responsible for delays caused by:
          <br />
          <ul>
            <li>External logistics challenges</li>
            <li>Weather conditions</li>
            <li>Local transportation issues</li>
            <li>Force majeure events</li>
          </ul>
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Contact Information</h2>
        <p>
          For any shipping-related queries, please contact our customer support
          team:
          <br />
          Email: customercare@satvikraas.com
          <br />
          Phone: 6262454595
          <br />
          Support Hours: 10AM – 5PM
          <br />
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Policy Updates</h2>
        <p>
          {" "}
          This shipping policy is subject to change without prior notice.
          Customers are advised to review the latest policy before placing an
          order
        </p>
      </div>
      <div className={styles.section1}>
        <h2>Disclaimer</h2>
        <p>
          {" "}
          All shipping information is provided as a general guide. Actual
          shipping experiences may vary. We strive to ensure timely and accurate
          delivery of all prepaid orders
        </p>
      </div>
    </div>
  );
}
