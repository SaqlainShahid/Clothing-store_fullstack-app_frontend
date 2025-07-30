import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    paymentMethod: 'card'
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total > 100 ? 0 : 9.99; // Free shipping over $100
  const grandTotal = total + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name.trim()) {
      setError('Please enter your name');
      setIsSubmitting(false);
      return;
    }

    if (!formData.address.trim()) {
      setError('Please enter your address');
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      setIsSubmitting(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const orderData = {
        customer: formData,
        items: cartItems,
        total,
        shipping,
        grandTotal
      };

      await axios.post('http://localhost:5000/api/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      setError('Failed to place order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fashion-checkout">
      <div className="checkout-header">
        <h1>Complete Your Look</h1>
        <p>Finalize your purchase with style</p>
      </div>

      <div className="checkout-grid">
        {/* ORDER SUMMARY */}
        <div className="order-summary">
          <h2>Your Fashion Bag</h2>
          <div className="items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size || 'M'}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <div className="item-price">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* CHECKOUT FORM */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <h2>Delivery Details</h2>
          
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Shipping Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street, City, ZIP Code"
              required
            />
          </div>

          <h2>Payment Method</h2>
          <div className="payment-options">
            <label className={formData.paymentMethod === 'card' ? 'active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
              />
              <span>💳 Credit Card</span>
            </label>
            
            <label className={formData.paymentMethod === 'paypal' ? 'active' : ''}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === 'paypal'}
                onChange={handleChange}
              />
              <span>🔵 PayPal</span>
            </label>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="checkout-button" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : `Pay $${grandTotal.toFixed(2)}`}
          </button>

          <div className="secure-checkout">
            <span>🔒 Secure Checkout</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;