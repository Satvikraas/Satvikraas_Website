import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.scss"; // Import SCSS styles
import logo from "../../Assets/Logo/logo.png";
import logoapple from "../../Assets/Logo/logo_apple.svg";
import logogoogle from "../../Assets/Logo/logo_google.svg";
import logofacebook from "../../Assets/Logo/logo_facebook.svg";
import api from "../../api.jsx";   import { ToastContainer, toast } from 'react-toastify';
const SignupPage = () => {

  const notify = () => toast("Sucessfully Account Created!");



  const navigate = useNavigate();



  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigateToLoginPage = () => {

    {notify()}
       
    // navigate("/login");
  };

  const handleSignup = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await api.post(`/api/auth/signup`, {
          name,
          email,
          password,
          phoneNumber,
        });
        console.log("Success:", response.data); 
 
        // Navigate to login page upon successful signup
        navigateToLoginPage();
      } catch (error) {
        console.error("Error signing up:", error);
        // Optionally display an error message to the user
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className={styles.loginPage}>   
 <ToastContainer />
      <div className={styles.container}>
        <img src={logo} alt="Satvik Raas Logo" className={styles.logo} />
        <h1>Welcome to Satvik Raas!</h1>
        <p>Create your account to continue</p>
        <form className={styles.loginForm} onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Enter Name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.passwordWrapper}>
            <input
              type="password"
              placeholder="Enter Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.passwordWrapper}>
            <input
              type="password"
              placeholder="Confirm Password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            type="number"
            placeholder="Phone Number"
            className={styles.input}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit" className={styles.loginButton}>
            Sign Up
          </button>
        </form>
        {/* <div className={styles.divider}>or</div>
        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>
            <img src={logoapple} alt="Apple" />
          </button>
          <button className={styles.socialButton}>
            <img src={logofacebook} alt="Facebook" />
          </button>
          <button className={styles.socialButton}>
            <img src={logogoogle} alt="Google" />
          </button>
        </div> */}
        <p className={styles.signUpRow}>
          Already have an account?{" "}
          <a onClick={navigateToLoginPage} style={{ cursor: "pointer" }}>
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
