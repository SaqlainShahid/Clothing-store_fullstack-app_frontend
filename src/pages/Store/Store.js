import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Store.css';

const Store = () => {
  const products = [
    {
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
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      ]
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      category: 'Men\'s Bottom Wear',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      colors: [
        { value: '#3A3845', name: 'Dark Blue' },
        { value: '#6B728E', name: 'Light Blue' }
      ],
      images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
      ]
    },
    // Add more products...
  ];

  return (
    <div className="store-container">
      <div className="store-header">
        <h1>Our Collection</h1>
        <p>Discover our premium selection of clothing</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Store;