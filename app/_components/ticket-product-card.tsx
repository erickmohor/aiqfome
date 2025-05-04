"use client";
import { CircleMinus, CirclePlus, Edit2 } from "lucide-react";
import { TicketProductItem } from "./ticket-product-item";
import { ICartOption, ICartProduct, useCartStore } from "../_stores/cartStore";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import { IEstablishment } from "../_services/establishment";
import { useEffect, useState } from "react";

interface TicketProductCardProps {
  establishment: IEstablishment;
  product: ICartProduct;
  options: ICartOption[];
}
export function TicketProductCard({
  establishment,
  product,
  options,
}: TicketProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  const cartStore = useCartStore();

  useEffect(() => {
    const cartProduct = cartStore.products.find(
      (cartProduct) =>
        cartProduct.id === product.id &&
        cartProduct.establishmentId === product.establishmentId,
    );
    if (cartProduct) {
      setQuantity(cartProduct?.quantity);
    }
  }, [cartStore.products, product.establishmentId, product.id]);

  const updateCart = (newQuantity: number) => {
    if (newQuantity > 0) {
      return cartStore.addProducts({
        establishmentId: product.establishmentId,
        productId: product.id,
        productName: product.productName,
        quantity: newQuantity,
      });
    }
    cartStore.addProducts({
      establishmentId: product.establishmentId,
      productId: product.id,
      productName: product.productName,
      quantity: 0,
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((currentQuantity) => {
      const newQuantity = currentQuantity + 1;

      queueMicrotask(() => {
        updateCart(newQuantity);
      });
      return newQuantity;
    });
  };

  const handleDecreaseQuantity = () => {
    setQuantity((currentQuantity) => {
      let newQuantity = 0;

      if (currentQuantity > 1) {
        newQuantity = currentQuantity - 1;
      }

      queueMicrotask(() => {
        updateCart(newQuantity);
      });

      return newQuantity;
    });
  };

  const productOptions = options?.filter(
    (option) => option.productId === product.id,
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-neutrals-900 text-sm font-bold">
          {product.productName}
        </h1>
        <h2 className="text-sm font-bold text-purple-500">
          {product.total && formatCurrency(product.total)}
        </h2>
      </div>

      <div className="mt-1.5 flex w-full items-center justify-end gap-6">
        <Link
          href={`/estabelecimentos/${establishment?.tag}`}
          className="flex cursor-pointer items-center gap-1 text-sm font-bold text-teal-400"
        >
          <Edit2 size={16} />
          editar
        </Link>

        <div className="flex items-center gap-1">
          <button type="button" onClick={handleDecreaseQuantity}>
            <CircleMinus size={24} className="cursor-pointer text-teal-400" />
          </button>
          <span className="text-neutrals-700 w-8 text-center text-sm font-bold">
            {quantity}
          </span>
          <button type="button" onClick={handleIncreaseQuantity}>
            <CirclePlus size={24} className="cursor-pointer text-teal-400" />
          </button>
        </div>
      </div>

      <div className="mt-1.5 flex flex-col gap-1.5">
        {productOptions?.map((option) => {
          return <TicketProductItem key={option.id} option={option} />;
        })}
      </div>
    </div>
  );
}
