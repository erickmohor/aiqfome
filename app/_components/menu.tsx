import { CategoryCard } from "./category-card";

export function Menu() {
  return (
    <div>
      <CategoryCard initOpen />
      <div className="bg-neutrals-100 h-1" />
      <CategoryCard />
      <div className="bg-neutrals-100 h-1" />
      <CategoryCard />
      <div className="bg-neutrals-100 h-1" />
      <CategoryCard />
    </div>
  );
}
