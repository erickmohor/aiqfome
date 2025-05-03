import { OptionCard } from "@/app/_components/option-card";
import { Textarea } from "@/app/_components/ui/textarea";
import { IOption } from "./options";

interface OptionsFormProps {
  options: IOption[];
}

export function OptionsForm({ options }: OptionsFormProps) {
  return (
    <form>
      {options.map((option) => {
        return (
          <OptionCard
            key={option.id}
            id={option.id}
            productId={option.productId}
            title={option.title}
            minQuantity={option.minQuantity}
            maxQuantity={option.maxQuantity}
            type={option.type}
            optionsItems={option.optionsItems}
          />
        );
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
