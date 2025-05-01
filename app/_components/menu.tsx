import ProductListByCategory from "./product-list-by-category";

export default function Menu() {
  return (
    <div className="bg-neutrals-100 space-y-1">
      <ProductListByCategory initOpen />
      <ProductListByCategory />
      <ProductListByCategory />
      <ProductListByCategory />
    </div>
  );
}
