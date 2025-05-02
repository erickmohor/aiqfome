import { Badge } from "./ui/badge";

interface ProductItemHeaderProps {
  title: string;
  minQuantity?: number;
  maxQuantity?: number;
}

export function ProductItemHeader({
  title,
  minQuantity,
  maxQuantity,
}: ProductItemHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <p className="text-neutrals-900 text-base font-bold">{title}</p>
        <span className="text-light text-sm font-semibold">
          {minQuantity && !maxQuantity && `escolha ${minQuantity}`}
          {minQuantity &&
            maxQuantity &&
            `escolha de ${minQuantity} a ${maxQuantity}`}
          {!minQuantity && maxQuantity && `escolha até ${maxQuantity}`}
          {!minQuantity && !maxQuantity && `escolha quantos quiser`}
        </span>
      </div>

      {minQuantity && <Badge className="px-2 py-1.5">obrigatório</Badge>}
    </div>
  );
}
