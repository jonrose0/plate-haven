"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { useCartContext } from "@/lib/providers";
import { cn } from "@/lib/utils";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Fragment, use, useEffect, useRef, useState } from "react";

type mealProps = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type foodProps = {
  name: string;
  meal: mealProps[];
};

type CartProps = {
  quantity: number;
  meal: mealProps;
};

function MenuPage() {
  // const pathname = usePathname();
  // const router = useRouter();

  // useEffect(() => {
  //   console.log("MenuPage mounted");
  //   if (pathname === "/menu") {
  //     router.push("/menu/side");
  //   }
  // }, []);

  const { cart, setCart, handleAddQuantity, handleReduceQuantity } =
    useCartContext();

  const [data, setData] = useState<foodProps[]>([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [activeSection, setActiveSection] = useState({
    name: "",
    direction: "",
    directionValue: 0,
  });

  const activeSectionRef = useRef(activeSection);

  useEffect(() => {
    activeSectionRef.current = activeSection;
    // console.log(cart);
  }, [activeSection]);

  const menuCategories = [
    "Starter",
    "Beef",
    "Chicken",
    "Pork",
    "Pasta",
    "Seafood",
    "Side",
    "Vegan",
    "Vegetarian",
    "Breakfast",
    "Dessert",
  ];

  useEffect(() => {
    console.log("MenuPage updated");
    getData();
  }, []);

  useEffect(() => {
    console.log("MenuPage mounted");

    const sections = document.querySelectorAll("section");
    console.log(sections);

    const options = {
      root: null,
      rootMargin: "-500px 0px -750px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      // console.log(entries);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log(entry);
          console.log(
            "id",
            entry.target.id,
            "placement",
            entry.target.attributes[1].value
          );
          const direction1 =
            parseInt(entry.target.attributes[1].value) >=
            activeSectionRef.current.directionValue
              ? "down"
              : "up";

          // console.log(
          //   "direction1",
          //   direction1,
          //   parseInt(entry.target.attributes[1].value) >=
          //     activeSection.directionValue,
          //   parseInt(entry.target.attributes[1].value),
          //   activeSection.directionValue,
          //   activeSection
          // );
          setActiveSection((prev) => ({
            name: entry.target.id,
            direction: direction1,
            directionValue: parseInt(entry.target.attributes[1].value),
          }));
        }
      });
    }, options);

    sections.forEach((section) => {
      observer.observe(section);
    });

    // setActiveSection({
    //   name: "seafood",
    //   direction: "direction",
    //   directionValue: 1,
    // });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, [data]);

  async function getData() {
    const [
      starter,
      beef,
      chicken,
      pork,
      pasta,
      seafood,
      side,
      vegan,
      vegetarian,
      breakfast,
      dessert,
    ] = await Promise.all([
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pork"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Side"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegan"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast"),
      fetch("https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"),
    ]);
    const starterData = await starter.json();
    const beefData = await beef.json();
    const chickenData = await chicken.json();
    const porkData = await pork.json();
    const pastaData = await pasta.json();
    const seafoodData = await seafood.json();
    const sideData = await side.json();
    const veganData = await vegan.json();
    const vegetarianData = await vegetarian.json();
    const breakfastData = await breakfast.json();
    const dessertData = await dessert.json();

    // console.log(seafoodData, chikenData);

    setData([
      { name: "starter", meal: starterData.meals },
      { name: "beef", meal: beefData.meals },
      { name: "chicken", meal: chickenData.meals },
      { name: "pork", meal: porkData.meals },
      { name: "pasta", meal: pastaData.meals },
      { name: "seafood", meal: seafoodData.meals },
      { name: "side", meal: sideData.meals },
      { name: "vegan", meal: veganData.meals },
      { name: "vegetarian", meal: vegetarianData.meals },
      { name: "breakfast", meal: breakfastData.meals },
      { name: "dessert", meal: dessertData.meals },
    ]);
  }

  function handleAddToCart(meal: mealProps) {
    console.log("Add to cart");
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      console.log(cartData);
      const newCart = [...cartData, { meal, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    } else {
      localStorage.setItem("cart", JSON.stringify([{ meal, quantity: 1 }]));
      setCart([{ meal, quantity: 1 }]);
    }

    // const addedToCart = localStorage.getItem("addedToCart");

    // if (addedToCart) {
    //   const addedToCartData = JSON.parse(addedToCart);
    //   const newAddedToCart = [...addedToCartData, meal.idMeal];
    //   localStorage.setItem("addedToCart", JSON.stringify(newAddedToCart));
    //   setAddedToCart(newAddedToCart);
    // } else {
    //   localStorage.setItem("addedToCart", JSON.stringify([meal.idMeal]));
    //   setAddedToCart([meal.idMeal]);
    // }
  }

  return (
    <div className="flex">
      <SidebarProvider className="flex-[1]">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              {/* <SidebarGroupLabel>Categories</SidebarGroupLabel> */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuCategories.map((category) => (
                    <SidebarMenuItem key={category}>
                      <SidebarMenuButton size={"lg"} asChild>
                        <a
                          href={`${category.toLowerCase()}`}
                          className={cn(
                            "relative z-0 before:absolute before:inset-0 before:bg-accent before:-z-10 before:scale-y-0 before:origin-top before:transition-transform",
                            activeSection.name === category.toLowerCase()
                              ? activeSection.direction === "down"
                                ? "before:scale-y-100"
                                : "before:origin-bottom before:scale-y-100"
                              : activeSection.direction === "down"
                              ? "before:origin-bottom"
                              : "before:scale-y-0"
                          )}
                        >
                          {category}
                        </a>
                      </SidebarMenuButton>
                      <SidebarSeparator />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      <div className="flex-5/6">
        <div className="container mx-auto">
          {data.map((food, index) => (
            <section
              key={food.name}
              id={food.name}
              data-placement={index}
              className="py-8"
            >
              <h1 className="text-3xl uppercase mb-8">{food.name}</h1>
              <>
                <ul className="grid grid-cols-5 gap-4">
                  {food.meal.map((meal) => (
                    <li key={meal.idMeal}>
                      <div className="rounded-md overflow-hidden shadow-md">
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <div className="flex flex-col items-start bg-accent p-2">
                          <h2>{meal.strMeal}</h2>
                          <p>9.99$</p>
                          {cart.length > 0 &&
                          cart.find(
                            (item) =>
                              item.meal.idMeal === meal.idMeal &&
                              item.quantity > 0
                          ) ? (
                            <div>
                              <Button
                                onClick={() =>
                                  handleReduceQuantity(meal.idMeal)
                                }
                              >
                                -
                              </Button>

                              {cart.map(
                                (item) =>
                                  item.meal.idMeal === meal.idMeal && (
                                    <span key={meal.idMeal} className="mx-4">
                                      {item.quantity}
                                    </span>
                                  )
                              )}

                              <Button
                                onClick={() => handleAddQuantity(meal.idMeal)}
                              >
                                +
                              </Button>
                            </div>
                          ) : (
                            <Button
                              className="self-end w-2/5"
                              onClick={() => handleAddToCart(meal)}
                            >
                              Add to cart
                            </Button>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
