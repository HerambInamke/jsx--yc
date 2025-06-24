import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (ticket, quantity = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.id === ticket.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        return updated;
      }
      return [...prev, { ...ticket, quantity }];
    });
  };

  const removeFromCart = (ticketId) => {
    setCart(prev => prev.filter(item => item.id !== ticketId));
  };

  const updateQuantity = (ticketId, quantity) => {
    setCart(prev => prev.map(item => item.id === ticketId ? { ...item, quantity } : item));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
} 