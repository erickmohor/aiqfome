import { Star } from "lucide-react";
import Image from "next/image";

export default function EstablishmentItem() {
  const withDeliveryFee = true;
  const isClosed = false;

  return (
    <div className="bg-neutrals-50 flex items-center gap-3 overflow-hidden rounded-lg sm:min-w-[250px]">
      <div className="border-neutrals-100 relative h-[72px] min-w-[72px] rounded-tl-lg rounded-bl-lg border-[1px]">
        <Image
          alt="Matsuri Concept Logo"
          src={"/mockups-images/subway.png"}
          fill
          className={`rounded-tl-lg rounded-bl-lg ${isClosed && "opacity-40"}`}
          quality={100}
        />
      </div>

      <div className="space-y-1">
        <h2 className="text-neutrals-700 text-base font-bold">
          Matsuri Concept
        </h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {withDeliveryFee ? (
              <>
                <Image
                  alt="Taxa de entrega"
                  src="/icons/delivery-fee.svg"
                  width={18}
                  height={18}
                />
                <span className="text-sm font-bold text-purple-500">
                  R$6,00
                </span>
              </>
            ) : (
              <>
                <Image
                  alt="Entrega grátis"
                  src="/icons/delivery-free.svg"
                  width={18}
                  height={18}
                />
                <span className="text-sm font-bold text-teal-600">grátis</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Star size={18} color="#FFB300" fill="#FFB300" />
            <span className="text-light text-sm font-bold">4.7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
