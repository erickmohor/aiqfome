import { ItemHeader } from "./item-header";
import { ItemTypeCheckbox } from "./item-type-checkbox";
import { ItemTypeQuantity } from "./item-type-quantity";
import { ItemTypeRadio } from "./item-type-radio";
import { IOption } from "./options";
import { IProduct } from "./product-card";

export interface ItemTypeProps {
  product: IProduct;
  option: IOption;
}

export interface IItem {
  id: string;
  name: string;
  price?: number;
  discountPercentage?: number;
  isAdditionalItem?: boolean;
}

interface ItemCardProps {
  product: IProduct;
  option: IOption;
}

export function ItemCard({ product, option }: ItemCardProps) {
  return (
    <div className="p-4">
      <ItemHeader
        title={option.title}
        minQuantity={option.minQuantity}
        maxQuantity={option.maxQuantity}
      />

      <div className="mt-5">
        {(option.type === "radio" || option.type === "size") && (
          <ItemTypeRadio product={product} option={option} />
        )}
        {option.type === "checkbox" && (
          <ItemTypeCheckbox product={product} option={option} />
        )}
        {option.type === "quantity" && (
          <ItemTypeQuantity product={product} option={option} />
        )}
      </div>
    </div>
  );
}
