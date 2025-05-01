import { CircleDollarSign } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";

export default function ProductItem() {
  const price = 13.99;
  const discountPercentage = 30;
  const priceIsNotFixed = true;

  return (
    <div className="flex justify-between gap-4">
      <div>
        <h1 className="text-neutrals-900 text-sm font-semibold">Mix</h1>

        <p className="text-neutrals-500 text-xs">
          Escolha 3 ingredientes: shimeji, alface americana, rúcula, pepino,
          tomate seco, cream cheese, maionese, goiabada, banana, requeijão,
          molho de maracujá, manga, maçã e morango.
        </p>
      </div>

      <div className="min-w-[3.75rem]">
        {discountPercentage ? (
          <div className="text-right">
            <p className="text-light text-xs font-bold line-through">
              {formatCurrency(price)}
            </p>
            <div className="flex items-center gap-0.5">
              <CircleDollarSign size={12} className="text-green-500" />
              <p className="text-sm font-bold text-green-500">
                {formatCurrency(
                  calculateProductTotalPrice({ price, discountPercentage }),
                )}
              </p>
            </div>
          </div>
        ) : (
          <>
            {priceIsNotFixed && (
              <p className="text-light text-xs font-bold">a partir de</p>
            )}
            <p className="text-sm font-bold text-purple-500">
              {formatCurrency(price)}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
