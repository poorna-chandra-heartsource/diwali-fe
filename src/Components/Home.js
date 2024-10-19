import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import OurProducts from "./OurProducts";
import "../Styles/home.css";

const images = [
  "/Images/Diwali-Img1.png",
  "/Images/diwali-image-text.png",
  "/Images/diwali-image-2.png",
  "/Images/Diwali-image-4.png",
];

const Home = () => {
  const navigate = useNavigate();

  const handleGoToProductPage = () => {
    navigate("/products");
  };

  return (
    <div className="home-container">
      <div className="carousel-container">
        <Carousel images={images} onClick={handleGoToProductPage} />
      </div>
      <div className="products-container">
        <OurProducts />
      </div>
    </div>
  );
};

export default Home;
