"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Fragment, useEffect, useState } from "react";
import { useCartContext } from "@/lib/providers";

type mealProps = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

function Cart() {
  const {
    cart,
    setCart,
    handleAddQuantity,
    handleReduceQuantity,
    handleRemoveItem,
  } = useCartContext();
  // const [cart, setCart] = useState<mealProps[]>([]);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const currentCart = cartData ? JSON.parse(cartData) : [];

    setCart(currentCart);
  }, []);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>Cart</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={"end"}
          className="bg-amber-900 rounded max-h-96"
        >
          {cart.map((item, index) => (
            <Fragment key={item.meal.idMeal}>
              <DropdownMenuItem
                className="flex-col"
                onSelect={(e) => e.preventDefault()}
              >
                <div className="flex gap-4 mb-4 w-full justify-between">
                  <Image
                    src={item.meal.strMealThumb}
                    alt="cart"
                    width={75}
                    height={75}
                    className="rounded-md"
                  />

                  <h3>{item.meal.strMeal}</h3>
                  <p>9.99$</p>
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <Button
                      onClick={() => handleReduceQuantity(item.meal.idMeal)}
                    >
                      -
                    </Button>
                    <span className="mx-4">{item.quantity}</span>
                    <Button onClick={() => handleAddQuantity(item.meal.idMeal)}>
                      +
                    </Button>
                  </div>
                  <Button onClick={() => handleRemoveItem(item.meal.idMeal)}>
                    Remove
                  </Button>
                </div>
              </DropdownMenuItem>
              {index !== cart.length - 1 && <DropdownMenuSeparator />}
            </Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Cart;
