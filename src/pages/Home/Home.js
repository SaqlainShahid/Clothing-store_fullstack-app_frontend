import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import './Home.css';

// Import your high-quality images (or use these Unsplash examples)
const heroImage = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';
const categoryMen = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80';
const categoryWomen = 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80';
const featuredProduct = 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=715&q=80';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Elevate Your Style</h1>
          <p>Discover premium fashion for every occasion</p>
          <Link to="/store" className="cta-button">
            Shop Now <FiArrowRight />
          </Link>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Fashion collection" loading="lazy" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card men">
            <img src={categoryMen} alt="Men's collection" loading="lazy" />
            <div className="category-overlay">
              <h3>Men's Wear</h3>
              <Link to="/store?category=men">Explore</Link>
            </div>
          </div>
          <div className="category-card women">
            <img src={categoryWomen} alt="Women's collection" loading="lazy" />
            <div className="category-overlay">
              <h3>Women's Wear</h3>
              <Link to="/store?category=women">Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product */}
      <section className="featured-product">
        <div className="featured-image">
          <img src={featuredProduct} alt="Featured product" loading="lazy" />
        </div>
        <div className="featured-content">
          <span className="featured-badge">Featured</span>
          <h2>Summer Collection 2023</h2>
          <p>
            Our newest arrivals are designed to keep you cool and stylish all 
            season long. Premium fabrics and contemporary designs.
          </p>
          <Link to="/store" className="cta-button secondary">
            View Collection
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">✈️</div>
            <h3>Free Shipping</h3>
            <p>On all orders over $100</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🔒</div>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📞</div>
            <h3>24/7 Support</h3>
            <p>Dedicated support</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;