import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './CartItemRow.css';
import CartItemRow from './CartItemRow';
import { useLocation, useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true,
  validateStatus: (status) => {
    return (status >= 200 && status < 300) || status === 302;
  }
});

const ShoppingCart = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
  };

  const showNotification = (message) => {
    setNotification(message);
  };

  const fetchCartItems = async () => {
    try {
      const accessToken = getAccessToken();
      
      if (!accessToken) {
        setError('Please login to view cart');
        return;
      }


      const response = await api.get('/api/user/getUserCart', {        
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.data?.data) {
        setCartItems(response.data.data);
        setError('');
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      
      const accessToken = getAccessToken();  
      

      await api.put('/api/user/updateCartItemQuantity',null,
         {
          params: {          
            cartItemId: cartItemId,
            newQuantity: newQuantity
          },headers: {
            'Authorization':` Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        });
        

      await fetchCartItems();
      showNotification(`quantity Updated`);
    } catch (error) {
      console.error('Error updating quantity:', error);
      handleError(error);
    }
  };
  const removeItem = async (cartItemId) => {
    try {
      const accessToken = getAccessToken();
      
      await api.put('/api/user/deletecartItem',null,
         {
            params: {              
              cartItemId: cartItemId
            },
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
      });

      await fetchCartItems();
      showNotification(`Removed item from cart`);
    } catch (error) {
      console.error('Error removing item:', error);
      handleError(error);
    }
  };
  
  const handleError = (error) => {
    if (error.response) {
      setError(error.response.data.message || 'Failed to complete operation');
    } else if (error.request) {
      setError('Server not responding. Please try again.');
    } else {
      setError('Operation failed. Please try again.');
    }
  };

  const handleCheckout = () => {
    // const checkoutItems = cartItems.map(item => ({
    //   product: item.product,
    //   variant: item.product.variants.find(v => v.weight === item.variantWeight),
    //   quantity: item.quantity,
    //   totalPrice: item.quantity * (item.price * (100 - item.discount) / 100)
    // }));
  
    // const totalAmount = checkoutItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
    navigate('/checkout1', {
      state: {
        items: cartItems,       
        isSingleProduct: false
      }
    });
  };

  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className='CartPage'>
           <h1 className='carthead'>Your Cart </h1>
        {/* Header */}
      <div className="header-grid">
        <div className="header-col-span"></div>
        <div className="header-text center-align">Quantity</div>
        <div className="header-flex">
          <div className="header-text">Action</div>
          <div className="header-text">Total</div>
        </div>
      </div>

      <div className="carts-div">
      
      {cartItems.map((cartItem,i) => (
        <CartItemRow key={i} cartItem={cartItem}  updateQuantity={updateQuantity} removeItem={removeItem} />
      ))}
    </div>
    <div className='checkoutbtndiv'> 
      <button className='checkoutbtn' onClick={handleCheckout}>Check Out</button>
    </div>

    </div>
  );
};

export default ShoppingCart;