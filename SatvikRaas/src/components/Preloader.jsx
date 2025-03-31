import { useEffect, useState } from "react";
import styles from "./Preload.module.scss";
import logo from "/logo.png"; // Adjust the path as needed

const Preload = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.preloadContainer}>
      <img src={logo} alt="Logo" className={styles.logo} />
    </div>
  );
};

export default Preload;