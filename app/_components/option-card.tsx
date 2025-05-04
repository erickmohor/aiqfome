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

interface OptionCardProps {
  establishmentId: string;
  option: IOption;
}

export function OptionCard({ establishmentId, option }: OptionCardProps) {
  return (
    <div className="p-4">
      <OptionCardHeader
        title={option.title}
        minQuantity={option.minQuantity}
        maxQuantity={option.maxQuantity}
      />

      <div className="mt-5">
        {(option.type === "radio" || option.type === "size") && (
          <OptionItemsRadio establishmentId={establishmentId} option={option} />
        )}
        {option.type === "checkbox" && (
          <OptionItemsCheckbox
            establishmentId={establishmentId}
            option={option}
          />
        )}
        {option.type === "quantity" && (
          <OptionItemsQuantity
            establishmentId={establishmentId}
            option={option}
          />
        )}
      </div>
    </div>
  );
}
