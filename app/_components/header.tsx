import Image from "next/image";
import { ChevronRight, MapPin } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-6 bg-purple-500 p-4">
      <Image
        alt="Aiqfome logo"
        src="/aiqfome-logo.png"
        width={32}
        height={32}
      />

      <div className="flex flex-1 items-center gap-3.5 text-white">
        <MapPin size={24} />
        <div>
          <p className="text-sm font-bold">entregando em</p>
          <div className="flex items-center gap-1">
            <p className="text-base font-bold">Rua Mandaguari, 198</p>
            <ChevronRight size={16} />
          </div>
        </div>
      </div>

      <Image
        alt="Ícone de usuário"
        src="/icons/user.svg"
        width={16}
        height={18}
      />
    </div>
  );
}
