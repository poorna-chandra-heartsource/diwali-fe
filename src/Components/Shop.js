import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import productImages from "./productImages";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import SideBar from "./SideBar";
import "../Styles/shop.css";

const Shop = ({ onAddToCart }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || null
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/products/fetch?sort_field=name&sort_order=${sortOrder}&page=1&limit=70`
        );
        const fetchedProducts = response.data.data.map((product) => ({
          _id: product._id,
          name: product.name,
          category: product.category,
          rate_in_rs: product.rate_in_rs,
          image: productImages[product.name] || "/Images/placeholder.png",
        }));
        setAllProducts(fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [sortOrder]);

  useEffect(() => {
    if (selectedCategory) {
      setProducts(
        allProducts.filter((product) => product.category === selectedCategory)
      );
    } else {
      setProducts(allProducts);
    }
  }, [selectedCategory, allProducts]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleSort = (sortOption) => {
    if (sortOption === "low-to-high") {
      setSortOrder("asc");
    } else if (sortOption === "high-to-low") {
      setSortOrder("desc");
    }
  };

  return (
    <div className="shop-page-container">
      <div className="sidebar">
        <SideBar
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="shop-content">
        <div className="shop-header">
          <h2>Products</h2>

          <div className="sort-options">
            <div className="sort-dropdown">
              <button
                className="sort-dropdown-btn"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                Sort by price
                <span className="sort-arrows">
                  <span className="arrow-up">▲</span>
                  <span className="arrow-down">▼</span>
                </span>
              </button>
              {isSortDropdownOpen && (
                <div
                  className={`sort-dropdown-content ${
                    isSortDropdownOpen ? "show" : ""
                  }`}
                >
                  <div
                    className="sort-item"
                    onClick={() => handleSort("low-to-high")}
                  >
                    Low to high
                  </div>
                  <div
                    className="sort-item"
                    onClick={() => handleSort("high-to-low")}
                  >
                    High to low
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} onClick={() => handleProductClick(product)}>
              <ProductCard
                name={product.name}
                rate_in_rs={product.rate_in_rs}
                image={product.image}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={handleCloseModal}
            onAddToCart={onAddToCart}
          />
        )}
      </div>
    </div>
  );
};

export default Shop;
