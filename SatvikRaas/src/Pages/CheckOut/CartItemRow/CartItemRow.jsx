import React,{ useState }  from 'react';
import { Trash2, ChevronDown } from 'lucide-react';
import './CartItemRow.css';
import { useNavigate } from 'react-router-dom';

const CartItemRow = ({isSingleProduct, cartItem,updateQuantity,removeItem }) => {

  const navigate = useNavigate();
  const productVariantDTO = cartItem.productVariantDTO;
  const [cartItemQuantity,setCartItemQuantity]=useState(cartItem.quantity)
  
 
  const addCartItemQuantityChange = () => {
    const newQuantity = cartItemQuantity + 1;
    setCartItemQuantity(newQuantity);
    updateQuantity(cartItem.id, newQuantity);
  };
  
  const reduceCartItemQuantityChange = () => {
    if (cartItemQuantity > 1) {
      const newQuantity = cartItemQuantity - 1;
      setCartItemQuantity(newQuantity);
      updateQuantity(cartItem.id, newQuantity);
    }
  };
  
  const handleRemoveItem = () => {
    removeItem(cartItem.id);
  };
  

  return (
    <div className="product-container">
      

      {/* Product Row */}
      <div className="product-row">
        <div className="product-info">
          <div className="product-image">
          <img 
        src={`data:image/jpeg;base64,${productVariantDTO?.mainImage}`} 
        className="product-image" 
       
        
      />
          </div>
          <div className="product-details">
            <h3>{productVariantDTO.productName}</h3>
            
            <div className="variant-dropdown"> Quantity : 
            {productVariantDTO?.weight}
            </div>

          </div>
        </div>

        <div className="quantity-txt ">
        {cartItemQuantity}
        </div>

        <div className="actions-container">
          <div className="actions-group">
            <button className="delete-button" disabled={isSingleProduct} onClick={handleRemoveItem}>
              <Trash2 size={20} />
            </button>
            <div className="quantity-controls">
              <button disabled={isSingleProduct} className="quantity-button"onClick={reduceCartItemQuantityChange}>-</button>
              <span className="quantity-display"> {cartItemQuantity}</span>
              <button disabled={isSingleProduct} className="quantity-button" onClick={addCartItemQuantityChange}>+</button>
            </div>
          </div>
          <div className="price">₹ {productVariantDTO.price*cartItemQuantity}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItemRow;