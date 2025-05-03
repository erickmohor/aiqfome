import { CategoryCard, ICategory } from "./category-card";

interface MenuProps {
  categories: ICategory[] | [];
}

export function Menu({ categories }: MenuProps) {
  if (!categories || categories.length < 1) return;

  return (
    <div>
      {categories.map((category, index) => {
        return (
          <div key={category.id}>
            <CategoryCard initOpen={index === 0} category={category} />
            {index !== categories.length - 1 && (
              <div className="bg-neutrals-100 h-1" />
            )}
          </div>
        );
      })}
    </div>
  );
}
