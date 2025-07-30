import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const toggleWishlist = () => setIsWishlisted(!isWishlisted);

  const handleAddToCart = () => {
    const item = {
      ...product,
      selectedColor: product.colors[activeImageIndex]?.name || '',
      quantity: 1,
    };
    addToCart(item);
    alert('Product added to cart!');
  };

  const handleQuickView = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="product-image-container" onClick={handleQuickView}>
        <img 
          src={product.images[activeImageIndex]} 
          alt={product.name} 
          className="product-image"
        />

        {/* Color Swatches */}
        <div className="color-swatches" onClick={(e) => e.stopPropagation()}>
          {product.colors.map((color, index) => (
            <button
              key={index}
              className={`color-swatch ${index === activeImageIndex ? 'active' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => setActiveImageIndex(index)}
              aria-label={`Select ${color.name} color`}
            />
          ))}
        </div>

        {/* Badges */}
        {product.isNew && <span className="badge new">New</span>}
        {product.discount > 0 && (
          <span className="badge sale">{product.discount}% OFF</span>
        )}

        {/* Quick Actions */}
        <div className="quick-actions" onClick={(e) => e.stopPropagation()}>
          <button
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={toggleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart />
          </button>
          <button className="quick-view-btn" onClick={handleQuickView} aria-label="Quick view">
            <FiEye />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-details">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <div className="price-container">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <FiShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

// ✅ Default Props (for testing/demo purposes)
ProductCard.defaultProps = {
  product: {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    category: 'Men\'s Fashion',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    isNew: true,
    colors: [
      { value: '#2B2B2B', name: 'Black' },
      { value: '#FFFFFF', name: 'White' },
      { value: '#5A5A5A', name: 'Gray' }
    ],
    images: [
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    ]
  }
};

export default ProductCard;
