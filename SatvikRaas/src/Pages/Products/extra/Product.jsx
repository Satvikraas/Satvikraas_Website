import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
});

const Product = ({ product }) => {
  // Ensure product exists before accessing its properties
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  

  const getAccessToken = () => {
    return localStorage.getItem('accessToken');
  };

  // const getEmail = () => {
  //   return localStorage.getItem('email');
  // };

 
  
 

  const handleAddToCart = async () => {

    // if(accessTokenIsExpired){
    //   refreshToken();
    //   setError("try again")
    // }
    setLoading(true);
    setError('');

    try {
      const accessToken = getAccessToken();

      if (!accessToken) {
        setError('Please login to add items to cart');
        return;
      }

      // Access productId directly from product object
      if (!product?.productId) {
        console.error('Product data:', product); // For debugging
        setError('Product ID is missing');
        return;
      }

      const response = await api.post(
        '/api/user/addProductInCart',
        null, // empty body
        {
          params: {
            // email: 'akash@Gmail.com',
            // email:localStorage.getItem('email'),
            productId: product.productId // Access productId directly
          },
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log('Product added successfully!');
      }
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        request: error.request,
        productData: product // Log product data for debugging
      });

      if (error.response) {
        setError(error.response.data.message || 'Failed to add product');
      } else if (error.request) {
        setError('Server not responding. Please try again.');
      } else {
        setError('Error adding product to cart');
      }
    } finally {
      setLoading(false);
    }
  };
  const handleBuyNow = () => {
    // Navigate to product details page with product data
    navigate(`/productDetail`, { 
      state: { 
        product: product
        
      }
    });
  };

  // Add loading state for initial product data
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-card">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <img 
        src={`data:image/jpeg;base64,${selectedVariant?.mainImage}`} 
        className="product-image" 
        alt={product.name}
      />
      
      <h3>{product.name}</h3>
      {/* <p>ID: {product.productId}</p> */}
      
      {selectedVariant && (
        <>
          {/* <p>{selectedVariant.weight} g</p> */}
          <p>Price: {selectedVariant.price}</p>
          
          {selectedVariant.discount > 0 && (
            <p>Discount: {selectedVariant.discount}%</p>
          )}
        </>
      )}

      <div className="variant-buttons">
        {product.variants?.map((variant, index) => (
          <button
            key={index}
            className={variant === selectedVariant ? 'active' : ''}
            onClick={() => handleVariantChange(variant)}
          >
            {variant.weight} g
          </button>
        ))}
      </div>

      <button 
        onClick={handleAddToCart} 
        disabled={loading}
        className="add-cart-button"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
      
      <button className="buy-button" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default Product;