"use client";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import EstablishmentList from "./_components/establishment-list";
import Footer from "./_components/footer";
import { useQuery } from "@tanstack/react-query";
import { establishmentService } from "./_services/establishment";
import { Loading } from "./_components/ui/loading";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["establishments-grouped-by-status", searchValue],
    queryFn: async () =>
      await establishmentService.getAllGroupedByStatus({ search: searchValue }),
  });

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex h-full flex-col">
      <Header />

      <div className="flex flex-col items-center bg-purple-500">
        <form className="w-full pr-4 pb-4 pl-4 sm:w-[600px]">
          <div className="flex gap-1 rounded-[0.5rem] bg-white px-3 py-2">
            <SearchIcon size={24} color="#A8ADB7" />

            <input
              placeholder="busque pela loja ou culinária"
              value={searchValue}
              onChange={handleOnChange}
              className="placeholder:text-light text-light w-full text-sm font-semibold outline-0 placeholder:text-sm placeholder:font-semibold"
            />
          </div>
        </form>
      </div>

      <main className="flex flex-col items-center">
        <div className="w-full flex-1 sm:max-w-[900px]">
          <Image
            alt="Banner promocional - Rango barato no dia das crianças - Peça com até 50% off"
            src="/promo-banner.png"
            height={0}
            width={0}
            className="mt-[1px] max-h-[135px] w-full object-contain"
            sizes="100%"
            quality={100}
            priority
          />

          {isLoading && (
            <div className="flex justify-center p-10">
              <Loading size="md" />
            </div>
          )}

          {!isLoading && <EstablishmentList establishments={data} />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
