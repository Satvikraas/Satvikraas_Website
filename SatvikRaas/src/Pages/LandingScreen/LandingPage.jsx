import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

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
import redchilli from "../../Assets/Images/Red Chilli.png"; 



import styles from "./LandingPage.module.scss";
import mandalaimg from "../../Assets/Images/mandala.svg";
import abtbg from "../../Assets/Images/aboutbackgoundimg.svg";
import mascott from "../../Assets/Images/mascott.svg";
import chillipacket from "../../Assets/Images/chillipowder.svg";
import articalimg from "../../Assets/Images/artical.png";


// Natural img 
import noAdditives from '../../Assets/Images/no-additives.svg'; // Example path, replace with your actual image paths
import handpicked from '../../Assets/Images/handpicked.svg';
import madeWithLove from '../../Assets/Images/made-with-love.svg';
import packedWithNutrients from '../../Assets/Images/packed-with-nutrients.svg';
// processimg 
import processImage from '../../Assets/Images/howitwork.svg';// Replace with the path to your image
// top products 
import pimg1 from "../../Assets/Images/redchilli.png"
import pimg2 from "../../Assets/Images/garam.png"
import pimg3 from "../../Assets/Images/sabji.png"
import pimg4 from "../../Assets/Images/pcard1.svg"
import pimg5 from "../../Assets/Images/pcard2.svg"
import pimg6 from "../../Assets/Images/pcard3.svg"

// goodness
import goodness from "../../Assets/Images/goodness.svg"
const HeroSection = () => {
  const imageRef = useRef(null);

  // products
const products = [
  {
    id: 1,
    image: pimg2, // Replace with actual image paths
  },
  {
    id: 2,
    image: pimg1,
  },
  {
    id: 3,
    image: pimg3,
  }
];
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


// faq 
const [openIndex, setOpenIndex] = useState(null);

const toggleFAQ = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

const faqs = [
  { question: "What makes Satvik Raas spices different from other brands?", answer: "Satvik Raas spices are uniquely crafted with authentic, organic, and high-quality ingredients." },
  // { question: "Are Satvik Raas products certified organic?", answer: "Yes, all our products are certified organic by reputable agencies." },
  { question: "How do I store Satvik Raas spices to keep them fresh?", answer: "Store them in a cool, dry place away from sunlight, ideally in airtight containers." },
  { question: "Does Satvik Raas offer free shipping?", answer: "Yes, we offer free shipping on orders above ₹999." },
  // { question: "What if I'm not satisfied with my purchase?", answer: "We offer a hassle-free return policy within 30 days of purchase." },
];
  // 

  // REVIEWS 
  const reviews = [
    {
      text: "Great spice mixes. I have used Satvik Raas , all products and they are not only yummy but feels so good for the tummy 😎. I have ulcerative colitis and these are superb for my health. I liked it very much 👍",
      author: " ",
      image: "https://via.placeholder.com/80", // Replace with real images
    },
    {
      text: "I have been using Satvik Raas spices for years, and the freshness is unmatched. It has truly elevated my cooking.",
      author: "Priya Sharma, Home Chef",
      image: "https://via.placeholder.com/80", // Replace with real images
    },
    {
      text: "Tried these spices from SatvikRaas... Specifically their red chilli powder, haldi and garam masala. It has Wonderful homelike taste withput any added colors or preservatives! I loved it and am ready to make these a constant in my spices ",
      author: "Home Chef",
      image: "https://via.placeholder.com/80", // Replace with real images
    },
    {
      text: "I recently tried your Satvik Raas products, and I am thoroughly impressed! The spices are rich in flavor and freshness, clearly reflecting your commitment to quality and authenticity. The Garam Masala and Turmeric Powder, in particular, stood out with their perfect aroma and taste. It’s evident that a lot of care goes into sourcing and crafting these blends. Keep up the great work!",
      author: "",
      image: "https://via.placeholder.com/80", // Replace with real images
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  // 
  // Dedication natural 


    const features = [
      {
        image: noAdditives,
        title: "No Artificial Colors or Additives",
      },
      {
        image: handpicked,
        title: "Handpicked Ingredients",
      },
      {
        image: madeWithLove,
        title: "Made with Love and Tradition",
      },
      {
        image: packedWithNutrients,
        title: "Packed with Nutrients",
      },
    ];
  // 

  // trending
   const topproducts = [
    {
      id: 1,
      title: "Red Chilly Powder",
      description:
        "Bold heat with intense flavor. Elevate your dishes with the fiery touch of 100% pure red chilies.",
      img: chillyimg,
    
    },
    {
      id: 2,
      title: "Turmeric Powder",
      img: pimg1 ,isLarge: false,
    },
    {
      id: 3,
      title: "Coriander Powder",
      img:pimg2 ,isLarge: false
    },
    {
      id: 4,
      title: "Kashmiri Chilli Powder",
      img: pimg3 ,isLarge: false
    }
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
            
            src={mandalaimg}
            alt="Nature Essence"
            className={styles.heroSection__img}
          />
        </div>{" "}
        <div className={styles.heroSection_chillipacket}>
          <img
            className={styles.herosection_chillipack}
            src={redchilli}
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
     <section>
     <div className={styles.topProductsSection}>
      <h2 className={styles.title}>Top Products</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className={styles.swiperContainer}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.cardWrapper}>
            <img src={product.image} alt={`Product ${product.id}`} className={styles.productImage} />
          </SwiperSlide>
        ))}
      </Swiper>
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
                  {/* <button className={styles.button}>
                    {product.buttonText}
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
{/* process */}
<section className={styles.howItWorksSection}>
      <h2 className={styles.title}>How Satvik Raas Works</h2>
      <div className={styles.imageContainer}>
        <img
          src={processImage}
          alt="How Satvik Raas Works"
          className={styles.processImage}
        />
      </div>
    </section>
    <section>
      <img className={styles.goodnessimg} src={goodness} alt="" />
    </section>
    {/* Trending pro */}
    <div className={styles.tcontainer}>
      <h2>Trending Products</h2>
      <div className={styles.trendingcardd}>
    <div> <img src={chillyimg}  className={styles.chillyimgt} alt="" />
    </div>
    <div className={styles.trendcard}>
      <Swiper
        spaceBetween={90}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className={styles.swiperContainer}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className={styles.cardWrapper}>
            <img src={product.image} alt={`Product ${product.id}`} className={styles.productImage} />
          </SwiperSlide>
        ))}
      </Swiper> </div>      </div>
    </div>
      {/* Dedication section */}
<section>
<div className={styles.dedicationSection}>
      <h2 className={styles.title}>Dedication to Natural</h2>
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            <img src={feature.image} alt={feature.title} className={styles.image} />
            <p className={styles.text}>{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
{/* REVIEWS  */}
<section>
<div className={styles.reviewsSection}>
      <h2 className={styles.title}>
        Read Our Customers <span className={styles.highlight}>Reviews</span>
      </h2>
      <div className={styles.reviewContainer}>
        <div className={styles.reviewContent}>
          <p className={styles.text}>"{reviews[currentIndex].text}"</p>
          <p className={styles.author}>{reviews[currentIndex].author}</p>
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => (
              <span key={index}>⭐</span>
            ))}
          </div>
        </div>
        {/* <div className={styles.reviewImages}>
          {reviews.map((review, index) => (
            <img
              key={index}
              src={review.image}
              alt={review.author}
              className={`${styles.image} ${
                currentIndex === index ? styles.active : ''
              }`}
            />
          ))}
        </div> */}
        <div className={styles.controls}>
          <button onClick={handlePrev} className={styles.arrow}>
            ←
          </button>
          <button onClick={handleNext} className={styles.arrow}>
            →
          </button>
        </div>
      </div>
    </div>
</section>
      {/* FAQ */}
      <section>
      <div className={styles.faqSection}>
      <h2 className={styles.heading}>FAQ's</h2>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div
            className={`${styles.faqItem} ${
              openIndex === index ? styles.open : ""
            }`}
            key={index}
          >
            <div
              className={styles.question}
              onClick={() => toggleFAQ(index)}
            >
              <span>{index + 1}. {faq.question}</span>
              <span className={styles.toggleIcon}>
                {openIndex === index ? "−" : "+"}
              </span>
            </div>
            <div
              className={styles.answer}
              style={{
                maxHeight: openIndex === index ? "200px" : "0", opacity:100
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      </section>
     

    </div>
  );
};

export default HeroSection;
