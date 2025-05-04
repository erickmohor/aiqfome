import { IItem } from "@/app/_components/item-card";
import { IProduct } from "./product-card";
import { OptionsHeader } from "./options-header";
import { OptionsForm } from "./options-form";

export interface IOption {
  id: string;
  productId: string;
  title: string;
  minQuantity?: number;
  maxQuantity?: number;
  type: "size" | "checkbox" | "radio" | "quantity";
  optionsItems: IItem[];
}

interface OptionsProps {
  product: IProduct;
}

export function Options({ product }: OptionsProps) {
  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="sm:bg-neutrals-100 flex flex-col items-center">
        <div className="w-full bg-white">
          <OptionsHeader product={product} />

          <div className="bg-neutrals-100 h-1" />

          <OptionsForm product={product} />
        </div>
      </div>
    </div>
  );
}
