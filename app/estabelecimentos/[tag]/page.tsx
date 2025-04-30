import DeliveryInfo from "@/app/_components/delivery-info";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { ChevronRight, Heart, Share2, Star } from "lucide-react";
import Image from "next/image";

interface EstablishmentPageProps {
  params: {
    tag: string;
  };
}

export default async function EstablishmentPage({
  params,
}: EstablishmentPageProps) {
  const { tag: establishmentTag } = await params;

  console.log(establishmentTag);
  const isClosed = false;

  return (
    <div className="flex h-full flex-col">
      <Header />

      <main className="flex-1 px-4 py-6 sm:flex sm:flex-col sm:items-center">
        <div className="max-w-[400px] sm:w-[400px]">
          <div className="flex items-center gap-2">
            <div className="border-neutrals-100 relative h-9 w-9 overflow-hidden rounded-sm border">
              <Image
                alt="Matsuri Concept Logo"
                src={"/mockups-images/subway.png"}
                fill
                className={`${isClosed && "opacity-40"}`}
                quality={100}
              />
            </div>

            <h1 className="text-neutrals- text-neutrals-900 text-xl font-extrabold">
              Matsuri Concept
            </h1>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <div className="mt-1 flex gap-3">
              <button className="p-1 text-purple-700">
                <Share2 size={24} className="rotate-180" />
              </button>
              <button className="p-1 text-purple-700">
                <Heart size={24} />
              </button>
            </div>

            <button className="flex items-center gap-1 font-bold text-teal-400">
              mais infos
              <ChevronRight size={8} />
            </button>
          </div>

          <div className="mt-1.5">
            <DeliveryInfo />
          </div>

          <div className="mt-2 flex items-center gap-1.5 text-xs">
            <div className="flex items-center gap-1">
              <Star size={18} color="#FFB300" fill="#FFB300" />
              <span className="text-light text-sm font-bold">4.7 de 5</span>
            </div>

            <div className="text-neutrals-400 font-bold">•</div>

            <span className="font-bold text-green-500">fecha às 20:00</span>
          </div>

          <p className="text-light mt-1 text-xs font-bold">
            pedido mínimo: R$ 15,00
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
