
import React, { useState , useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/ProductDetails.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import certified from "../Assets/Images/certified.svg";
import alogo from "../Assets/Images/amazonlogo.png"
import { Splide, SplideSlide } from '@splidejs/react-splide';
const getProductLink = (productName) => {
  if (productName === "Red Chilli Powder") {
    return "https://www.amazon.in/SatvikRaas-Red-Chilli-Powder/dp/B0DS51CWCK?ref_=ast_sto_dp";
  } else if (productName === "Coriander Powder") {
    return "https://www.amazon.in/SatvikRaas-Coriander-Powder/dp/B0DS4YJJDD?ref_=ast_sto_dp";
  } else if (productName === "Garam Masala Powder") {
    return "https://www.amazon.in/SatvikRaas-Garam-Masala-Premium/dp/B0DS4Y925P?ref_=ast_sto_dp";
  } else if (productName === "Kitchen King Masala") {
    return "https://www.amazon.in/SatvikRaas-Kitchen-King-Masala/dp/B0DS4SPDKV?ref_=ast_sto_dp";
  } else if (productName === "Yellow Hing Powder") {
    return "https://www.amazon.in/SatvikRaas-Yellow-Hing-Powder/dp/B0DS4V93Q9?ref_=ast_sto_dp";
  } else if (productName === "Sabji Masala") {
    return "https://www.amazon.in/SatvikRaas-Sabji-Masala/dp/B0DS4SBK56?ref_=ast_sto_dp";
  } else if (productName === "Kashmiri Chilli Powder") {
    return "https://www.amazon.in/SatvikRaas-Kashmiri-Chilli-Powder/dp/B0DS4NDGSL?ref_=ast_sto_dp";
  } else if (productName === "Turmeric Powder") {
    return "https://www.amazon.in/SatvikRaas-Turmeric-Powder/dp/B0DS4V1LTH?ref_=ast_sto_dp";
  } else {
    return null;
  }
};



const ProductDetailPage = () => { 
 
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;
console.log(product);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || {}
  );
  const [currentView, setCurrentView] = useState("main"); // 'main' or 'sub'
  const [subImageIndex, setSubImageIndex] = useState(0);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setCurrentView("main"); // Reset to main image when variant changes
    setSubImageIndex(0); // Reset sub-image index
  };

 


 //QTY CHANGE

 const minQtyProductsId = [1, 2, 8];
 const [quantity, setQuantity] = useState(1);
 
 useEffect(() => {
   if (selectedVariant) {
     const minQuantity = minQtyProductsId.includes(selectedVariant.id) && selectedVariant.weight === 100 ? 2 : 1;
     setQuantity(minQuantity);
   }
 }, [selectedVariant]); // Runs when selectedVariant changes
 
 const handleQuantityChange = (action) => {
   const minQuantity = minQtyProductsId.includes(selectedVariant.id) && selectedVariant.weight === 100 ? 2 : 1;
 
   setQuantity((prevQuantity) => {
     if (action === "increment") {
       return prevQuantity + 1;
     } else if (action === "decrement" && prevQuantity > minQuantity) {
       return prevQuantity - 1;
     }
     return prevQuantity; // Ensures quantity never goes below the minimum
   });
 };
 

// BUY NOW BTN
  const handleBuyNow = () => {
    const items = [{ productId: selectedVariant.id, qty: quantity, weight: selectedVariant.weight }]; // Correct structure
  console.log(items);
    navigate("/checkout", {
      state: { items }, // Pass items to checkout page
    });
    
  };

const PImages =[selectedVariant.mainImage, selectedVariant.subImages]


  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        {/* Left Section: Image Carousel */}
      
 <div className={styles.imageSection}>
          {/* Main Image Display */}
          <div className={styles.mainImageContainer}>
            <img
              src={`data:image/jpeg;base64,${
                currentView === "main"
                  ? selectedVariant.mainImage
                  : selectedVariant.subImages[subImageIndex].imageData
              }`}
              alt={product.name}
              className={styles.mainImage}
            />
            {/* {currentView === "sub" && (
    <span className={styles.imageCounter}>
      {subImageIndex + 1}/{selectedVariant.subImages.length}
    </span>
  )} */}
          </div>

          {/* Image Carousel */}
          <Swiper
            slidesPerView={3}
         
            className={styles.imageCarousel}
          >
            {/* Main Thumbnail */}
            <SwiperSlide>
              <div
                className={`${styles.thumbnaildiv} ${
                  currentView === "main" ? styles.active : ""
                }`}
              >
                <img
                  src={`data:image/jpeg;base64,${
                    currentView === "main"
                      ? selectedVariant.mainImage
                      :  selectedVariant.mainImage
                  }`}
                  alt="Main Thumbnail"
                  onClick={() => setCurrentView("main")}
                  className={styles.thumbnail}
                />
              </div>
            </SwiperSlide>

            {/* Sub Thumbnails */}
            {selectedVariant.subImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`${styles.thumbnaildiv} ${
                    currentView === "sub" && subImageIndex === index
                      ? styles.active
                      : ""
                  }`}
                >
                  <img
                    src={`data:image/jpeg;base64,${img.imageData}`} // Use your image data here
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => {
                      setCurrentView("sub");
                      setSubImageIndex(index); // Update the current sub-image index
                    }}
                    className={styles.thumbnail}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
     
        

        {/* Right Section: Product Details */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.description}>{product.description} </p>
          <div className={styles.pricing}>
            {/* <span className={styles.originalPrice}>₹260</span> */}
            <span className={styles.discountedPrice}>
              {" "}
              ₹
              {(selectedVariant.price * (100 - selectedVariant.discount)) / 100}
            </span>
          </div>
          <div className={styles.rating}>
            <span>⭐⭐⭐⭐☆</span>
            <span>4.5</span>
          </div>

          {/* Quantity Selector */}
          <div className={styles.quantity}>
      

            <label htmlFor="variantSelect">Quantity:</label>
            <select
              id="variantSelect"
              className={styles.quantitySelect}
              onChange={(e) =>
                handleVariantChange(product.variants[e.target.value])
              }
            >
              {product.variants?.map((variant, index) => (
                <option key={index} value={index}>
                  {variant.weight} g
                </option>
              ))}
            </select>

            <div className={styles.quantityContainer}>
              <button
                onClick={() => handleQuantityChange("decrement")}
                className={styles.quantityButton}
              >
                -
              </button>
              <span className={styles.quantityDisplay}>{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
          </div>
{console.log(product)}
          <button className={styles.buyNow} onClick={handleBuyNow}>
            Buy Now
          </button>
          <button
            className={styles.buyamazonbtn}
            onClick={() => {
              const url = getProductLink(product.name);
              if (url) {
                window.location.href = url;
              } else {
                alert("Product link not available!");
              }
            }}
          >
         <img src={alogo} alt="" />   Buy From Amazon
          </button>

          <div>
            <img src={certified} alt="" className={styles.certimg} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
