// src/components/Header/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Clothing Store</Link>
      </div>
      <nav className="nav">
        <Link to="/store">Store</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link> {/* ✅ Added */}
        <Link to="/cart">
          <FiShoppingCart />
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
