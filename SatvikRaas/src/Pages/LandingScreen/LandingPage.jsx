import React, { useCallback,useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {Link} from "react-router-dom"
import dhaniyaimg from "../../Assets/Images/dhaniyacard.jpg";
import chillyimg from "../../Assets/Images/chillycard.jpg";
import turmericimg from "../../Assets/Images/turmericcard.jpg"; 
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
import instimg1 from "../../Assets/Images/instimg1.png"
import instimg2 from "../../Assets/Images/instimg2.png"
import instimg3 from "../../Assets/Images/instimg3.png"
import instimg4 from "../../Assets/Images/instimg4.png"
import instimg5 from "../../Assets/Images/instimg5.png"

// vid
import instavid1 from "../../Assets/vid/isntavid1.mp4"
import instavid2 from "../../Assets/vid/isntavid2.mp4"
import instavid3 from "../../Assets/vid/isntavid3.mp4"
import instavid4 from "../../Assets/vid/isntavid4.mp4"

import styles from "./LandingPage.module.scss";
import mandalaimg from "../../Assets/Images/mandala.svg";
import abtbg from "../../Assets/Images/aboutbackgoundimg.svg";
import mascott from "../../Assets/Images/mascott.svg";
import chillipacket from "../../Assets/Images/chillipowder.svg";
import articalimg from "../../Assets/Images/artical.png";
import patternfaq from "./patternfaq.png"

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
import ReactDOM from "react-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import cimg1 from "../../Assets/Images/banner (1).jpg"
import cimg2 from "../../Assets/Images/banner (1).jpg"
import cimg3 from "../../Assets/Images/banner (2).jpg"
import cimg4 from "../../Assets/Images/Bannerh.jpg"
import cimg5 from "../../Assets/Images/banner new (1).jpg"
import cimg6 from "../../Assets/Images/banner new (2).jpg"
import cimg7 from "../../Assets/Images/banner new (3).jpg"

// goodness
import goodness from "../../Assets/Images/goodness.jpg"

const images = [
 cimg2,cimg3,cimg4,cimg5,cimg6,cimg7
];

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
// herosec img 
const [currentIndex1, setCurrentIndex1] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex1((prevIndex) => (prevIndex + 1) % images.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);
  return (
    <div className={styles.landingPage}>
      {/* <section className={styles.heroSection}>
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

      </section> */}
       <section className={styles.heroSection}>
      <Carousel  autoPlay
        interval={5000}
        infiniteLoop
        showThumbs={false} 
        showStatus={false} 
        showArrows={false} 
        showIndicators={false} 
        stopOnHover={false}
        swipeable={false}>
        {images.map((image, index) => (
        <Link to={"/cart"}>  <div key={index}>
             <img src={image} alt={`Slide ${index + 1}`} className={styles.fullscreenImage} /> 
            {/* <p className="legend">Legend {index + 1}</p>  */}
          </div> </Link>
        ))}
      </Carousel>
    </section> 
     {/* <section className={styles.heroSection}> 
      <img src={cimg4} alt="" />
     </section> */}
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
        Read Our Customers 
      </h2><h3 className={styles.highlight}>Reviews</h3>
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
{/* Instagram  */}
<section>
  <div className={styles.instagramSection}>
     <div className={styles.headinginsta}>
     <h2 className={styles.heading}> <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
  <path d="M21.4496 5.33325H43.8496C52.3829 5.33325 59.3162 12.2666 59.3162 20.7999V43.1999C59.3162 47.3019 57.6867 51.2359 54.7862 54.1365C51.8856 57.0371 47.9516 58.6666 43.8496 58.6666H21.4496C12.9162 58.6666 5.98291 51.7332 5.98291 43.1999V20.7999C5.98291 16.6979 7.61243 12.7639 10.513 9.86333C13.4136 6.96277 17.3476 5.33325 21.4496 5.33325ZM20.9162 10.6666C18.3702 10.6666 15.9284 11.678 14.128 13.4784C12.3277 15.2787 11.3162 17.7205 11.3162 20.2666V43.7332C11.3162 49.0399 15.6096 53.3332 20.9162 53.3332H44.3829C46.929 53.3332 49.3708 52.3218 51.1711 50.5215C52.9715 48.7211 53.9829 46.2793 53.9829 43.7332V20.2666C53.9829 14.9599 49.6896 10.6666 44.3829 10.6666H20.9162ZM46.6496 14.6666C47.5336 14.6666 48.3815 15.0178 49.0066 15.6429C49.6317 16.268 49.9829 17.1159 49.9829 17.9999C49.9829 18.884 49.6317 19.7318 49.0066 20.3569C48.3815 20.9821 47.5336 21.3333 46.6496 21.3333C45.7655 21.3333 44.9177 20.9821 44.2925 20.3569C43.6674 19.7318 43.3162 18.884 43.3162 17.9999C43.3162 17.1159 43.6674 16.268 44.2925 15.6429C44.9177 15.0178 45.7655 14.6666 46.6496 14.6666ZM32.6496 18.6666C36.1858 18.6666 39.5772 20.0713 42.0777 22.5718C44.5782 25.0723 45.9829 28.4637 45.9829 31.9999C45.9829 35.5361 44.5782 38.9275 42.0777 41.428C39.5772 43.9285 36.1858 45.3332 32.6496 45.3332C29.1134 45.3332 25.722 43.9285 23.2215 41.428C20.721 38.9275 19.3162 35.5361 19.3162 31.9999C19.3162 28.4637 20.721 25.0723 23.2215 22.5718C25.722 20.0713 29.1134 18.6666 32.6496 18.6666ZM32.6496 23.9999C30.5278 23.9999 28.493 24.8428 26.9927 26.3431C25.4924 27.8434 24.6496 29.8782 24.6496 31.9999C24.6496 34.1216 25.4924 36.1565 26.9927 37.6568C28.493 39.1571 30.5278 39.9999 32.6496 39.9999C34.7713 39.9999 36.8061 39.1571 38.3064 37.6568C39.8067 36.1565 40.6496 34.1216 40.6496 31.9999C40.6496 29.8782 39.8067 27.8434 38.3064 26.3431C36.8061 24.8428 34.7713 23.9999 32.6496 23.9999Z" fill="#226160"/>
</svg>Instagram</h2>
     </div>
      <div className={styles.instagramGrid}>
        <video  loop autoPlay muted src={instavid3}></video>
        <video loop autoPlay muted src={instavid2}></video>
    {/* <img src={instimg1} alt="" />
    <img src={instimg2} alt="" /> */}
    <img src={instimg3} alt="" />
    <video loop autoPlay muted src={instavid1}></video>
    <video loop autoPlay muted src={instavid4}></video>
    {/* <img src={instimg4} alt="" />
    <img src={instimg5} alt="" /> */}
      </div>
    </div>
</section>
      {/* FAQ */}
      <section>
      <div className={styles.faqSection}>
        <img className={styles.patternfaq} src={patternfaq} alt="" />
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
              {openIndex === index ? (
  <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
  <rect width="52" height="52" rx="26" transform="matrix(1 0 0 -1 0 52)" fill="#DCF7F5"/>
  <path d="M15.75 31L25.75 21L35.75 31" stroke="#226160" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
) :(
  <svg xmlns="http://www.w3.org/2000/svg" width="53" height="52" viewBox="0 0 53 52" fill="none">
    <rect x="0.25" width="52" height="52" rx="26" fill="#DCF7F5"/>
    <path d="M16 21L26 31L36 21" stroke="#226160" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
) }

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
