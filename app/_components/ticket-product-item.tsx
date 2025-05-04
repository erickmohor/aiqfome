import { ICartOption } from "../_stores/cartStore";

interface ITicketProductItem {
  option: ICartOption;
}

export function TicketProductItem({ option }: ITicketProductItem) {
  return (
    <div className="text-light flex gap-1 text-xs font-bold">
      <p>•</p>
      <div>
        <h3>{option?.optionTitle}</h3>
        <h4 className="font-semibold">
          {option?.quantity && `${option?.quantity}x `} {option?.name}
        </h4>
      </div>
    </div>
  );
}
