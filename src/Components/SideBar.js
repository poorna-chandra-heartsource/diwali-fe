import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/sideBar.css";

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/products/categories"
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

  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">Browse Categories</h3>
      <ul className="category-list">
        <li
          className="category-item"
          onClick={() => onCategorySelect(null)} // Show all products
        >
          All Products
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className="category-item"
            onClick={() => onCategorySelect(category.name)} // Show products from the selected category
          >
            {category.name}{" "}
            <span className="item-count">({category.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;