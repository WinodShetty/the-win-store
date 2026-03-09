import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [activeCategory, setActiveCategory] = useState("mindset");

  const t = translations[language];

  const addToCart = (product, itemLanguage) => {
    setCart((prev) => {
      const cartId = `${product.id}-${itemLanguage}`;
      const exists = prev.find((item) => item.cartId === cartId);
      if (exists) return prev;
      return [...prev, { ...product, cartId, itemLanguage, quantity: 1 }];
    });
    // setIsCartOpen(true); // Disabled auto-drawer as per request
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + item.offerPrice * item.quantity, 0);
  
  const discount = coupon 
    ? (coupon.discountType === 'percentage' ? (subtotal * coupon.value) / 100 : coupon.value)
    : 0;

  const total = Math.max(0, subtotal - discount);

  return (
    <AppContext.Provider value={{
      language, setLanguage,
      cart, addToCart, removeFromCart, clearCart,
      isCartOpen, setIsCartOpen,
      coupon, setCoupon,
      subtotal, discount, total,activeCategory,
setActiveCategory,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
