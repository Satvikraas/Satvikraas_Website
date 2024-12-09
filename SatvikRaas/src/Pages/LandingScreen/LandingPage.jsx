import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Cardswiper from "../Cardswiper.jsx";

import dhaniyaimg from "../../Assets/Images/dhaniyacard.svg";
import chillyimg from "../../Assets/Images/chillycard.svg";
import turmericimg from "../../Assets/Images/turmericcard.svg"; 
import productsimg from "../../Assets/Images/products.svg";
import group from "../../Assets/Images/group.png";
import group2 from "../../Assets/Images/group2.png";
import turmeric from "../../Assets/Images/redmandala.png";
import yellowmandala from "../../Assets/Images/redmandala.png";
import coriamder from "../../Assets/Images/redmandala.png";
import greenmandala from "../../Assets/Images/redmandala.png";
import dhaniya from "../../Assets/Images/redmandala.png";
import darkgreenamndala from "../../Assets/Images/redmandala.png";



import styles from "./LandingPage.module.scss";
import mandalaimg from "../../Assets/Images/mandala.svg";
import abtbg from "../../Assets/Images/aboutbackgoundimg.svg";
import mascott from "../../Assets/Images/mascott.svg";
import chillipacket from "../../Assets/Images/chillipowder.svg";
import articalimg from "../../Assets/Images/artical.png";
const HeroSection = () => {
  const imageRef = useRef(null);

  // useEffect(() => {
  //   if (imageRef.current) {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: imageRef.current,
  //         start: "top 80%", // Animation starts when image enters viewport
  //         end: "bottom top", // Ends when image exits viewport
  //         scrub: 0.6, // Smooth scrubbing effect
  //         markers: true, // Debugging markers, remove in production
  //       },
  //     });

  //     // Animation sequence
  //     tl.to(imageRef.current, {
  //       width: "100%", // Scale up width
  //       translateY: "100%", // Move vertically by 100%
  //       opacity: 1, // Full opacity
  //       ease: "power1.inOut", // Smooth easing function
  //     });

  //     // Cleanup function
  //     return () => {
  //       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     };
  //   }
  // }, [imageRef]); // Add imageRef to dependencies

  // products
  const products = [
    {
      id: 1,
      name: "Kashmiri Chilli Powder",
      image: chillipacket,
     
      bgColor: "#DFF5D8",
    },
    { id: 2, name: "Turmeric Powder", image: chillipacket, bgColor: "#FFF1D8" },
    { id: 3, name: "Kasuri Methi", image: chillipacket, bgColor: "#E4F0D4" },
    {
      id: 4,
      name: "Kashmiri Chilli Powder",
      image: chillipacket,
      bgColor: "#FFE3D8",
    },
    { id: 5, name: "Kasuri Methi", image: chillipacket, bgColor: "#E4F0D4" },
  ];
  //

  // products
  const productssection = [
    {
      id: 1,
      name: "Turmeric Powder",
      description:
        "Golden goodness packed with anti-inflammatory benefits. Add warmth and color to your recipes.",
      image: turmericimg,
      buttonText: "Explore All",
    },
    {
      id: 2,
      name: "Dhaniya Powder",
      description:
        "Fresh and aromatic. Perfect for seasoning and adding a zesty finish to your meals.",
      image: dhaniyaimg,
      buttonText: "View All",
    },
    {
      id: 3,
      name: "Red Chilly Powder",
      description:
        "Bold heat with intense flavor. Elevate your dishes with the fiery touch of 100% pure red chilies.",
      image: chillyimg,
      buttonText: "Explore All",
    },
  ];

  // Articles and news
  const articles = [
    {
      image: "https://via.placeholder.com/400x300", // Replace with your actual image URL
      title: "The Underrated Super Spice in Your Kitchen",
      description:
        "Explore the surprising health benefits and culinary versatility of coriander (dhaniya) powder, from boosting digestion to enhancing your favorite dishes.",
      author: "Rohit Verma",
      date: "September 28, 2024",
    },
    {
      image: "https://via.placeholder.com/400x300",
      title: "Why Freshness Matters in Spices",
      description:
        "Discover how the freshness of spices like red chilly powder can transform your cooking.",
      author: "Anjali Mehra",
      date: "October 12, 2024",
    },
    {
      image: "https://via.placeholder.com/400x300",
      title: "Unlocking the Secrets of Turmeric",
      description:
        "Discover the health and culinary benefits of turmeric in everyday cooking.",
      author: "Anjali Mehra",
      date: "October 12, 2024",
    },
  ];
  return (
    <div className={styles.landingPage}>
      <section className={styles.heroSection}>
        <div className={styles.heroSection__content}>
          <h1 className={styles.heroSection__title}>
            Experience the True Essence of Nature in Every Pinch
          </h1>
        </div>
        <div className={styles.heroSection__image}>
          <img
            ref={imageRef}
            src={mandalaimg}
            alt="Nature Essence"
            className={styles.heroSection__img}
          />
        </div>{" "}
        <div className={styles.heroSection_chillipacket}>
          <img
            className={styles.herosection_chillipack}
            src={chillipacket}
            alt="chilli powder"
          />
        </div>
      </section>
      <section className={styles.about}>
        <img className={styles.abtbgimg} src={abtbg} alt="bgimg" />
        <div className={styles.about__content}>
          <h2 className={styles.about__title}>About Satvik Raas</h2>
          <p className={styles.about__description}>
            At Satvik Raas, we believe that the true flavour lies in
            authenticity. Our spices are sourced directly from India's most
            trusted farms, with time-honoured traditions that give each blend
            its unique essence. From handpicking the finest ingredients to using
            age-old methods of processing, we ensure that every spice you use is
            a reflection of purity and heritage.
          </p>
        </div>
        <div className={styles.about__image}>
          <img src={mascott} alt="Satvik Raas" className={styles.about__img} />
        </div>
      </section>{" "}
      <section className={styles.container}>
        {" "}
        <div className={styles.swiperContainer}>
          <h2 className={styles.title}>Top Products</h2>
          <img src={productsimg}></img>
          {/* <Swiper
            slidesPerView={1}
            spaceBetween={20}
            navigation={false}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            modules={[Navigation]}
            className={styles.swiper}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <div
                  className={styles.card}
                  style={{ backgroundColor: product.bgColor }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.image}
                  />
                  <p className={styles.productName}>{product.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}
        </div>
      </section>
      <section className={styles.container}>
        <h2 className={styles.title}>Unique Products for you</h2>
        <div className={styles.cards}>
          {productssection.map((product, index) => (
            <div
              key={product.id}
              className={`${styles.card} ${styles[`card${index + 1}`]}`}
            >
              <div className={styles.imageContainer}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.description}>{product.description}</p>
                  <button className={styles.button}>
                    {product.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
     
      {/* news and articles  */}
      {/* <Cardswiper /> */}
      <img src={group} alt="" />
      <img src={group2} alt="" />
    </div>
  );
};

export default HeroSection;
