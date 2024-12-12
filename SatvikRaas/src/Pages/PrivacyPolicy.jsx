import React from "react";
import "./ResponsiveImages.scss"; // For styling

import img1 from "../Assets/Images/privacypolicyd.jpg";
import img2 from "../Assets/Images/privacypolicym.jpg";
const ResponsiveImages = () => {
  return (
    <div className="responsive-images-container">
      {/* Responsive Image */}
      <picture>
        <source media="(max-width: 768px)" srcSet={img2} />
        <source media="(min-width: 769px)" srcSet={img1} />
        <img
          src="path-to-desktop-image.jpg"
          alt="Responsive"
          className="responsive-image"
        />
      </picture>

      {/* Fullscreen Image */}
      {/* <img
        src="path-to-fullscreen-image.jpg"
        alt="Fullscreen"
        className="fullscreen-image"
      /> */}
    </div>
  );
};

export default ResponsiveImages;
