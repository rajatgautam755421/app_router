import React from "react";
import { Card, Button } from "react-bootstrap";
import "./loadingcard.css"; // Import the CSS file for animations

const LoadingCard = () => {
  return (
    <div className="loading-skeleton-card">
      <div className="loading-skeleton-image"></div>
      <div className="loading-skeleton-details">
        <div className="loading-skeleton-title"></div>
        <div className="loading-skeleton-description"></div>
      </div>
    </div>
  );
};

export default LoadingCard;
