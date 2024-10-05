import React, { useEffect, useState } from "react";
import "../Styles/Loading.css"; // Import the CSS for the animation

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("load", () => {
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    });
  }, []);

  if (!isVisible) return null;

  return (
    <div id="loading-screen">
      <div className="rocket"></div>
      <div className="fireworks"></div>
    </div>
  );
};

export default Loading;
