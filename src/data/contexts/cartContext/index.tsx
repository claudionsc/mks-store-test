'use client';

import { createContext, useContext, useState } from "react";


export interface ICartContext { 
  cartItems: Array<Product>;
  addCartItem: (product: Product) => void;
  incrementQtd: (product: Product) => void
  decrementQtd: (product: Product) => void
  removeCartItem: (product: Product) => void;
  cleanCart: () => void;
}

export type Product = {
  id: number
  name: string,
  price: number,
  photo: string,
  quantity: number,
  amount: number,
  createdAT: string,
  updatedAt: string,
}

type CartContextProviderProps = {
  children: React.ReactNode
}

const CartContext = createContext<ICartContext | null>(null)

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<Array<Product>>([]);

  const addCartItem = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, amount: (item.price * (item.quantity + 1))  }
            : item
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...product, quantity: 1, amount: product.price }]);
    }
  };

    const incrementQtd = (product: Product) => {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1, amount: (item.price * (item.quantity + 1))} : item
      );
      setCartItems(updatedCartItems);      
      
    }
    const decrementQtd = (product: Product) => {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1, amount: (item.price * (item.quantity - 1)) } : item
      );
      setCartItems(updatedCartItems);
    }

  const removeCartItem = (product: Product) => {
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  };

  const cleanCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addCartItem, incrementQtd, decrementQtd, removeCartItem, cleanCart }}>
      {children}
    </CartContext.Provider>
  )

}

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export default CartContext