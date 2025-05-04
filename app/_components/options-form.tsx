import { OptionCard } from "@/app/_components/option-card";
import { Textarea } from "@/app/_components/ui/textarea";
import { IProduct } from "./product-card";

interface OptionsFormProps {
  product: IProduct;
}

export function OptionsForm({ product }: OptionsFormProps) {
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
        />
      </div>
    </form>
  );
}
