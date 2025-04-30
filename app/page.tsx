"use client";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import EstablishmentList from "./_components/establishment-list";

export default function Home() {
  const [value, setValue] = useState("");

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="h-full">
      <Header />

      <form className="bg-purple-500 pr-4 pb-4 pl-4">
        <div className="flex gap-1 rounded-[0.5rem] bg-white px-3 py-2">
          <SearchIcon size={24} color="#A8ADB7" />

          <input
            placeholder="busque pela loja ou culinária"
            value={value}
            onChange={handleOnChange}
            className="placeholder:text-light text-light w-full text-sm font-semibold outline-0 placeholder:text-sm placeholder:font-semibold"
          />
        </div>
      </form>

      <Image
        alt="Banner promocional - Rango barato no dia das crianças - Peça com até 50% off"
        src="/promo-banner.png"
        height={0}
        width={0}
        className="mt-[1px] max-h-[135px] w-full object-contain"
        sizes="100%"
        quality={100}
      />

      <main className="flex-1">
        <EstablishmentList />
      </main>
    </div>
  );
}
