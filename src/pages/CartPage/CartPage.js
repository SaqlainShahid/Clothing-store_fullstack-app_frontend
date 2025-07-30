import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiShoppingCart, FiArrowRight, FiPlus, FiMinus } from 'react-icons/fi';
import './CartPage.css';

const CartPage = () => {
  const { 
    cartItems, 
    cartTotal,
    itemCount,
    removeFromCart, 
    updateQuantity
  } = useCart();
  
  const navigate = useNavigate();

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + change);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Shopping Cart</h2>
        {cartItems.length > 0 && (
          <span className="cart-count">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <FiShoppingCart size={48} color="#a0aec0" />
          <p>Your cart is empty</p>
          <button 
            className="shop-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <img 
                  src={item.images[0]} 
                  alt={item.name} 
                  className="cart-item-img"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/120';
                  }}
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price.toFixed(2)} each</p>
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      <FiPlus />
                    </button>
                  </div>
                  
                  <p className="subtotal">
                    Subtotal: <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FiTrash2 /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className="total-row">
              <span>Total</span>
              <span className="total-amount">${cartTotal.toFixed(2)}</span>
            </div>
            
            <button
              className="checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <FiArrowRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;