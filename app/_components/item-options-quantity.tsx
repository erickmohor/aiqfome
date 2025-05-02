"use client";
import { formatCurrency } from "../_helpers/price";
import { CartProductItemProps, ItemOptionProps } from "./product-item";

import { useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";

interface ItemOptionsQuantityProps {
  options: ItemOptionProps[];
}

export function ItemOptionsQuantity({ options }: ItemOptionsQuantityProps) {
  const [items, setItems] = useState<CartProductItemProps[] | []>([]);

  if (!options || options?.length < 1) return;

  const handleOnChangeQuantity = (
    name: string,
    currentQuantity: number,
    action: "increase" | "decrease",
  ) => {
    let newQuantity: number = currentQuantity;
    if (action === "increase") newQuantity = currentQuantity + 1;
    if (action === "decrease") newQuantity = currentQuantity - 1;

    const isItemAlreadyOnTheList = items?.some((item) => item.name === name);

    if (action === "decrease" && currentQuantity < 1 && !isItemAlreadyOnTheList)
      return;

    if (isItemAlreadyOnTheList) {
      if (action === "decrease" && newQuantity < 1) {
        return setItems((prev) => {
          const newItems = prev.filter((item) => item.name !== name);
          return newItems ?? [];
        });
      }

      return setItems((prev) =>
        prev.map((item) => {
          if (item.name == name) {
            item.quantity = newQuantity;
          }
          return item;
        }),
      );
    }

    setItems((currentItems) => [
      ...currentItems,
      { name, quantity: newQuantity, price: 0 },
    ]);
  };

  return (
    <div className="space-y-3 pr-4 pl-1">
      {options.map((option) => {
        let quantity = 0;
        const item = items?.find((item) => item.name === option.name);
        if (item?.quantity) quantity = item.quantity;

        return (
          <div
            key={option.name}
            className="flex items-center justify-between gap-3 py-1"
          >
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    handleOnChangeQuantity(option.name, quantity, "decrease")
                  }
                >
                  <CircleMinus
                    size={24}
                    className="text-neutrals-400 fill-neutrals-100 cursor-pointer"
                  />
                </button>
                <span className="text-neutrals-700 w-8 text-center text-sm font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    handleOnChangeQuantity(option.name, quantity, "increase")
                  }
                >
                  <CirclePlus
                    size={24}
                    className="cursor-pointer text-teal-400"
                  />
                </button>
              </div>

              <span className="text-light text-sm font-semibold">
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
