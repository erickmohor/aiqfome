import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IEstablishment } from "../_services/establishment";
import { formatCurrency } from "../_helpers/price";

interface EstablishmentItemProps {
  establishment: IEstablishment;
  isClosed?: boolean;
}

export default function EstablishmentItem({
  establishment,
  isClosed = false,
}: EstablishmentItemProps) {
  const deliveryFee = establishment?.delivery_fees[0]
    ? establishment?.delivery_fees[0].value
    : 0;

  return (
    <Link
      href="/estabelecimentos/matsuri-concept"
      className="bg-neutrals-50 flex items-center gap-3 overflow-hidden rounded-lg sm:max-w-[275px] sm:min-w-[275px]"
    >
      <div className="border-neutrals-100 relative flex h-[72px] min-w-[72px] items-center justify-center rounded-tl-lg rounded-bl-lg border-[1px]">
        {establishment.image ? (
          <Image
            alt={`${establishment.name} Logo`}
            src={establishment.image}
            fill
            className={`rounded-tl-lg rounded-bl-lg ${isClosed && "opacity-40"}`}
            sizes="100%"
            quality={100}
          />
        ) : (
          <Image
            alt={`Estabelecimento sem Logo`}
            src="/aiqfome-logo.png"
            width={35}
            height={35}
            className={`rounded-tl-lg rounded-bl-lg ${isClosed && "opacity-40"}`}
            sizes="100%"
          />
        )}
      </div>

      <div className="space-y-1">
        <h2 className="text-neutrals-700 line-clamp-1 text-base font-bold">
          {establishment.name}
        </h2>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {deliveryFee ? (
              <>
                <Image
                  alt="Taxa de entrega"
                  src="/icons/delivery-fee.svg"
                  width={18}
                  height={18}
                />
                <span className="text-sm font-bold text-purple-500">
                  {formatCurrency(deliveryFee)}
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
            <span className="text-light text-sm font-bold">
              {establishment.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
