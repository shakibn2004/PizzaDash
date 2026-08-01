'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { OrderItem, Pizza } from '@/data/mockData';

interface CartContextType {
  cart: OrderItem[];
  addToCart: (pizza: Pizza, size?: OrderItem['size'], crust?: string, customToppings?: string[]) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  tax: number;
  deliveryFee: number;
  cartTotal: number;
  totalItemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<OrderItem[]>([
    {
      id: 'pizza-1',
      name: 'Truffle Pepperoni Supreme',
      size: 'Large (14")',
      crust: 'Classic Hand-Tossed',
      price: 22.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
    }
  ]);

  const addToCart = (
    pizza: Pizza,
    size: OrderItem['size'] = 'Large (14")',
    crust: string = 'Classic Hand-Tossed',
    customToppings?: string[]
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.id === pizza.id && item.size === size && item.crust === crust
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      }

      return [
        ...prevCart,
        {
          id: pizza.id,
          name: pizza.name,
          size,
          crust,
          price: pizza.price,
          quantity: 1,
          image: pizza.image,
          customToppings
        }
      ];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = cartSubtotal * 0.09;
  const deliveryFee = cartSubtotal > 0 ? 3.99 : 0;
  const cartTotal = cartSubtotal + tax + deliveryFee;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        tax,
        deliveryFee,
        cartTotal,
        totalItemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
