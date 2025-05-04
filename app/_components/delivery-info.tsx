import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { IEstablishment } from "../_services/establishment";
import { formatCurrency } from "../_helpers/price";

interface DeliveryInfoProps {
  establishment: IEstablishment;
}

export default function DeliveryInfo({ establishment }: DeliveryInfoProps) {
  return (
    <>
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 text-purple-500">
          <Image
            alt="Taxa de entrega"
            src="/icons/motorcycle-purple.svg"
            width={0}
            height={0}
            sizes="100vw"
            className="object-fit w-[18px]"
          />

          <span className="text-sm font-bold">
            {establishment?.delivery_fees[0]?.value &&
              formatCurrency(establishment.delivery_fees[0].value)}
          </span>

          <ChevronRight size={12} />
        </div>

        <div className="text-neutrals-400 text-xs font-bold">•</div>

        <span className="text-light text-xs font-bold">
          hoje, {establishment.delivery_time_in_minutes.min}-
          {establishment.delivery_time_in_minutes.max} min
        </span>

        <div className="text-neutrals-400 text-xs font-bold">•</div>

        <span className="text-light text-xs font-bold">5.2km</span>
      </div>

      <div className="mt-1.5 flex w-fit items-center rounded-sm bg-teal-50 px-2 py-1.5">
        <span className="text-xs font-bold text-teal-600">
          entrega grátis acima de{" "}
          {establishment?.min_purchase_value &&
            formatCurrency(establishment.min_purchase_value)}
        </span>
      </div>
    </>
  );
}
