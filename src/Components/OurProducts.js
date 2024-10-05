import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/ourProducts.css";

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/products/categories"
        );
        const fetchedProducts = response.data.map((product, index) => ({
          id: index + 1,
          name: product.product_category,
          image: "/Images/logo.png",
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (category) => {
    navigate("/products", { state: { selectedCategory: category } });
  };

  return (
    <>
      <div className="ourProductsHeader">
        <h2>Our Products</h2>
      </div>
      <div className="ourProduct-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="ourProduct-card"
            onClick={() => handleProductClick(product.name)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default OurProducts;