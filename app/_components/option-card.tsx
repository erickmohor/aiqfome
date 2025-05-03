import { OptionCardHeader } from "./option-card-header";
import { OptionItemsCheckbox } from "./option-items-checkbox";
import { OptionItemsQuantity } from "./option-items-quantity";
import { OptionItemsRadio } from "./option-items-radio";

export interface OptionItemProps {
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

interface OptionCardProps {
  title: string;
  minQuantity?: number;
  maxQuantity?: number;
  type: "checkbox" | "radio" | "quantity";
  options: OptionItemProps[];
}

export function OptionCard({
  title,
  minQuantity,
  maxQuantity,
  type,
  options,
}: OptionCardProps) {
  return (
    <div className="p-4">
      <OptionCardHeader
        title={title}
        minQuantity={minQuantity}
        maxQuantity={maxQuantity}
      />

      <div className="mt-5">
        {type === "radio" && <OptionItemsRadio options={options} />}
        {type === "checkbox" && <OptionItemsCheckbox options={options} />}
        {type === "quantity" && <OptionItemsQuantity options={options} />}
      </div>
    </div>
  );
}
