const shimmer =
  "before:absolute before:inset-0 before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

function MenuSkeleton() {
  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4 w-full py-8">
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
        <li>
          <MenuSkeletonCard />
        </li>
      </ul>
    </>
  );
}

export default MenuSkeleton;

function MenuSkeletonCard() {
  return (
    <div
      className={`${shimmer} relative min-h-96 rounded-md bg-skeleton-background overflow-hidden`}
    ></div>
  );
}
