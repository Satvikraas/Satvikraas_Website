import svg from "./About-Us-Hero.svg";
import spoon from "./contact-spoon.svg";
import styles from "./ContactUs.module.scss";
import { useEffect,useState} from "react";

export default function ContactUs() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    serviceType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      alert("Form submitted successfully!");
      console.log(result);
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        serviceType: "",
      });
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the form.");
    }
  };
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
            <div> </div>
            <div>
              
                <h5>Address</h5>
              <p>RA Brewing venture LLP Plot No. 662/11, Jangali Maharaj Road, Pune, 411004</p>
          
            </div>
          </div>
          <div className={styles.Phone}>
            <div> </div>
            <div>
              <h5>Phone</h5>
             <p>
         
             6262454595
             </p>
            </div>
          </div>
          <div className={styles.Email}>
            <div> </div>
            <div>
              <h5>Email</h5>
              <p>
                customercare@satvikraas.com <br />
                satvikraas@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/*Map */}
        <div className={styles.Map}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.8016990618144!2d73.84524742550751!3d18.51955481746578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf421b2ca259%3A0x7772da46bb5972bc!2sShahi%20Bhoj%20Thali%20Restaurant!5e0!3m2!1sen!2sin!4v1734923770553!5m2!1sen!2sin" 
            
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      
      <div className={styles.Contact}>
        <div className={styles.SpoonImg}>
          <img src={spoon} />
        </div>
        <div className={styles.InfoForm}> <div className={styles.LeaveMessage}>
        <h1>Leave A Message</h1>
      </div>
      <form className={styles.contactForm} onSubmit={handleSubmit}>
  
        <div> <label>
            First Name <span>*</span>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Ex: Dhawal"
            />
          </label> </div> 
          <div>  <label>
            Last Name <span>*</span>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Ex: Patel"
            />
          </label></div>
 
          <div>   <label>
            Mobile Number <span>*</span>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
              placeholder="Ex: 8945488541"
            />
          </label></div>
 
          <div>  <label>
            E-Mail Address <span>*</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Ex: dhawal@kcc.com"
            />
          </label></div>
 
          <div>   <label>
            
            <textarea
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              required className="serviceTypetxt"
              placeholder="Write Short Description"
            ></textarea>
          </label> </div>
          <div className={styles.Submit}>
            <button>Submit</button>
          </div>
        </form>
         
        </div>
      </div>

  
    </div>
  );
}