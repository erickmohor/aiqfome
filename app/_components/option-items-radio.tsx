"use client";
import { CircleDollarSign } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { IOptionItem } from "./option-card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface OptionItemsRadioProps {
  items: IOptionItem[];
}

export function OptionItemsRadio({ items }: OptionItemsRadioProps) {
  if (!items || items?.length < 1) return;

  const handleOptionChange = (value: string) => {
    console.log("value radio: ", value);
  };

  return (
    <div className="pr-4 pl-1">
      <RadioGroup onValueChange={handleOptionChange} className="space-y-3">
        {items.map((item) => {
          return (
            <div key={item.name} className="flex items-center space-x-2">
              <RadioGroupItem value={item.name} id={item.name} />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {item.discountPercentage && (
                    <CircleDollarSign size={18} className="text-green-500" />
                  )}
                  <span className="text-light text-sm font-normal">
                    {item.name}
                  </span>
                </div>

                {item.price && item.discountPercentage && (
                  <div className="flex items-center gap-1">
                    <span className="text-light text-xs font-bold">
                      de {formatCurrency(item.price)} por
                    </span>
                    <span className="text-sm font-bold text-green-500">
                      {formatCurrency(
                        calculateProductTotalPrice({
                          price: item.price,
                          discountPercentage: item.discountPercentage,
                        }),
                      )}
                    </span>
                  </div>
                )}

                {item.price && !item.discountPercentage && (
                  <span className="text-sm font-bold text-purple-500">
                    {item.isAdditionalItem && "+"}
                    {formatCurrency(item.price)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}
