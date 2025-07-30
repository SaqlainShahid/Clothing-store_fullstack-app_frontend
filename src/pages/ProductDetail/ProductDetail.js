// src/pages/ProductDetail/ProductDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(id));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }

    const item = {
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    };

    addToCart(item);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-images">
        {/* Main Image */}
        {product.images?.length > 0 && (
          <img
            src={product.images[activeImageIndex]}
            alt={product.name}
            className="main-image"
          />
        )}

        {/* Thumbnails */}
        <div className="thumbnail-images">
          {Array.isArray(product.images) &&
            product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} ${i}`}
                className={i === activeImageIndex ? 'active-thumb' : ''}
                onClick={() => setActiveImageIndex(i)}
              />
            ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-detail-info">
        <h2 className="product-title">{product.name}</h2>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="price-section">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Size Selection */}
        <div className="option-group">
          <label>Size:</label>
          <div className="size-options">
            {['S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="option-group">
          <label>Color:</label>
          <div className="color-options">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`color-btn ${selectedColor === color.name ? 'active' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="option-group">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
            min={1}
            className="quantity-input"
          />
        </div>

        {/* Add to Cart */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
