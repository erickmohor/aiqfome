import DeliveryInfo from "@/app/_components/delivery-info";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { Menu } from "@/app/_components/menu";
import { checkIfEstablishmentIsOpenNow, DayOfWeek } from "@/app/_helpers/date";
import { formatCurrency } from "@/app/_helpers/price";
import { establishmentService } from "@/app/_services/establishment";
import { format } from "date-fns";
import { ChevronRight, Heart, Share2, Star } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface EstablishmentPageProps {
  params: {
    tag: string;
  };
}

export default async function EstablishmentPage({
  params,
}: EstablishmentPageProps) {
  const { tag: establishmentTag } = await params;

  const { establishment } = await establishmentService.getEstablishment({
    tag: establishmentTag,
  });

  if (!establishment) {
    return notFound();
  }

  const dayOfWeek: DayOfWeek = format(
    new Date(),
    "eeee",
  ).toLowerCase() as DayOfWeek;

  const formattedClosingTime =
    establishment.establishment_hours[dayOfWeek].closes;

  const isOpen = checkIfEstablishmentIsOpenNow({
    formattedOpeningHours: establishment.establishment_hours[dayOfWeek].opens,
    formattedClosingTime: establishment.establishment_hours[dayOfWeek].closes,
  });

  console.log("isOpen: ", isOpen);

  return (
    <div className="flex h-full flex-col">
      <Header />

      <main className="flex-1 py-6 sm:flex sm:flex-col sm:items-center">
        <div className="max-w-[600px] sm:w-[600px]">
          <div className="flex items-center gap-2 px-4">
            <div className="border-neutrals-100 relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-sm border">
              {establishment.image ? (
                <Image
                  alt={`${establishment.name} Logo`}
                  src={establishment.image}
                  fill
                  sizes="100%"
                  className={`${!isOpen && "opacity-40"}`}
                  quality={100}
                />
              ) : (
                <Image
                  alt="Estabelecimento sem Logo"
                  src="/aiqfome-logo-roxo.png"
                  width={15}
                  height={15}
                  sizes="100%"
                  className={`${!isOpen && "opacity-40"}`}
                />
              )}
            </div>

            <h1 className="text-neutrals- text-neutrals-900 text-xl font-extrabold">
              {establishment.name}
            </h1>
          </div>

          <div className="mt-2 mb-2 flex items-center justify-between px-4 text-xs">
            <div className="mt-1 flex gap-3">
              <button className="cursor-pointer p-1 text-purple-700">
                <Share2 size={24} className="rotate-180" />
              </button>
              <button className="cursor-pointer p-1 text-purple-700">
                <Heart size={24} />
              </button>
            </div>

            <button className="flex cursor-pointer items-center gap-1 font-bold text-teal-400">
              mais infos
              <ChevronRight size={8} />
            </button>
          </div>

          <div className="mt-1.5 px-4">
            <DeliveryInfo establishment={establishment} />
          </div>

          <div className="mt-2 flex items-center gap-1.5 px-4 text-xs">
            <div className="flex items-center gap-1">
              <Star size={18} color="#FFB300" fill="#FFB300" />
              <span className="text-light text-sm font-bold">
                {establishment.rating} de 5
              </span>
            </div>

            <div className="text-neutrals-400 font-bold">•</div>

            <span
              className={`font-bold ${isOpen ? "text-green-500" : "text-red-500"}`}
            >
              {isOpen && `fecha às ${formattedClosingTime}`}
              {!isOpen && "fechado"}
            </span>
          </div>

          <p className="text-light mt-1 px-4 text-xs font-bold">
            pedido mínimo:{" "}
            {establishment.min_purchase_value &&
              formatCurrency(establishment.min_purchase_value)}
          </p>
        </div>

        <div className="mt-4 w-full max-w-[600px]">
          <Menu />
        </div>
      </main>

      <Footer />
    </div>
  );
}
