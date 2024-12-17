// import React, { useState } from 'react';
// import { ChevronLeft, ChevronRight, Share2, Minus, Plus } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import styles from './ProductDetails.module.scss';

// const ProductDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const product = location.state.product;

//   const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || {});
//   const [currentView, setCurrentView] = useState('main');
//   const [subImageIndex, setSubImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   const handleQuantityChange = (action) => {
//     if (action === 'increment') {
//       setQuantity((prev) => prev + 1);
//     } else if (action === 'decrement' && quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//   };

//   const handleVariantChange = (variant) => {
//     setSelectedVariant(variant);
//   };

//   const handlePrevImage = () => {
//     if (currentView === 'sub') {
//       setSubImageIndex((prev) =>
//         prev === 0 ? selectedVariant.subImages.length - 1 : prev - 1
//       );
//     }
//   };

//   const handleNextImage = () => {
//     if (currentView === 'sub') {
//       setSubImageIndex((prev) =>
//         prev === selectedVariant.subImages.length - 1 ? 0 : prev + 1
//       );
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: product.name,
//           text: product.description,
//           url: window.location.href,
//         });
//       } catch (error) {
//         console.error('Error sharing:', error);
//       }
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//     }
//   };

//   const handleBuyNow = () => {
//     const items = [
//       {
//         id: product.id,
//         product: product,
//         quantity: quantity,
//       },
//     ];

//     navigate('/checkout', {
//       state: {
//         items: items,
//         isSingleProduct: true,
//       },
//     });
//   };

//   return (
//     <div className={styles.productContainer}>
//       {/* Image Section */}
//       <div className={styles.imageSection}>
//         <div className={styles.mainImageContainer}>
//           <img
//             sr c={`data:image/jpeg;base64,${
//               currentView === 'main'
//                 ? selectedVariant.mainImage
//                 : selectedVariant.subImages[subImageIndex]
//             }`}
//             alt={product.name}
//             className={styles.mainImage}
//           />
//           {currentView === 'sub' && (
//             <span className={styles.imageCounter}>
//               {subImageIndex + 1}/{selectedVariant.subImages?.length || 0}
//             </span>
//           )}
//         </div>
//         <div className={styles.thumbnailContainer}>
//           <button
//             onClick={() => setCurrentView('main')}
//             className={`${styles.thumbnail} ${
//               currentView === 'main' ? styles.active : ''
//             }`}
//           >
//             <img
//               src={`data:image/jpeg;base64,${selectedVariant.mainImage}`}
//               alt="Main Thumbnail"
//             />
//           </button>
//           {selectedVariant.subImages?.map((img, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setCurrentView('sub');
//                 setSubImageIndex(index);
//               }}
//               className={`${styles.thumbnail} ${
//                 currentView === 'sub' && subImageIndex === index
//                   ? styles.active
//                   : ''
//               }`}
//             >
//               <img src={`data:image/jpeg;base64,${img.imageData}`} alt={`Thumbnail ${index + 1}`} />
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className={styles.infoSection}>
//         <h1 className={styles.productTitle}>{product.name}</h1>
//         <p className={styles.productDescription}>{product.description}</p>
//         <div className={styles.priceSection}>
//           <span className={styles.discountedPrice}>
//             ₹{(selectedVariant.price * (100 - selectedVariant.discount)) / 100}
//           </span>
//           <span className={styles.originalPrice}>₹{selectedVariant.price}</span>
//         </div>
//         <div className={styles.variantContainer}>
//           {product.variants?.map((variant, index) => (
//             <button
//               key={index}
//               onClick={() => handleVariantChange(variant)}
//               className={`${styles.variantButton} ${
//                 selectedVariant === variant ? styles.active : ''
//               }`}
//             >
//               {variant.weight} g
//             </button>
//           ))}
//         </div>
// <div className={styles.quantityContainer}>
//   <button
//     onClick={() => handleQuantityChange('decrement')}
//     className={styles.quantityButton}
//   >
//     <Minus />
//   </button>
//   <span className={styles.quantityDisplay}>{quantity}</span>
//   <button
//     onClick={() => handleQuantityChange('increment')}
//     className={styles.quantityButton}
//   >
//     <Plus />
//   </button>
// </div>
//         <button className={styles.buyNowButton} onClick={handleBuyNow}>
//           Buy Now
//         </button>
//         <button className={styles.shareButton} onClick={handleShare}>
//           <Share2 />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./ProductDetails.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img from "../../Assets/Images/chillipowder.svg";
import img2 from "../../Assets/Images/redchillib.png";
import certified from "../../Assets/Images/certified.svg";
const ProductDetailPage = () => {
  const [mainImage, setMainImage] = useState(img);
  const subImages = [img2, img, img2, img2, img, img2];
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state.product;

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

  const handleSubImageClick = (index) => {
    setCurrentView("sub");
    setSubImageIndex(index);
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  const handleBuyNow = () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      navigate("/login");
    } else {
      const items = [
        {
          id: "",
          productVariantDTO: selectedVariant,
          quantity: quantity,
        },
      ];

      navigate("/checkout1", {
        state: {
          items: items,
          isSingleProduct: true,
        },
      });
    }
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.productContainer}>
        {/* Left Section: Image Carousel */}
        <div className={styles.imageSection}>
          {/* Main Image Display */}
          <div className={styles.mainImageContainer}>
            <img
              // src={
              //   currentView === "main" ? mainImage : subImages[subImageIndex]
              // }
              src={`data:image/jpeg;base64,${
                              currentView === 'main'
                                ? selectedVariant.mainImage
                                : selectedVariant.subImages[subImageIndex]
                            }`}
              alt={product.name}
              className={styles.mainImage}
            />
            {currentView === "sub" && (
              <span className={styles.imageCounter}>
                {/* {subImageIndex + 1}/{subImages.length} */}
              </span>
            )}
          </div>

          {/* Image Carousel */}
          <Swiper
            slidesPerView={4}
            spaceBetween={50}
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
                  // src={`data:image/jpeg;base64,${
                  //   currentView === "main"
                  //     ? selectedVariant.mainImage
                  //     : selectedVariant.subImages[subImageIndex]
                  // }`}
                  // src={mainImage} 
                   src={`data:image/jpeg;base64,${selectedVariant.mainImage}`}
//            
                  alt="Main Thumbnail"
                  onClick={() => setCurrentView("main")}
                  className={styles.thumbnail}
                />
              </div>
            </SwiperSlide>

            {/* Sub Thumbnails */}
                   <div className={styles.thumbnailContainer}>
           <button
             onClick={() => setCurrentView('main')}
             className={`${styles.thumbnail} ${
               currentView === 'main' ? styles.active : ''
             }`}
           >
             <img
               src={`data:image/jpeg;base64,${selectedVariant.mainImage}`}
               alt="Main Thumbnail"
             />
           </button>
           {selectedVariant.subImages?.map((img, index) => (
             <button
               key={index}
               onClick={() => {
                 setCurrentView('sub');
                 setSubImageIndex(index);
               }}
               className={`${styles.thumbnail} ${
                 currentView === 'sub' && subImageIndex === index
                   ? styles.active
                   : ''
               }`}
             >
               <img src={`data:image/jpeg;base64,${img.imageData}`} alt={`Thumbnail ${index + 1}`} />
             </button>
           ))}
         </div> 
          </Swiper>
        </div>

        {/* Right Section: Product Details */}
        <div className={styles.detailsSection}>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.description}>{product.description} </p>
          <div className={styles.pricing}>
            <span className={styles.originalPrice}>₹260</span>
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

          <button className={styles.buyNow} onClick={handleBuyNow}>
            Buy Now
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
