import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import OurProducts from "./OurProducts";

import "../Styles/home.css";

const images = [
  "/Images/bgText.png",
  "/Images/Diwali-image-3.jpg",
  "/Images/Diwali-image-4.png",
  "/Images/Diwali-image-8.jpg",
  "/Images/image-5.png",
  "/Images/image4.png",
  "/Images/Chakaras.png",
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
