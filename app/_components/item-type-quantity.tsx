"use client";
import { formatCurrency } from "../_helpers/price";
import { useEffect, useState } from "react";
import { CircleMinus, CirclePlus } from "lucide-react";
import { ICartOption, useCartStore } from "../_stores/cartStore";
import { IItem } from "./item-card";
import { ItemTypeProps } from "./item-card";

export function ItemTypeQuantity({ product, option }: ItemTypeProps) {
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
      establishmentId: product.establishmentId,
      productName: product.name,
      productId: option.productId,
      optionId: option.id,
    });
  };

  if (!option) return;

  const handleOnChangeQuantity = (
    item: IItem,
    currentQuantity: number,
    action: "increase" | "decrease",
  ) => {
    let newQuantity: number = currentQuantity;
    if (action === "increase") newQuantity = currentQuantity + 1;
    if (action === "decrease") newQuantity = currentQuantity - 1;

    const isItemAlreadyOnTheList = selectedItems?.some(
      (selectedItem) => selectedItem.name === item.name,
    );

    if (action === "decrease" && currentQuantity < 1 && !isItemAlreadyOnTheList)
      return;

    if (isItemAlreadyOnTheList) {
      if (action === "decrease" && newQuantity < 1) {
        return setSelectedItems((prev) => {
          const newItems = prev.filter(
            (prevItem) => prevItem.name !== item.name,
          );
          queueMicrotask(() => {
            updateCart(newItems);
          });
          return newItems ?? [];
        });
      }

      return setSelectedItems((prev) => {
        const newItems = prev.map((prevItem) => {
          if (prevItem.name == item.name) {
            prevItem.quantity = newQuantity;
            prevItem.total = prevItem.price * newQuantity;
          }
          return prevItem;
        });

        queueMicrotask(() => {
          updateCart(newItems);
        });

        return newItems;
      });
    }

    setSelectedItems((currentItems) => {
      const newItems: ICartOption[] = [
        ...currentItems,
        {
          id: item.id,
          optionId: option.id,
          establishmentId: product.establishmentId,
          productName: product.name,
          productId: option.productId,
          optionTitle: option.title,
          name: item.name,
          type: "extra",
          quantity: 1,
          price: item.price ?? 0,
          total: item.price ?? 0,
        },
      ];

      queueMicrotask(() => {
        updateCart(newItems);
      });

      return newItems;
    });
  };

  return (
    <div className="space-y-3 pr-4 pl-1">
      {option.optionsItems.map((item) => {
        let quantity = 0;
        const selectedItem = selectedItems?.find(
          (selItem) => selItem.name === item.name,
        );
        if (selectedItem?.quantity) quantity = selectedItem.quantity;

        return (
          <div
            key={item.name}
            className="flex items-center justify-between gap-3 py-1"
          >
            <div className="flex items-center space-x-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    handleOnChangeQuantity(item, quantity, "decrease")
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
                  type="button"
                  onClick={() =>
                    handleOnChangeQuantity(item, quantity, "increase")
                  }
                >
                  <CirclePlus
                    size={24}
                    className="cursor-pointer text-teal-400"
                  />
                </button>
              </div>

              <span className="text-light text-sm font-semibold">
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
