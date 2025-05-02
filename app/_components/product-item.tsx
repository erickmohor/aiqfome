import { ItemOptionsCheckbox } from "./item-options-checkbox";
import { ProductItemHeader } from "./product-item-header";
import { ItemOptionsQuantity } from "./item-options-quantity";
import { ItemOptionsRadio } from "./item-options-radio";

export interface ItemOptionProps {
  name: string;
  price?: number;
  discountPercentage?: number;
  isAdditionalOption?: boolean;
}

export interface CartProductItemProps {
  name: string;
  quantity: number;
  price: number;
}

interface ProductItemProps {
  title: string;
  minQuantity?: number;
  maxQuantity?: number;
  type: "checkbox" | "radio" | "quantity";
  options: ItemOptionProps[];
}

export function ProductItem({
  title,
  minQuantity,
  maxQuantity,
  type,
  options,
}: ProductItemProps) {
  return (
    <div className="p-4">
      <ProductItemHeader
        title={title}
        minQuantity={minQuantity}
        maxQuantity={maxQuantity}
      />

      <div className="mt-5">
        {type === "radio" && <ItemOptionsRadio options={options} />}
        {type === "checkbox" && <ItemOptionsCheckbox options={options} />}
        {type === "quantity" && <ItemOptionsQuantity options={options} />}
      </div>
    </div>
  );
}
