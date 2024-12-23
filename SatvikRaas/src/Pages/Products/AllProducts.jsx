import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AllProductPage.module.scss";
import api from "../../api.jsx";
import productsimg from "../../Assets/Images/products.png";
import productsimg2 from "../../Assets/Images/productsimg2.png";
import productsimgdesktop from "../../Assets/Images/productdesk.jpg";
import productsimgmob from "../../Assets/Images/productmob.jpg";

// const api = axios.create({
//   baseURL: 'http://localhost:8080',
//   withCredentials: true,
// });
const LoadingCard = () => (
  <div className={styles.loadingCard}>
    <div className={styles.skeletonImage}></div>
    <div className={styles.skeletonText}></div>
    <div className={styles.skeletonText}></div>
    <div className={styles.skeletonButton}></div>
  </div>
);

const Product = ({ product, filters }) => {
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const getAccessToken = () => sessionStorage.getItem("accessToken");

  const handlecartopen = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("Please Login First");
      navigate("/login");
    } else {
    }
  };

  const handleAddToCart = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      alert("Please Login First");
      navigate("/login");
    } else {
      setLoading(true);
      setError("");

      try {
        const accessToken = getAccessToken();
        if (!accessToken) {
          setError("Please login to add items to cart");
          return;
        }

        const response = await api.post("/api/user/addProductInCart", null, {
          params: { productVarientId: selectedVariant.id },
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (response.status === 200 || response.status === 201) {
          alert("Product added successfully!");
        }
      } catch (error) {
        if (error.response?.status === 409) {
          alert("Item already in cart!");
        } else {
          alert("Failed to add product to cart");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBuyNow = () => {
    navigate("/productDetail", { state: { product } });
  };

  // Apply Filters
  const matchesFilters = () => {
    const matchesCategory =
      !filters.category || product.category === filters.category;
    const matchesWeight =
      !filters.weight ||
      product.variants.some((v) => v.weight === parseInt(filters.weight));
    const matchesPrice =
      !filters.price ||
      (filters.price === "low" &&
        product.variants.some((v) => v.price < 200)) ||
      (filters.price === "high" &&
        product.variants.some((v) => v.price >= 200));
    return matchesCategory && matchesWeight && matchesPrice;
  };

  if (!matchesFilters()) return null;

  return (
    <div className={styles.productCard}>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <img
        src={`data:image/jpeg;base64,${selectedVariant?.mainImage}`}
        className={styles.productImage}
        alt={product.name}
      />

      <div className={styles.variantButtons}>
        {product.variants?.map((variant, index) => (
          <button
            key={index}
            className={variant === selectedVariant ? styles.active : ""}
            onClick={() => handleVariantChange(variant)}
          >
            {variant.weight} g
          </button>
        ))}{" "}
        <button
          onClick={handleAddToCart}
          disabled={loading}
          className={styles.addCartButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M292.31-115.38q-25.31 0-42.66-17.35-17.34-17.35-17.34-42.65 0-25.31 17.34-42.66 17.35-17.34 42.66-17.34 25.31 0 42.65 17.34 17.35 17.35 17.35 42.66 0 25.3-17.35 42.65-17.34 17.35-42.65 17.35Zm375.38 0q-25.31 0-42.65-17.35-17.35-17.35-17.35-42.65 0-25.31 17.35-42.66 17.34-17.34 42.65-17.34t42.66 17.34q17.34 17.35 17.34 42.66 0 25.3-17.34 42.65-17.35 17.35-42.66 17.35ZM235.23-740 342-515.38h265.38q6.93 0 12.31-3.47 5.39-3.46 9.23-9.61l104.62-190q4.61-8.46.77-15-3.85-6.54-13.08-6.54h-486Zm-19.54-40h520.77q26.08 0 39.23 21.27 13.16 21.27 1.39 43.81l-114.31 208.3q-8.69 14.62-22.58 22.93-13.88 8.31-30.5 8.31H324l-48.62 89.23q-6.15 9.23-.38 20 5.77 10.77 17.31 10.77h435.38v40H292.31q-35 0-52.23-29.5-17.23-29.5-.85-59.27l60.15-107.23L152.31-820H80v-40h97.69l38 80ZM342-515.38h280-280Z" />
          </svg>
        </button>
      </div>
      {/* IMP */}
      <h3 className={styles.pname}>{product.name}</h3>
      {selectedVariant && (
        <>
          <p>Price: ₹ {selectedVariant.price}</p>
          {selectedVariant.discount > 0 && (
            <p>Discount: {selectedVariant.discount}%</p>
          )}
        </>
      )}
      <button className={styles.buyButton} onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

const ProductList = ({ products, filters, isLoading }) => (
  <div className={styles.productList}>
    {isLoading
      ? Array.from({ length: 6 }).map((_, index) => (
          <LoadingCard key={index} />
        )) // Render 6 loading cards as placeholders
      : products.map((product) => (
          <Product key={product.productId} product={product} filters={filters} />
        ))}
  </div>
);

const App = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    weight: "",
    price: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  useEffect(() => {
    setIsLoading(true); // Set loading to true before fetching
    fetch("https://api.satvikraas.com/api/public/getAllProducts")
      .then((response) => response.json())
      .then((data) => {
        if (data.data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setError("Invalid response format from the backend");
        }
      })
      .catch((error) => setError("Error fetching products: " + error))
      .finally(() => setIsLoading(false)); // Set loading to false after fetch
  }, []);
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.filters}>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Category</option>
            <option value="spices">Spices</option>
            <option value="herbs">Herbs</option>
          </select>
          <select
            name="weight"
            value={filters.weight}
            onChange={handleFilterChange}
          >
            <option value="">Weight</option>
            <option value="100">100g</option>
            <option value="500">500g</option>
          </select>
          <select
            className={styles.pricefilter}
            name="price"
            value={filters.price}
            onChange={handleFilterChange}
          >
            <option value="">Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </header>

      {/* <img className={styles.productimg} src={productsimg} alt="" /> 
      <img className={styles.productimg} src={productsimg2} alt="" />  */}

      {error && <div className={styles.errorMessage}>{error}</div>}
      <ProductList products={products} filters={filters} isLoading={isLoading} />
    </div>
  );
};

export default App;
