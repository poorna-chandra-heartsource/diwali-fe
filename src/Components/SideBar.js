import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/sideBar.css";
import config from "../config";

const Sidebar = ({ onCategorySelect, selectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
         `${config.backendURL}/products/categories`
        );
        const fetchedCategories = response.data.map((category) => ({
          name: category.product_category,
          count: category.productCount,
        }));
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    if (selectedCategory !== category) {
      onCategorySelect(category);
    }
  };

  return (
    <>
      <div className="sidebar-container">
        <h3 className="sidebar-title">Browse Categories</h3>
        <ul className="category-list">
          <li
            className={`category-item ${
              selectedCategory === null ? "selected" : ""
            }`}
            onClick={() => handleCategoryClick(null)} // Show all products
          >
            All Products
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              className={`category-item ${
                selectedCategory === category.name ? "selected" : ""
              }`}
              onClick={() => handleCategoryClick(category.name)} // Show products from the selected category
            >
              {category.name}{" "}
              <span className="item-count">({category.count})</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
