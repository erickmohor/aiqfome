"use client";
import { ChangeEventHandler, useState } from "react";
import { SearchIcon } from "lucide-react";
import Header from "./_components/header";

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
    </div>
  );
}
