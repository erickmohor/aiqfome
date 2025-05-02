"use client";
import { formatCurrency } from "../_helpers/price";
import { ItemOptionProps } from "./product-item";

import { Checkbox } from "./ui/checkbox";

interface ItemOptionsCheckboxProps {
  options: ItemOptionProps[];
}

export function ItemOptionsCheckbox({ options }: ItemOptionsCheckboxProps) {
  if (!options || options?.length < 1) return;

  const handleCheckedChange = (name: string, checked: string | boolean) => {
    console.log("name: ", name);
    console.log("checked: ", checked);
  };

  return (
    <div className="space-y-3 pr-4 pl-1">
      {options.map((option) => {
        return (
          <div
            key={option.name}
            className="flex items-center justify-between gap-3 py-1"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckedChange(option.name, checked)
                }
              />

              <span className="text-light text-sm font-normal">
                {option.name}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {option.price && (
                <span className="text-sm font-bold text-purple-500">
                  {option.isAdditionalOption && "+"}
                  {formatCurrency(option.price)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
