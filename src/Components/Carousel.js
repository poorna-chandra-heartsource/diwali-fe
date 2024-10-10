import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/carousel.css";

const Carousel = ({ images, onClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} onClick={onClick}>
            <img
              src={`${process.env.PUBLIC_URL}${image}`}
              alt={`Diwali ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
