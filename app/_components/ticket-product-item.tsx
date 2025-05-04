import { formatCurrency } from "../_helpers/price";
import { ICartOption } from "../_stores/cartStore";

interface ITicketProductItem {
  itemList: ICartOption[];
}

export function TicketProductItem({ itemList }: ITicketProductItem) {
  return (
    <div className="text-light flex gap-1 text-xs font-bold">
      <p>•</p>
      <div>
        <h3>{itemList[0]?.optionTitle}</h3>
        {itemList?.map((item) => {
          return (
            <div key={item.id} className="flex items-center gap-3">
              <h4 className="font-semibold">
                {item?.quantity &&
                  item?.type !== "size" &&
                  `${item?.quantity}x `}{" "}
                {item?.name}
              </h4>
              {(item?.price || item?.price != 0) && (
                <span className="text-xs font-bold text-teal-400">
                  {item?.type !== "size" && "+"}
                  {formatCurrency(item?.quantity * item.price)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
