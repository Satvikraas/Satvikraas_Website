import React from "react";
import styles from "../styles/Aboutus.module.scss"; // For styling

import Mascott from "./Mascott.png";
import sec1 from "../Assets/Images/AboutSec1.png";
import sec2 from "../Assets/Images/AboutSec2.png";
import sec3 from "../Assets/Images/AboutSec3.png";

const Aboutus = () => {
  return (
    <div className={styles.AbtPage}>
      <div className={styles.heroSec}>
        <div className={styles.content}>
          <div>
            <h1>Taste in Every Pinch</h1>
            <p>
              Discover bold flavors and exotic aromas with our premium selection
              of spices
            </p>
          </div>
        </div>
        <div>
          {" "}
          <img className={styles.mascott} src={Mascott} alt="" />
        </div>
      </div>
      <div className={styles.sec1}>
        <div className={styles.textContent}>
          <h2>Satvik Raas Story</h2>
          <p>
            The inspiration of Satvik Raas started in our grandmothers' kitchen.
            We remain inspired by her nose for freshness and an uncanny ability
            to spot the best ingredients. At Satvik Raas our commitment to good
            and wholesome food takes us on a vast journey across India. A
            journey that begins in the farmer's fields of India and ends on your
            table. But the true origins lie in the pages of your grandmother's
            cookbooks and her old-fashioned recipes that preserve nutrition
            without compromising taste.
          </p>
          <ul>
            <li>
              At Satvik Raas we believe that 'backward is the new 'forward' when
              it comes to food.{" "}
            </li>
            <li>
              We go back in time to preserve the good old fashioned goodness and
              nutrients in the way it was meant to be but add the dash of
              convenience in the way it is meant to be eaten today.{" "}
            </li>
            <li>
              With our wide varieties of staples, snacks, condiments,
              superfoods, we are committed to serving you a truly amazing array
              that makes every meal nutritious, something your grandmother would
              approve of. It is about going back to the basics. After all,
              Nutrition is our only tradition.
            </li>
          </ul>
        </div>
        <div className={styles.img}>
          <img src={sec1} alt="" className={styles.secImg} />
        </div>
      </div>{" "}
      <div className={styles.sec2}>
        {" "}
        <div className={styles.img}>
          <img src={sec2} alt="" className={styles.secImg} />
        </div>
        <div className={styles.textContent}>
          <h2>Our Philosophy</h2>
          <p>
            We believe backward is the new forward. We are lucky to still have
            access to the gold mine of age- old wisdom which helped our
            grandparents live much stronger and healthier life. In today's
            times, we live in a truly global world, where boundaries are
            diminishing and we love to experiment and experience various
            cuisines and hence we have included many different flavours to our
            palate.
          </p>
          <ul>
            <li>
              Our core philosophy on developing our products is to merge the
              above two - our ancient age- old wisdom and our global palate.
            </li>
            <li>
              Hence we have taken the true essence of ingredients in its purest
              form and give them a modern, concurrent flavour and form to appeal
              to our urban global customer.
            </li>
            <li>
              To take the age- old “nuskhe” of our grandma’s and make them
              relevant in today’s world. To preserve the traditional recipes and
              making styles and give them the new age touch.
            </li>
          </ul>
        </div>
      </div>{" "}
      <div className={styles.sec1}>
        <div className={styles.textContent}>
          <h2>Our Sustainability</h2>
          <p>
            Sustainability is at the center of all that we do. At Orika, we have
            developed smarter manufacturing techniques and sustainable sourcing
            practices with prime focus on resiliency and long-term benefit of
            all the stakeholders including farmers, consumers, environment and
            society at large.We try to infuse the globally accepted sustainable
            farming practices while preserving the wisdom of traditional
            farming. This has helped the farmers in becoming more
            self-sufficient. At the same time, farmers can produce better
            quality with lower ecological footprint.
          </p>
          <ul>
            <li>Environmental sustainability of farms</li>
            <li>Safer spices</li>
            <li>Transparent & leaner supply chain improves quality</li>
          </ul>
        </div>
        <div className={styles.img}>
          <img src={sec3} alt="" className={styles.secImg} />
        </div>
      </div>{" "}
    </div>
  );
};

export default Aboutus;
