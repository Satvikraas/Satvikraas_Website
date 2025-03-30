import React ,{useState}from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Home.module.scss";
// carousel hero sec
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
// carousel images
import caroImg1 from "../assets/Banners/HomeHero1.jpg";
import caroImg2 from "../assets/Banners/HomeHero2.jpg";
import caroImg3 from "../assets/Banners/HomeHero3.jpg";
import caroImg4 from "../assets/Banners/HomeHero4.jpg";
import caroImg5 from "../assets/Banners/HomeHero5.jpg";
import caroImg6 from "../assets/Banners/HomeHero6.jpg";

// frames
import frame1 from "../assets/frames/frame1.png";
import frame2 from "../assets/frames/frame2.png";
import frame3 from "../assets/frames/frame3.png";
import frame4 from "../assets/frames/frame4.png";
import frame5 from "../assets/frames/frame5.png";
import frame6 from "../assets/frames/frame6.png";
import frame7 from "../assets/frames/frame7.png";
// products
import product1 from "../assets/Products/product1.png";
import product2 from "../assets/Products/product2.png";
import product3 from "../assets/Products/product3.png";
import product4 from "../assets/Products/product4.png";
import product5 from "../assets/Products/product5.png";
import product6 from "../assets/Products/product6.png";
import product7 from "../assets/Products/product7.png";

//abt
import abtbg from "../Assets/Images/aboutbackgoundimg.svg";
import mascott from "../Assets/Images/mascott.svg";
//
import up1img from "../assets/Images/up2.png";
import up2img from "../assets/Images/up3.png";
import up3img from "../assets/Images/up1.png";

import processImage from "../Assets/Images/howitwork.svg";
import goodness from "../Assets/Images/goodness.jpg";
import noAdditives from "../Assets/Images/no-additives.svg"; // Example path, replace with your actual image paths
import handpicked from "../Assets/Images/handpicked.svg";
import madeWithLove from "../Assets/Images/made-with-love.svg";
import packedWithNutrients from "../Assets/Images/packed-with-nutrients.svg";

//insta
import instimg3 from "../Assets/Images/instimg3.png"
import instavid1 from "../Assets/vid/isntavid1.mp4"
import instavid2 from "../Assets/vid/isntavid2.mp4"
import instavid3 from "../Assets/vid/isntavid3.mp4"
import instavid4 from "../Assets/vid/isntavid4.mp4"
export default function Home() {
  const navigate = useNavigate();

  const offer1BuyHandle = () => {
    console.log("offer 1");
    const items = [
      { productId: 9, qty: 1, weight: 500 }, // Correctly formatted product object
    ];

    navigate("/checkout", {
      state: { items },
    });
  };

  const offer2BuyHandle = () => {
    console.log("Offer to Buy clicked");

    const items = [{ productId: 10, qty: 1, weight: 300 }]; // Correct structure

    navigate("/checkout", {
      state: { items }, // Pass items to checkout page
    });
  };
  // Hero Caoursel Images Links
  const CarouselImages = [
    { img: caroImg1, function: offer1BuyHandle },
    { img: caroImg2, function: offer2BuyHandle },
    { img: caroImg3, function: null },
    { img: caroImg4, function: null },
    { img: caroImg5, function: null },
    { img: caroImg6, function: null },
  ];
  // Top Products
  const products = [
    {
      id: 1,
      frame: frame2, // Replace with actual image paths,
      pimg: product6,
      name: "Garam Masala Powder",
    },
    {
      id: 2,
      frame: frame7,
      pimg: product4,
      name: "Red Chilli Powder",
    },
    {
      id: 3,
      frame: frame3,
      pimg: product3,
      name: "Kashmiri Chilli Powder",
    },
    {
      id: 1,
      frame: frame2, // Replace with actual image paths,
      pimg: product6,
      name: "Sabji Masala",
    },
    {
      id: 2,
      frame: frame1,
      pimg: product1,
      name: "Coriander Powder",
    },
    {
      id: 3,
      frame: frame2,
      pimg: product2,
      name: "Turmeric Powder",
    },
  ];

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
  return (
    <div className={styles.HomePage}>
      <div className={styles.heroSection}>
        <Carousel
          autoPlay
          interval={5000}
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          showIndicators={false}
          stopOnHover={false}
          swipeable={false}
        >
          {CarouselImages.map((image, index) => (
            <div onClick={image.function}>
              {" "}
              <div key={index}>
                <img
                  src={image.img}
                  alt={`Slide ${index + 1}`}
                  className={styles.fullscreenImage}
                />
              </div>{" "}
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.about}>
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
      </div>{" "}
      <div className={styles.topProductsSection}>
        <h2 className={styles.title}>Top Products</h2>
        <Swiper
          navigation={true}
          modules={[Navigation]}
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
              <div className={styles.productCard}>
                <img
                  src={product.frame}
                  alt={`Product ${product.id}`}
                  className={styles.productFrame}
                />
                <img
                  src={product.pimg}
                  alt={`Product ${product.id}`}
                  className={styles.productImage}
                />
                <h3>{product.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.uniqueProductSection}>
        <h1>Unique Products for you</h1>
        <div className={styles.cards}>
          <div className={styles.left}>
            <div className={styles.card1}>
              <img src={up1img} alt="" className={styles.upimg1} />
              <div className={styles.infoCard}>
                <h3>Turmeric Powder</h3>
                <p>
                  Golden goodness packed with anti-inflammatory benefits, Add
                  warmth and color to your recipes.
                </p>
                <button>Explore All</button>
              </div>
            </div>

            <div className={styles.card2}>
              <div className={styles.infoCard}>
                <h3>Dhaniya Powder</h3>
                <p>
                  Fresh and aromatic. Perfect for seasoning and adding a zesty
                  finish to your meals.
                </p>
                <button>Explore All</button>
              </div>
              <img src={up2img} alt="" className={styles.upimg2} />{" "}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.card3}>
              {" "}
              <img src={up3img} alt="" className={styles.upimg3} />{" "}
              <div className={styles.infoCard}>
                <h3>Red Chilly Powder</h3>
                <p>
                  "Bold heat with intense flavor. Elevate your dishes with the
                  fiery touch of 100% pure red chilies."
                </p>
                <button>Explore All</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* process */}
      <div className={styles.howItWorksSection}>
        <h2 className={styles.title}>How Satvik Raas Works</h2>
        <div className={styles.imageContainer}>
          <img
            src={processImage}
            alt="How Satvik Raas Works"
            className={styles.processImage}
          />
        </div>
      </div>
      <div>
        <img className={styles.goodnessimg} src={goodness} alt="" />
      </div>
      {/* Dedication section */}
      <div>
        <div className={styles.dedicationSection}>
          <h2 className={styles.title}>Dedication to Natural</h2>
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div key={index} className={styles.feature}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className={styles.image}
                />
                <p className={styles.text}>{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
    <img onClick={() => (window.location.href = "https://www.instagram.com/satvikraas/")} src={instimg3} alt="" />
    <video loop autoPlay muted src={instavid1}></video>
    <video loop autoPlay muted src={instavid4}></video>
    {/* <img src={instimg4} alt="" />
    <img src={instimg5} alt="" /> */}
      </div>
    </div>
</section>
      {/* faq */}
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
              <div className={styles.question} onClick={() => toggleFAQ(index)}>
                <span>
                  {index + 1}. {faq.question}
                </span>
                <span className={styles.toggleIcon}>
                  {openIndex === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 52 52"
                      fill="none"
                    >
                      <rect
                        width="52"
                        height="52"
                        rx="26"
                        transform="matrix(1 0 0 -1 0 52)"
                        fill="#DCF7F5"
                      />
                      <path
                        d="M15.75 31L25.75 21L35.75 31"
                        stroke="#226160"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="53"
                      height="52"
                      viewBox="0 0 53 52"
                      fill="none"
                    >
                      <rect
                        x="0.25"
                        width="52"
                        height="52"
                        rx="26"
                        fill="#DCF7F5"
                      />
                      <path
                        d="M16 21L26 31L36 21"
                        stroke="#226160"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div
                className={styles.answer}
                style={{
                  maxHeight: openIndex === index ? "200px" : "0",
                  opacity: 100,
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
