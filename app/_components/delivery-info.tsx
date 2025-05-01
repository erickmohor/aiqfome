import { ChevronRight } from "lucide-react";
import Image from "next/image";

export default function DeliveryInfo() {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 text-purple-500">
          <Image
            alt="Taxa de entrega"
            src="/icons/motorcycle-purple.svg"
            width={18}
            height={18}
          />

          <span className="text-sm font-bold">R$6,00</span>

          <ChevronRight size={12} />
        </div>

        <div className="text-neutrals-400 text-xs font-bold">•</div>

        <span className="text-light text-xs font-bold">hoje, 30-40 min</span>

        <div className="text-neutrals-400 text-xs font-bold">•</div>

        <span className="text-light text-xs font-bold">5.2km</span>
      </div>

      <div className="mt-1.5 flex w-fit items-center rounded-sm bg-teal-50 px-2 py-1.5">
        <span className="text-xs font-bold text-teal-600">
          entrega grátis acima de R$ 35,00
        </span>
      </div>
    </>
  );
}
