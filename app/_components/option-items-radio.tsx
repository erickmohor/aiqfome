"use client";
import { CircleDollarSign } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { IOption } from "./options";
import { ICartOption, useCartStore } from "../_stores/cartStore";
import { useEffect, useState } from "react";

interface OptionItemsRadioProps {
  establishmentId: string;
  productName: string;
  option: IOption;
}

export function OptionItemsRadio({
  establishmentId,
  productName,
  option,
}: OptionItemsRadioProps) {
  const [defaultItems, setDefaultItems] = useState<ICartOption[]>([]);

  const cartStore = useCartStore();

  useEffect(() => {
    const optionsInCart = cartStore.options.filter(
      (cartOption) =>
        cartOption.optionId === option.id &&
        cartOption.productId === option.productId,
    );

    if (optionsInCart.length > 0) {
      setDefaultItems(optionsInCart);
    }
  }, [cartStore.options, option.id, option.productId]);

  if (!option) return;

  const handleOptionChange = (value: string) => {
    const selectedOptions = option.optionsItems.filter(
      (item) => item.name === value,
    );

    const selectedOption = selectedOptions[0];

    if (selectedOption) {
      let price = selectedOption.price ?? 0;

      if (selectedOption.price && selectedOption.discountPercentage) {
        price = calculateProductTotalPrice({
          price: selectedOption.price,
          discountPercentage: selectedOption.discountPercentage,
        });
      }
      cartStore.addOptions([
        {
          id: selectedOption.id,
          optionId: option.id,
          establishmentId,
          productId: option.productId,
          productName,
          optionTitle: option.title,
          name: selectedOption.name,
          type: option.type === "size" ? "size" : "extra",
          price,
          quantity: 1,
          total: price,
        },
      ]);
    }
  };

  return (
    <div className="pr-4 pl-1">
      <RadioGroup onValueChange={handleOptionChange} className="space-y-3">
        {option.optionsItems.map((item) => {
          const itemIsSelected = defaultItems.some(
            (defaultItem) => defaultItem.id === item.id,
          );

          return (
            <div key={item.name} className="flex items-center space-x-2">
              <RadioGroupItem
                checked={itemIsSelected}
                value={item.name}
                id={item.name}
              />
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
