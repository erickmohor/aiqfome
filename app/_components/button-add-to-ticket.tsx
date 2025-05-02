"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { CirclePlus, Trash2 } from "lucide-react";

export function ButtonAddToTicket() {
  const [quantity, setQuantity] = useState(0);

  const handleIncreaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((currentQuantity) => {
      if (currentQuantity > 1) {
        return currentQuantity - 1;
      }
      return 0;
    });
  };

  return (
    <>
      {quantity ? (
        <div className="flex items-center gap-1">
          <button onClick={handleDecreaseQuantity}>
            <Trash2 size={23} className="mb-1 cursor-pointer text-teal-400" />
          </button>
          <span className="text-neutrals-700 w-8 text-center text-sm font-bold">
            {quantity}
          </span>
          <button onClick={handleIncreaseQuantity}>
            <CirclePlus size={32} className="cursor-pointer text-teal-400" />
          </button>
        </div>
      ) : (
        <Button onClick={handleIncreaseQuantity}>adicionar</Button>
      )}
    </>
  );
}
