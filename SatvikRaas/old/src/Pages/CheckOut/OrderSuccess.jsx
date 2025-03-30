

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleBackToProducts = () => {
    navigate('/products');
  };

  useEffect(() => {
    // Create confetti animation
    const createConfetti = () => {
      const confettiColors = ['blue', 'green', 'yellow', 'pink'];
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti confetti--${confettiColors[Math.floor(Math.random() * confettiColors.length)]}`;
        
        // Random position and delay
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animation = `confettiDrop ${Math.random() * 3 + 2}s linear forwards`;
        
        document.querySelector('.success-container').appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    };

    // Initial confetti burst
    createConfetti();

    // Repeat confetti every few seconds
    const confettiInterval = setInterval(createConfetti, 5000);

    return () => {
      clearInterval(confettiInterval);
    };
  }, []);

  return (
    <div className="success-container">
      <div className="success-circle">
        <div className="success-circle__outer"></div>
        <div className="success-circle__inner">
          <div className="checkmark"></div>
        </div>
      </div>
      
      <div className="success-content">
        <h2 className="success-title">Order Successful!</h2>
        <p className="success-message">Thank you for your purchase</p>
        <button 
          className="success-button"
          onClick={handleBackToProducts}
        >
          Back To Products
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;