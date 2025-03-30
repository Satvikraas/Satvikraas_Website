import { useContext, useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import styles from "../styles/ProductPage.module.scss";
import HeroBanner from "../assets/Banners/productPageHeroBanner.webp";
import { useCart } from "../context/CartProvider.jsx";
import { useNavigate } from "react-router-dom";

const Products = () => { 
  const { products } = useProductContext(); // ✅ Correct way to access products
  return (
    <div className={styles.productsPage}>
      <div className={styles.pageContainer}>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.HeroBanner}>
            <img src={HeroBanner} alt="Hero Banner" />
          </div>
         
        </div>
        <div className={styles.headerText}>
            <h1>Combos</h1>
          </div>
        <div className={styles.productsContainer}>
          {products
            .filter((product) => product.category === "COMBO")
            .map((product, index) => (
              <ComboCard key={`${product.id}-${index}`} product={product} />
            ))}
        </div>
        <div className={styles.headerText}>
            <h1> Spices and Masalas</h1>
          </div>
        {/* Products List */}
        <div className={styles.productsContainer}>
          {products.   filter((product) => product.category != "COMBO").map((product, index) => (
            <ProductCard key={`${product.id}-${index}`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Product Card Component here
const ProductCard = ({ product }) => {
  
const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(() => {
    return product.variants?.[0];
  });

  // ------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      !selectedVariant ||
      !product.variants.some((v) => v.weight === selectedVariant.weight)
    ) {
      setSelectedVariant(product.variants?.[0]);
    }
  }, [product.variants]); // ✅ Runs only when product.variants change

  // ------------------------------------------------------------------------------------------------

  // Function to add the selected variant to the cart
  const handleAddToCart = async () => {
    addToCart(product.productId, selectedVariant.weight);
  };
  // ------------------------------------------------------------------------------------------------

  
  const handleBuyNow = () => {
    navigate("/productDetail", { state: { product } });
  };

  return (
    <div   className={product.category === "COMBO" ? styles.combo : styles.product}>
      <div className={styles.productCard}>
        {/* Product Image */}
        <img
  src={
    product.category === "COMBO"
      ? `data:image/jpeg;base64,${selectedVariant?.subImages?.[0]?.imageData}`
      : selectedVariant?.mainImage
      ? `data:image/jpeg;base64,${selectedVariant.mainImage}`
      : "fallback-image.jpg"
  }
  className={styles.productImage}
  alt={product.name}
/>


        {/* Variant Selection Buttons */}
        <div className={styles.variantButtons}>
          {product.variants?.map((variant, index) => (
            <button
              key={`${product.id}-${variant.weight}`}
              className={
                selectedVariant?.weight === variant.weight
                  ? styles.activeVariantButton
                  : ""
              }
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.weight} g
            </button>
          ))}
        </div>

        {/* Product Details */}
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.name}</h3>
          {selectedVariant && (
            <>
              <p className={styles.priceAmount}>
                Price: ₹ {selectedVariant.price}
              </p>
              {selectedVariant.discount > 0 && (
                <p>Discount: {selectedVariant.discount}%</p>
              )}
            </>
          )}
        </div>

        {/* Buy Button */}
        <button className={styles.addButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className={styles.buyButton} onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default Products;





// Product Card Component here
const ComboCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(() => {
    return product.variants?.[0];
  });

  // ------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (
      !selectedVariant ||
      !product.variants.some((v) => v.weight === selectedVariant.weight)
    ) {
      setSelectedVariant(product.variants?.[0]);
    }
  }, [product.variants]); // ✅ Runs only when product.variants change

  // ------------------------------------------------------------------------------------------------

  // Function to add the selected variant to the cart
  const handleAddToCart = async () => {
    addToCart(product.productId, selectedVariant.weight);
  };
  // ------------------------------------------------------------------------------------------------
  return (
    <div   className={product.category === "COMBO" ? styles.combo : styles.product}>
      <div className={styles.productCard}>
        {/* Product Image */}
        <img
  src={
    product.category === "COMBO"
      ? `data:image/jpeg;base64,${selectedVariant?.subImages?.[0]?.imageData}`
      : selectedVariant?.mainImage
      ? `data:image/jpeg;base64,${selectedVariant.mainImage}`
      : "fallback-image.jpg"
  }
  className={styles.productImage}
  alt={product.name}
/>


        {/* Variant Selection Buttons
        <div className={styles.variantButtons}>
          {product.variants?.map((variant, index) => (
            <button
              key={`${product.id}-${variant.weight}`}
              className={
                selectedVariant?.weight === variant.weight
                  ? styles.activeVariantButton
                  : ""
              }
              onClick={() => setSelectedVariant(variant)}
            >
              {variant.weight} g
            </button>
          ))}
        </div> */}

        {/* Product Details */}
        <div className={styles.productDetails}>
          <h3 className={styles.productName}>{product.name}</h3>
          {/* {selectedVariant && (
            <>
              <p className={styles.priceAmount}>
                Price: ₹ {selectedVariant.price}
              </p>
              {selectedVariant.discount > 0 && (
                <p>Discount: {selectedVariant.discount}%</p>
              )}
            </>
          )} */}
        </div>

        {/* Buy Button */}
        <button className={styles.buyButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
        {/* <button className={styles.buyButton}>Buy Now</button> */}
      </div>
    </div>
  );
};


