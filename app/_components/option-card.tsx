import { OptionCardHeader } from "./option-card-header";
import { OptionItemsCheckbox } from "./option-items-checkbox";
import { OptionItemsQuantity } from "./option-items-quantity";
import { OptionItemsRadio } from "./option-items-radio";
import { IOption } from "./options";

export interface IOptionItem {
  id: string;
  name: string;
  price?: number;
  discountPercentage?: number;
  isAdditionalItem?: boolean;
}

export interface CartProductItemProps {
  name: string;
  quantity: number;
  price: number;
}

export function OptionCard({
  title,
  minQuantity,
  maxQuantity,
  type,
  optionsItems,
}: IOption) {
  return (
    <div className="p-4">
      <OptionCardHeader
        title={title}
        minQuantity={minQuantity}
        maxQuantity={maxQuantity}
      />

      <div className="mt-5">
        {(type === "radio" || type === "size") && (
          <OptionItemsRadio items={optionsItems} />
        )}
        {type === "checkbox" && <OptionItemsCheckbox items={optionsItems} />}
        {type === "quantity" && <OptionItemsQuantity items={optionsItems} />}
      </div>
    </div>
  );
}
