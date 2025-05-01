"use client";
import { useEffect, useState } from "react";
import { cn } from "../_lib/utils";
import { ChevronDown, ChevronUp, CircleDollarSign } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import ProductItem from "./product-item";

interface ProductListByCategoryProps {
  initOpen?: boolean;
}

export default function ProductListByCategory({
  initOpen = false,
}: ProductListByCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const isHighlight = true;

  useEffect(() => {
    setIsOpen(initOpen);
  }, [initOpen]);

  return (
    <div className="max-w-[400px] bg-white p-4 sm:w-[400px]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1">
              <h1 className="text-neutrals-900 text-base font-bold">Temakis</h1>
              {isHighlight && (
                <CircleDollarSign size={18} className="text-green-500" />
              )}
            </div>
            <p className="text-neutrals-500 text-xs font-semibold">
              sushi em forma de cone com salmão e cream cheese
            </p>
          </div>

          <CollapsibleTrigger asChild>
            <button className="rounded-lg p-1 hover:bg-neutral-100">
              {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent
          className={cn(
            "text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 mt-6 ml-2 space-y-6 outline-none",
          )}
        >
          <ProductItem />
          <ProductItem />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
