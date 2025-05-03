"use client";
import { formatCurrency } from "../_helpers/price";
import { IOptionItem } from "./option-card";

import { Checkbox } from "./ui/checkbox";

interface OptionItemsCheckboxProps {
  items: IOptionItem[];
}

export function OptionItemsCheckbox({ items }: OptionItemsCheckboxProps) {
  if (!items || items?.length < 1) return;

  const handleCheckedChange = (name: string, checked: string | boolean) => {
    console.log("name: ", name);
    console.log("checked: ", checked);
  };

  return (
    <div className="space-y-3 pr-4 pl-1">
      {items.map((item) => {
        return (
          <div
            key={item.name}
            className="flex items-center justify-between gap-3 py-1"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                onCheckedChange={(checked) =>
                  handleCheckedChange(item.name, checked)
                }
              />

              <span className="text-light text-sm font-normal">
                {item.name}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {item.price && (
                <span className="text-sm font-bold text-purple-500">
                  {item.isAdditionalItem && "+"}
                  {formatCurrency(item.price)}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
