import { OptionCard } from "@/app/_components/option-card";
import { Textarea } from "@/app/_components/ui/textarea";
import { IOption } from "./options";

interface OptionsFormProps {
  establishmentId: string;
  options: IOption[];
}

export function OptionsForm({ establishmentId, options }: OptionsFormProps) {
  return (
    <form>
      {options.map((option) => {
        return (
          <OptionCard
            key={option.id}
            establishmentId={establishmentId}
            option={option}
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
