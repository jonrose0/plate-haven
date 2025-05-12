"use client";

import MenuSkeleton from "@/components/MenuSkeleton";
import { Button } from "@/components/ui/button";
import { mealProps, useCartContext } from "@/lib/providers";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type foodProps = {
  name: string;
  meal: mealProps[];
};

function MenuPage() {
  const { cart, setCart, handleAddQuantity, handleReduceQuantity } =
    useCartContext();

  const [data, setData] = useState<foodProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState({
    name: "",
    direction: "",
    directionValue: 0,
  });

  const activeSectionRef = useRef(activeSection);

  const router = useRouter();

  useEffect(() => {
    router.push("/menu");
  }, []);

  useEffect(() => {
    activeSectionRef.current = activeSection;
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
    getData();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const options = {
      root: null,
      rootMargin: "-500px 0px -750px 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const direction1 =
            parseInt(entry.target.attributes[1].value) >=
            activeSectionRef.current.directionValue
              ? "down"
              : "up";

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

    const mealData = [
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
    ];

    const newMealData = mealData.map((food) => {
      return {
        ...food,
        meal: food.meal.map((meal: mealProps) => {
          return food.name === "starter" || food.name === "dessert"
            ? {
                ...meal,
                price: parseFloat(`${Math.floor(Math.random() * 5) + 8}.99`),
              }
            : {
                ...meal,
                price: parseFloat(`${Math.floor(Math.random() * 5) + 18}.99`),
              };
        }),
      };
    });

    setData(newMealData);
    setLoading(false);
  }

  function handleAddToCart(meal: mealProps) {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartData = JSON.parse(cart);
      const newCart = [...cartData, { meal, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    } else {
      localStorage.setItem("cart", JSON.stringify([{ meal, quantity: 1 }]));
      setCart([{ meal, quantity: 1 }]);
    }
  }

  return (
    <div className="flex relative container mx-auto py-8">
      <div className="bg-[#f8fafc] hidden lg:block sticky top-28 w-80 h-full rounded-2xl py-4 px-2 shadow-md">
        <ul className="text-[2rem] font-heading uppercase text-center">
          {menuCategories.map((category, index) => (
            <li key={category}>
              <Link
                href={`#${category.toLowerCase()}`}
                className={cn(
                  "block p-2 border-b-2 border-[#edf1f6] relative z-0 before:absolute before:inset-0 before:bg-sidebar-accent before:-z-10 before:scale-y-0 before:origin-top before:transition-transform menu-sidebar-btn hover:bg-sidebar-accent",
                  index === 0 && "border-t-2",
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
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-5/6 px-8">
        <div className="container mx-auto flex flex-col gap-12">
          {loading ? (
            <MenuSkeleton />
          ) : (
            data.map((food, index) => {
              return (
                <section
                  key={food.name}
                  id={food.name}
                  data-placement={index}
                  className="scroll-mt-20"
                >
                  <h1 className="text-4xl uppercase mb-8 font-heading font-bold">
                    {food.name}
                  </h1>
                  <>
                    <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4">
                      {food.meal.map((meal) => {
                        return (
                          <li key={meal.idMeal}>
                            <div className="rounded-md overflow-hidden shadow-md h-full flex flex-col">
                              <img src={meal.strMealThumb} alt={meal.strMeal} />
                              <div className="flex flex-col items-start bg-accent p-2 flex-1 justify-between">
                                <div>
                                  <h2 className="font-heading font-bold text-[1.25rem]">
                                    {meal.strMeal}
                                  </h2>
                                  <p>{meal.price}$</p>
                                </div>
                                {cart.length > 0 &&
                                cart.find(
                                  (item) =>
                                    item.meal.idMeal === meal.idMeal &&
                                    item.quantity > 0
                                ) ? (
                                  <div>
                                    <Button
                                      variant={"cta"}
                                      onClick={() =>
                                        handleReduceQuantity(meal.idMeal)
                                      }
                                    >
                                      -
                                    </Button>

                                    {cart.map(
                                      (item) =>
                                        item.meal.idMeal === meal.idMeal && (
                                          <span
                                            key={meal.idMeal}
                                            className="mx-4"
                                          >
                                            {item.quantity}
                                          </span>
                                        )
                                    )}

                                    <Button
                                      variant={"cta"}
                                      onClick={() =>
                                        handleAddQuantity(meal.idMeal)
                                      }
                                    >
                                      +
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    variant={"cta"}
                                    className="self-end w-2/5"
                                    onClick={() => handleAddToCart(meal)}
                                  >
                                    Add to cart
                                  </Button>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuPage;
