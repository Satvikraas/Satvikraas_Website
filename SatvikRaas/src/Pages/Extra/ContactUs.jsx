import svg from "./About-Us-Hero.svg";
import spoon from "./contact-spoon.svg";
import styles from "./ContactUs.module.scss";


export default function ContactUs() {
  return (
    <div className={styles.Main}>
      {/* contact us hero  */}
      <div className={styles.HeroSection}>
        <div className={styles.HeroImg}>
          <img src={svg}></img>
        </div>
        <div className={styles.ContactUs}>
          <h1>Contact Us</h1>
        </div>
      </div>

      {/* Contact Us Info and map */}
      <div className={styles.ContactUsMain}>
        <div className={styles.ContactUsInfo}>
          <h1>Contact Us</h1>
          <div className={styles.Address}>
            <div>Icons </div>
            <div>
              <address>
                <p>address</p>
                address
              </address>
            </div>
          </div>
          <div className={styles.Phone}>
            <div>hi </div>
            <div>
              <p>Phone</p>
              +91 81854187441 <br />
              +91 81854187441
            </div>
          </div>
          <div className={styles.Email}>
            <div>hi </div>
            <div>
              <p>Email</p>
              <email>
                customercare@satvikraas.com <br />
                satvikraas@gmail.com
              </email>
            </div>
          </div>
        </div>

        {/*Map */}
        <div className={styles.Map}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d60533.27588708203!2d73.85533385159059!3d18.51399538970572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1732703928535!5m2!1sen!2sin"
            width="800"
            height="500"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div className={styles.LeaveMessage}>
        <h1>Leave Message</h1>
      </div>
      <div className={styles.Contact}>
        <div className={styles.SpoonImg}>
          <img src={spoon} />
        </div>
        <div className={styles.InfoForm}>
          <form>
            <label>
              First Name <span>*</span> <br />
              <input
                className="FirstName"
                type="text"
                placeholder="Ex. Dhawal"
              />
            </label>

            <label>
              Last Name <br />
              <input
                className="FirstName"
                type="text"
                placeholder="Ex. Patel"
              />
            </label>

            <label>
              Mobile Number<span>*</span> <br />
              <input
                className="FirstName"
                type="tel"
                placeholder="8239487390"
                maxLength={10}
                required
              />
            </label>

            <label>
              E-Mail Address<span>*</span> <br />
              <input
                className="FirstName"
                type="email"
                placeholder="example@gmail.com"
              />
            </label>

            <label className={styles.ServiceType}>
              Service Type <span>*</span> <br />
              <input
                className={styles.Text}
                type="text"
                placeholder="Write short dscription"
              />
            </label>
          </form>
          <div className={styles.Submit}>
            <button>Submit</button>
          </div>
        </div>
      </div>

  
    </div>
  );
}
