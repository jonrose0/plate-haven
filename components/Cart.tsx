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
import { Fragment } from "react";
import { useCartContext } from "@/lib/providers";

function Cart() {
  const { cart, handleAddQuantity, handleReduceQuantity, handleRemoveItem } =
    useCartContext();

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="uppercase text-2xl font-heading font-bold relative"
          >
            Cart{" "}
            <span className="absolute top-0 right-0 bg-red-600 text-base w-6 h-6 flex justify-center items-center text-white rounded-full translate-x-1/3 -translate-y-1/3">
              {cart.reduce((acc, curr) => acc + curr.quantity, 0)}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={"end"}
          className="bg-secondary-background rounded max-h-96"
        >
          {cart.length === 0 ? (
            <div className="min-h-40 min-w-60 flex items-center justify-center">
              Your cart is empty
            </div>
          ) : (
            cart.map((item, index) => (
              <Fragment key={item.meal.idMeal}>
                <DropdownMenuItem
                  className="flex-col"
                  onSelect={(e) => e.preventDefault()}
                >
                  <div className="flex gap-4 mb-4 w-full items-start">
                    <Image
                      src={item.meal.strMealThumb}
                      alt="cart"
                      width={75}
                      height={75}
                      className="rounded-md mt-2"
                    />
                    <div className="sm:flex sm:gap-4 sm:justify-between">
                      <h3 className="font-heading font-bold text-2xl max-w-48 sm:max-w-80">
                        {item.meal.strMeal}
                      </h3>
                      <p className="text-base font-bold mt-1.5">
                        ${item.meal.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between w-full">
                    <div>
                      <Button
                        variant={"cta"}
                        onClick={() => handleReduceQuantity(item.meal.idMeal)}
                      >
                        -
                      </Button>
                      <span className="mx-4">{item.quantity}</span>
                      <Button
                        variant={"cta"}
                        onClick={() => handleAddQuantity(item.meal.idMeal)}
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      variant={"cta"}
                      onClick={() => handleRemoveItem(item.meal.idMeal)}
                    >
                      Remove
                    </Button>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </Fragment>
            ))
          )}
          {cart.length > 0 && (
            <div className="py-2">
              <p className="flex justify-between px-4 py-2">
                {" "}
                Total:{" "}
                <span className="font-bold">
                  $
                  {cart.reduce(
                    (acc, curr) => acc + curr.meal.price * curr.quantity,
                    0
                  )}
                </span>
              </p>
            </div>
          )}
          <Button
            variant={"cta"}
            className="w-full rounded"
            onClick={() => {
              console.log("Checkout");
            }}
          >
            Checkout
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default Cart;
