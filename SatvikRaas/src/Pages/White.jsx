import React from "react";
import logo from "../Assets/Logo/SatvikRaasLogo.svg"
const CenteredLogo = () => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#fff", // White background
      margin: 0,
    },
    logo: {
      maxWidth: "80%", // Responsive width
      maxHeight: "300px", // Limit the height
    },
    mobile: {
      maxWidth: "60%", // Smaller width for mobile
      maxHeight: "150px", // Smaller height for mobile
    },
  };

  // Dynamically adjust styles for responsiveness
  const isMobile = window.innerWidth < 768;
  const logoStyle = isMobile ? styles.mobile : styles.logo;

  return (
    <div style={styles.container}>
      <img
        src={logo} // Replace with your logo path
        alt="Logo"
        style={logoStyle}
      />
    </div>
  );
};

export default CenteredLogo;
