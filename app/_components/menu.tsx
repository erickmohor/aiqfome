import { ProductListByCategory } from "./product-list-by-category";

export function Menu() {
  return (
    <div>
      <ProductListByCategory initOpen />
      <div className="bg-neutrals-100 h-1" />
      <ProductListByCategory />
      <div className="bg-neutrals-100 h-1" />
      <ProductListByCategory />
      <div className="bg-neutrals-100 h-1" />
      <ProductListByCategory />
    </div>
  );
}
