import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "./style.scss"; // Include SCSS file
import articleImage from "../Assets/Images/artical.png";

const articles = [
  {
    id: 1,
    image: articleImage,
    title: "The Underrated Super Spice in Your Kitchen",
    description:
      "Explore the surprising health benefits and culinary versatility of coriander (dhaniya) powder, from boosting digestion to enhancing your favorite dishes.",
    authorImage: "https://via.placeholder.com/40",
    authorName: "Rohit Verma",
    publishDate: "September 28, 2024",
    link: "#",
  },
  {
    id: 2,
    image: articleImage,
    title: "Discover the Magic of Turmeric",
    description:
      "Learn how turmeric can transform your recipes and contribute to your well-being with its powerful anti-inflammatory properties.",
    authorImage: "https://via.placeholder.com/40",
    authorName: "Priya Sharma",
    publishDate: "October 15, 2024",
    link: "#",
  },
  {
    id: 3,
    image: articleImage,
    title: "Benefits of Cumin in Everyday Cooking",
    description:
      "Cumin is more than a spice—it's a superfood! Discover its role in flavor enhancement and digestive health.",
    authorImage: "https://via.placeholder.com/40",
    authorName: "Ankit Tiwari",
    publishDate: "November 5, 2024",
    link: "#",
  },
  {
    id: 4,
    image: articleImage,
    title: "Cardamom: The Queen of Spices",
    description:
      "From chai to desserts, cardamom reigns supreme. Explore its unique aroma and health benefits in this article.",
    authorImage: "https://via.placeholder.com/40",
    authorName: "Sonia Gupta",
    publishDate: "November 18, 2024",
    link: "#",
  },
];

const TiltedSwiper = () => {
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={3} // Ensure 3 slides are visible
      loop={true} // Enable looping
      coverflowEffect={{
        rotate: 30, // Tilt cards
        stretch: 0, // Control spacing between slides
        depth: 150, // Perspective depth
        modifier: 1, // Adjust scaling effect
        slideShadows: false, // Remove slide shadows
      }}
      navigation={true}
      modules={[EffectCoverflow, Navigation]}
      className="tilted-swiper"
    >
      {articles.map((article) => (
        <SwiperSlide key={article.id} className="card">
          <div className="card">
            <img
              src={article.image}
              alt={article.title}
              className="card-image"
            />
            <div className="card-content">
              <h3 className="card-title">{article.title}</h3>
              <p className="card-description">{article.description}</p>
              <div className="card-footer">
                <div className="card-author-info">
                  <img
                    src={article.authorImage}
                    alt={article.authorName}
                    className="author-image"
                  />
                  <div className="author-details">
                    <p className="author-name">{article.authorName}</p>
                    <p className="publish-date">{article.publishDate}</p>
                  </div>
                </div>
                <a href={article.link} className="read-more">
                  Read more →
                </a>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TiltedSwiper;
