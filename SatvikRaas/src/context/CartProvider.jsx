import { createContext, useContext, useState, useEffect } from "react";

// ✅ Create Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState(() => {

    // ✅ Load cart from localStorage on initial render
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Save cart to localStorage whenever cartItems change
  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem("cart"); // ✅ Remove empty cart
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems)); // ✅ Save properly
    }
  }, [cartItems]);
  

  // ✅ Add product to cart (update quantity if exists)
  const addToCart = (productId, weight) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.productId === productId && item.weight === weight
      );
  console.log(cartItems);
  
      const minQtyProductsId = [1, 2, 8]; // Product IDs that require a minimum quantity of 2
      const minQty = minQtyProductsId.includes(productId) && weight === 100 ? 2 : 1;
  
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.productId === productId && item.weight === weight
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { productId, qty: minQty, weight }];
      }
  
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Update localStorage
      return updatedCart;
    });
    setIsCartSidebarOpen(true); // Open cart sidebar on add to cart

  };
  
  // ✅ Remove product from cart
  const removeFromCart = (productId, weight) => {
    setCartItems((prevCart) => {
      const updatedCart = prevCart.filter((item) => !(item.productId === productId && item.weight === weight));
  
      if (updatedCart.length === 0) {
        localStorage.removeItem("cart"); // ✅ Remove cart from storage if empty
      } else {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
  
      return updatedCart;
    });
  };
  
  // ✅ Update quantity of a product
  const updateCartQty = (productId, weight, newQty) => {
    const minQtyProductsId = [1, 2, 8]; // Product IDs that require a minimum qty of 2 for 100g
    const minQty = minQtyProductsId.includes(productId) && weight === 100 ? 2 : 1;
  
    if (newQty < minQty) {
      newQty = minQty; // Prevent reducing below min qty
    }
  
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.productId === productId && item.weight === weight
          ? { ...item, qty: newQty }
          : item
      )
    );
  };
  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartQty , isCartSidebarOpen, setIsCartSidebarOpen}}>
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook to use cart context
export const useCart = () => useContext(CartContext);
