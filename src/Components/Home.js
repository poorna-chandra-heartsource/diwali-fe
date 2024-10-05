import React from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import OurProducts from "./OurProducts";
import "../Styles/home.css";

const images = [
  "/Images/bgText.png",
  "/Images/image1.png",
  "/Images/image2.png",
  "/Images/image3.png",
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
