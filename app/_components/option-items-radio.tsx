"use client";
import { CircleDollarSign } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { OptionItemProps } from "./option-card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface OptionItemsRadioProps {
  options: OptionItemProps[];
}

export function OptionItemsRadio({ options }: OptionItemsRadioProps) {
  if (!options || options?.length < 1) return;

  const handleOptionChange = (value: string) => {
    console.log("value radio: ", value);
  };

  return (
    <div className="pr-4 pl-1">
      <RadioGroup onValueChange={handleOptionChange} className="space-y-3">
        {options.map((option) => {
          return (
            <div key={option.name} className="flex items-center space-x-2">
              <RadioGroupItem value={option.name} id={option.name} />
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {option.discountPercentage && (
                    <CircleDollarSign size={18} className="text-green-500" />
                  )}
                  <span className="text-light text-sm font-normal">
                    {option.name}
                  </span>
                </div>

                {option.price && option.discountPercentage && (
                  <div className="flex items-center gap-1">
                    <span className="text-light text-xs font-bold">
                      de {formatCurrency(option.price)} por
                    </span>
                    <span className="text-sm font-bold text-green-500">
                      {formatCurrency(
                        calculateProductTotalPrice({
                          price: option.price,
                          discountPercentage: option.discountPercentage,
                        }),
                      )}
                    </span>
                  </div>
                )}

                {option.price && !option.discountPercentage && (
                  <span className="text-sm font-bold text-purple-500">
                    {option.isAdditionalOption && "+"}
                    {formatCurrency(option.price)}
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
