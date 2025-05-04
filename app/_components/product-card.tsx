import { CircleDollarSign } from "lucide-react";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { IOption, Options } from "./options";

export interface IProduct {
  id: string;
  establishmentId: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  discountPercentage?: number;
  priceIsNotFixed?: boolean;
  options: IOption[];
}

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex w-full cursor-pointer justify-between gap-4 text-left">
          <div className="flex flex-1 flex-col">
            <h1 className="text-neutrals-900 text-sm font-semibold">
              {product.name}
            </h1>

            <p className="text-neutrals-500 text-xs">{product.description}</p>
          </div>

          <div className="min-w-[3.75rem]">
            {product.discountPercentage ? (
              <div className="text-right">
                <p className="text-light text-xs font-bold line-through">
                  {formatCurrency(product.price)}
                </p>
                <div className="flex items-center gap-0.5">
                  <CircleDollarSign size={12} className="text-green-500" />
                  <p className="text-sm font-bold text-green-500">
                    {formatCurrency(
                      calculateProductTotalPrice({
                        price: product.price,
                        discountPercentage: product.discountPercentage,
                      }),
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {product.priceIsNotFixed && (
                  <p className="text-light text-xs font-bold">a partir de</p>
                )}
                <p className="text-sm font-bold text-purple-500">
                  {formatCurrency(product.price)}
                </p>
              </>
            )}
          </div>
        </button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-[420px] border-0 text-white sm:max-w-[420px]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <Options product={product} />
      </SheetContent>
    </Sheet>
  );
}
