import Image from "next/image";
import { IProduct } from "./product-card";
import { formatCurrency } from "../_helpers/price";
import { useEffect, useState } from "react";
import { CircleMinus, CirclePlus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "../_stores/cartStore";

interface OptionsHeaderProps {
  product: IProduct;
}

export function OptionsHeader({ product }: OptionsHeaderProps) {
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
        productName: product.name,
        quantity: newQuantity,
      });
    }
    cartStore.addProducts({
      establishmentId: product.establishmentId,
      productId: product.id,
      productName: product.name,
      quantity: 0,
    });
  };

  const productInCart = cartStore.products.find(
    (cartProduct) => cartProduct.id === product.id,
  );

  const price = productInCart?.total ?? 0;

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

  return (
    <>
      <div className="relative flex h-[195px] w-full items-center justify-center">
        {product.image ? (
          <Image
            alt={`Imagem da ${product.name}`}
            src={product.image}
            fill
            className="object-fit sm:object-cover"
            sizes="100%"
            quality={100}
          />
        ) : (
          <Image
            alt="Produto sem imagem"
            src="/aiqfome-logo-roxo.png"
            width={90}
            height={90}
            sizes="100%"
            className="opacity-70"
          />
        )}
      </div>

      <div className="p-4 pb-6">
        <div className="space-y-1.5">
          <h1 className="text-neutrals-700 text-xl font-bold">
            {product.name}
          </h1>
          <div className="flex items-center gap-2">
            <h2 className="text-light text-sm font-extrabold">a partir de </h2>
            <h2 className="text-lg font-extrabold text-purple-500">
              {formatCurrency(product.price)}
            </h2>
          </div>
          <p className="text-light text-sm font-semibold">
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-neutrals-700 text-base font-bold">quantos?</p>
            <div className="mt-1.5 flex items-center gap-1">
              <span className="text-light text-sm font-semibold">total</span>
              <span className="text-neutrals-700 text-sm font-bold">
                {formatCurrency(price)}
              </span>
            </div>
          </div>
          {quantity ? (
            <div className="flex items-center gap-1">
              <button onClick={handleDecreaseQuantity}>
                {quantity === 1 ? (
                  <Trash2
                    size={23}
                    className="mb-1 cursor-pointer text-teal-400"
                  />
                ) : (
                  <CircleMinus
                    size={32}
                    className="cursor-pointer text-teal-400"
                  />
                )}
              </button>
              <span className="text-neutrals-700 w-8 text-center text-sm font-bold">
                {quantity}
              </span>
              <button onClick={handleIncreaseQuantity}>
                <CirclePlus
                  size={32}
                  className="cursor-pointer text-teal-400"
                />
              </button>
            </div>
          ) : (
            <Button onClick={handleIncreaseQuantity}>adicionar</Button>
          )}
        </div>
      </div>
    </>
  );
}
