import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import SideBar from "./SideBar";
import "../Styles/shop.css";
import productImages from "./productImages";
import config from "../config";

const Shop = ({ onAddToCart }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || null
  );

  const productRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
         `${config.backendURL}/products/fetch?sort_field=name&sort_order=asc&page=1&limit=200`
        );
        const fetchedProducts = response.data.data.map((product) => ({
          _id: product._id,
          name: product.name,
          category: product.category,
          unit_price: product.unit_price,
          unit_of_sale: product.unit_of_sale,
          image: productImages[product.name] || "/Images/logo.png",
        }));

        setAllProducts(fetchedProducts);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

    if (window.innerWidth <= 480 && productRef.current) {
      productRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleSort = (selectedSortOption) => {
    setSortOption(selectedSortOption);
    setIsSortDropdownOpen(false);
    let sortedProducts = [];
    if (selectedSortOption === "price: low-to-high") {
      sortedProducts = [...products].sort(
        (a, b) => a.unit_price - b.unit_price
      );
    } else if (selectedSortOption === "price: high-to-low") {
      sortedProducts = [...products].sort(
        (a, b) => b.unit_price - a.unit_price
      );
    }
    setProducts(sortedProducts);
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
        {loading ? (
          <div className="shop-spinner-container">
            <div className="shop-spinner"></div>
          </div>
        ) : (
          <>
            <div className="shop-header">
              <h2>Products</h2>

              <div className="sort-options">
                <div className="sort-dropdown">
                  <button
                    className="sort-dropdown-btn"
                    onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  >
                    {sortOption === null
                      ? "Sort by price"
                      : sortOption === "price: low-to-high"
                      ? "Price : Low to high"
                      : "Price : High to low"}

                    <span className="sort-arrows">
                      {sortOption === null && (
                        <>
                          <span className="arrow-up">▲</span>
                          <span className="arrow-down">▼</span>
                        </>
                      )}
                      {sortOption === "price: low-to-high" && (
                        <span className="arrow-up">▲</span>
                      )}
                      {sortOption === "price: high-to-low" && (
                        <span className="arrow-down">▼</span>
                      )}
                    </span>
                  </button>

                  {isSortDropdownOpen && (
                    <div className="sort-dropdown-content">
                      <div
                        className="sort-item"
                        onClick={() => handleSort("price: low-to-high")}
                      >
                        Low to high
                      </div>
                      <div
                        className="sort-item"
                        onClick={() => handleSort("price: high-to-low")}
                      >
                        High to low
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p>
              <sup>*</sup>Images are for display purposes only. The actual
              product may differ from the image shown.
            </p>
            <div ref={productRef} className="product-grid">
              {products.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleProductClick(product)}
                >
                  <ProductCard
                    _id={product._id}
                    name={product.name}
                    unit_price={product.unit_price}
                    unit_of_sale={product.unit_of_sale}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
