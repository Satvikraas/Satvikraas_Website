import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleBackToProducts = () => {
    navigate('/products');
  };

  useEffect(() => {
    const createConfetti = () => {
      const confettiColors = ['blue', 'green', 'yellow', 'pink'];
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti confetti--${confettiColors[Math.floor(Math.random() * confettiColors.length)]}`;
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animation = `confettiDrop ${Math.random() * 3 + 2}s linear forwards`;
        
        document.querySelector('.popup-container').appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 5000);
      }
    };

    createConfetti();
    const confettiInterval = setInterval(createConfetti, 5000);

    return () => {
      clearInterval(confettiInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 z-index">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="popup-container relative bg-white rounded-xl p-8 shadow-xl w-[90%] max-w-md mx-auto flex flex-col items-center">
        <div className="success-circle mb-6">
          <div className="success-circle__outer"></div>
          <div className="success-circle__inner">
            <div className="checkmark"></div>
          </div>
        </div>
        
        <div className="success-content text-center">
          <h2 className="success-title text-2xl font-bold text-gray-800 mb-2">
            Order Successful!
          </h2>
          <p className="success-message text-gray-600 mb-6">
            Thank you for your purchase
          </p>
          <button 
            className="success-button bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            onClick={handleBackToProducts}
          >
            Back To Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;