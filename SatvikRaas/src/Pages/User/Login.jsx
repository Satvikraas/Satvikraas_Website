

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AuthPage.module.scss"; // Import SCSS styles
import logo from "../../Assets/Logo/logo.png";
import logoapple from "../../Assets/Logo/logo_apple.svg";
import logogoogle from "../../Assets/Logo/logo_google.svg";
import logofacebook from "../../Assets/Logo/logo_facebook.svg";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://api.satvikraas.com:443/api/auth/login",
        null, // Pass null for the body since we're using params
        {
          params: {
            email: email,
            password: password,
          },
        }
      );

      // Store tokens in sessionStorage
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      //console.log("Login successful");
      //console.log("Access Token:", sessionStorage.getItem("accessToken"));
      //console.log("Refresh Token:", sessionStorage.getItem("refreshToken"));

      // Navigate to the homepage
      navigate("/products");
    } catch (error) {
      //console.error("Error logging in:", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  const navigateToSignupPage = () => {
    navigate("/signUp");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <img src={logo} alt="Satvik Raas Logo" className={styles.logo} />
        <h1>Welcome back to Satvik Raas!</h1>
        <p>Log in to your account to continue</p>
        <form className={styles.loginForm} onSubmit={handleLogin}>
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
          <div className={styles.rememberMeRow}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/forgotpass" className={styles.forgotPassword}>
              Forgot your password?
            </a>
          </div>
          <button type="submit" className={styles.loginButton}>
            Log In
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
          Don’t have an account?{" "}
          <a onClick={navigateToSignupPage} style={{ cursor: "pointer" }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
