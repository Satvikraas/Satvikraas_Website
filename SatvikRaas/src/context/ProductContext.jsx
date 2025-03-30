import React, { createContext, useContext,useRef, useEffect, useState } from "react";
import { fetchProductsAPI } from "../api/apiService"; // Import API function
import { saveProductsToDB, getProductsFromDB } from "../utils/indexedDBService"; // IndexedDB functions


// Create Product Context
const ProductContext = createContext();

// ProductProvider Component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const fetchedOnce = useRef(false); // ✅ Fetch Products Once Time
  
  // ✅ Load products from IndexedDB first, then update from API
  const loadProducts = async () => {
    if (fetchedOnce.current) return; 

    fetchedOnce.current = true; 
    try {
      // Step 1️⃣: Get products from IndexedDB first
      const cachedProducts = await getProductsFromDB();
      if (cachedProducts.length > 0) {
        console.log("⚡ Using products from IndexedDB");
        setProducts(cachedProducts);
      }

      // Step 2️⃣: Fetch latest products from API in the background
      const apiProducts = await fetchProductsAPI();
      if (apiProducts.length > 0) {
        console.log("🌍 Fetched fresh products from API");
        setProducts(apiProducts);
        await saveProductsToDB(apiProducts); // ✅ Save new data to IndexedDB
      }
    } catch (error) {
      console.error("❌ Error loading products:", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loadProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook to use Product Context
export const useProductContext = () => {
  return useContext(ProductContext);
};
