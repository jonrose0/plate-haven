import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import chickenImg from "@/assets/chicken_image.jpg";
import chickenImg1 from "@/assets/chicken_image681ca3ca6b450.jpg";

export default function Home() {
  const pageData = [
    {
      id: 1,
      title: "Savor the tenderness, embrace the flavor.",
      description: "Savor the tenderness, embrace the flavor.",
      image: "https://www.themealdb.com/images/media/meals/1525872624.jpg",
      imageAlt: "steak image",
    },
    {
      id: 2,
      title: "The finest seafood, prepared with passion.",
      description: "The finest seafood, prepared with passion.",
      image:
        "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
      imageAlt: "seafood image",
    },
    {
      id: 3,
      title: "Nature’s finest, served with love.",
      description: "Nature’s finest, served with love.",
      image:
        "https://www.themealdb.com/images/media/meals/y7h0lq1683208991.jpg",
      imageAlt: "vegetarian image",
    },
    {
      id: 4,
      title: "Pure bliss in every bite.",
      description: "Pure bliss in every bite.",
      image:
        "https://www.themealdb.com/images/media/meals/r33cud1576791081.jpg",
      imageAlt: "dessert image",
    },
  ];
  return (
    <div className="max-w-7xl mx-auto grid gap-8 py-8">
      {pageData.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "md:flex bg-gray-700 shadow",
            index % 2 !== 0 && "md:flex-row-reverse"
          )}
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            width={180}
            height={37}
            className="w-full md:w-1/2"
          />
          <div className="p-4 text-center md:w-1/2 flex flex-col justify-center items-center bg-secondary-background">
            <h2 className="text-5xl mb-8 font-heading">{item.title}</h2>
            <Link
              href={"/menu"}
              className="py-2 px-4 rounded-4xl bg-cta-background text-cta-foreground hover:bg-cta-background-hover"
            >
              Order now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
