"use client";
import { OptionCard } from "@/app/_components/option-card";
import { Textarea } from "@/app/_components/ui/textarea";
import { IProduct } from "./product-card";
import { ChangeEventHandler, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useCartStore } from "../_stores/cartStore";

interface OptionsFormProps {
  product: IProduct;
}

export function OptionsForm({ product }: OptionsFormProps) {
  const [observationMessage, setObservationMessage] = useState("");

  const cartStore = useCartStore();
  const router = useRouter();

  useEffect(() => {
    const productMessage = cartStore.productMessages.find(
      (productMessage) =>
        productMessage.establishmentId === product.establishmentId &&
        productMessage.productId === product.id,
    );
    if (productMessage) {
      setObservationMessage(productMessage.message);
    }
  }, [cartStore.productMessages, product.establishmentId, product.id]);

  const handleOnChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    setObservationMessage(e.target.value);
  };

  const handleOnSubmit = () => {
    cartStore.addProductMessage({
      establishmentId: product.establishmentId,
      productId: product.id,
      message: observationMessage,
    });

    router.push("/ticket");
  };

  return (
    <form>
      {product?.options.map((option) => {
        return <OptionCard key={option.id} product={product} option={option} />;
      })}

      <div className="bg-neutrals-100 h-1" />

      <div className="mb-11 p-4 pb-6">
        <Textarea
          placeholder="alguma observação do item? ex: tirar algum ingrediente, ponto do prato
texto do input (opcional)"
          value={observationMessage}
          onChange={handleOnChange}
        />
      </div>

      <footer className="bg-neutrals-100 flex items-center justify-center">
        <div className="flex max-w-[700px] flex-1 flex-col items-center p-6 text-center font-bold text-purple-700 sm:max-w-[400px]">
          <p className="text-sm">feito com 💜 em maringá-PR</p>

          <Button
            variant="secondary"
            className="mt-4 w-full max-w-[350px] p-3"
            onClick={handleOnSubmit}
            type="button"
          >
            ver ticket
          </Button>
        </div>
      </footer>
    </form>
  );
}
