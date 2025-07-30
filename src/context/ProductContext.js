import React, { createContext, useContext } from 'react';

// 1. Create the context
const ProductContext = createContext();

// 2. Provider component
export const ProductProvider = ({ children }) => {
  const products = [
    {
      id: 1,
      name: 'Cotton T-Shirt',
      category: "Men's Fashion",
      description: 'Soft cotton T-shirt perfect for everyday wear.',
      price: 39.99,
      originalPrice: 49.99,
      discount: 20,
      isNew: true,
      colors: [
        { value: '#000000', name: 'Black' },
        { value: '#FFFFFF', name: 'White' }
      ],
      images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80'
      ]
    },
    {
      id: 2,
      name: 'Stylish Hoodie',
      category: 'Hoodie Collection',
      description: 'Warm and stylish hoodie for cool weather.',
      price: 59.99,
      originalPrice: 79.99,
      discount: 25,
      isNew: false,
      colors: [
        { value: '#333333', name: 'Charcoal' },
        { value: '#888888', name: 'Grey' }
      ],
      images: [
        'https://images.unsplash.com/photo-1618354691444-3b81e2e0fc91?auto=format&fit=crop&w=500&q=80',
        'https://images.unsplash.com/photo-1611095973512-c7a7b48c3e09?auto=format&fit=crop&w=500&q=80'
      ]
    }
  ];

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

// 3. Custom hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
