"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type mealProps = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  price: number;
};

type CartProps = {
  quantity: number;
  meal: mealProps;
};

type ContextProps = {
  cart: CartProps[];
  setCart: React.Dispatch<React.SetStateAction<CartProps[]>>;
  handleAddQuantity: (id: string) => void;
  handleReduceQuantity: (id: string) => void;
  handleRemoveItem: (id: string) => void;
};

const cartContextDefaultValues: ContextProps = {
  cart: [],
  setCart: () => {},
  handleAddQuantity: () => {},
  handleReduceQuantity: () => {},
  handleRemoveItem: () => {},
};

export const CartContext = createContext<ContextProps>(
  cartContextDefaultValues
);

function Providers({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartProps[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const currentCart = cartData ? JSON.parse(cartData) : [];

    setCart(currentCart);
  }, []);

  function handleAddQuantity(id: string) {
    const newCart = cart.map((item) => {
      if (item.meal.idMeal === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleReduceQuantity(id: string) {
    const newCart = cart.map((item) => {
      if (item.meal.idMeal === id) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    const filteredCart = newCart.filter((item) => item.quantity > 0);
    setCart(filteredCart);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  }

  function handleRemoveItem(id: string) {
    const newCart = cart.filter((item) => item.meal.idMeal !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddQuantity,
        handleReduceQuantity,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}

export default Providers;
