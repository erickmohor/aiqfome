"use client";
import { useEffect, useState } from "react";
import { formatCurrency } from "../_helpers/price";
import { Checkbox } from "./ui/checkbox";
import { ICartOption, useCartStore } from "../_stores/cartStore";
import { IOption } from "./options";
import { IOptionItem } from "./option-card";

interface OptionItemsCheckboxProps {
  establishmentId: string;
  productName: string;
  option: IOption;
}

export function OptionItemsCheckbox({
  establishmentId,
  productName,
  option,
}: OptionItemsCheckboxProps) {
  const [selectedItems, setSelectedItems] = useState<ICartOption[]>([]);

  const cartStore = useCartStore();

  useEffect(() => {
    const optionsInCart = cartStore.options.filter(
      (cartOption) =>
        cartOption.optionId === option.id &&
        cartOption.productId === option.productId,
    );

    if (optionsInCart.length > 0) {
      setSelectedItems(optionsInCart);
    }
  }, [cartStore.options, option.id, option.productId]);

  const updateCart = (items: ICartOption[]) => {
    if (items?.length > 0) {
      return cartStore.addOptions(items);
    }
    cartStore.removeOptions({
      establishmentId,
      productId: option.productId,
      optionId: option.id,
      productName,
    });
  };

  if (!option) return;

  const handleCheckedChange = (
    item: IOptionItem,
    checked: string | boolean,
  ) => {
    const isOptionAlreadyOnTheList = selectedItems?.some(
      (selectedItem) => selectedItem.name === item.name,
    );

    if (!isOptionAlreadyOnTheList && checked) {
      return setSelectedItems((prev) => {
        const newSelectedItems: ICartOption[] = [
          ...prev,
          {
            id: item.id,
            optionId: option.id,
            establishmentId,
            productId: option.productId,
            productName,
            optionTitle: option.title,
            name: item.name,
            type: "extra",
            quantity: 1,
            price: item.price ?? 0,
            total: item.price ?? 0,
          },
        ];

        queueMicrotask(() => {
          updateCart(newSelectedItems);
        });

        return newSelectedItems;
      });
    }

    if (isOptionAlreadyOnTheList && !checked) {
      return setSelectedItems((prev) => {
        const newSelectedItems = prev.filter(
          (selectedItem) => selectedItem.name !== item.name,
        );

        queueMicrotask(() => {
          updateCart(newSelectedItems);
        });
        return newSelectedItems;
      });
    }
  };

  return (
    <div className="space-y-3 pr-4 pl-1">
      {option.optionsItems.map((item) => {
        const itemIsSelected = selectedItems.some(
          (selectedItem) => selectedItem.id === item.id,
        );

        return (
          <div
            key={item.name}
            className="flex items-center justify-between gap-3 py-1"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={itemIsSelected}
                onCheckedChange={(checked) =>
                  handleCheckedChange(item, checked)
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
