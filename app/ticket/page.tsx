"use client";
import Header from "@/app/_components/header";
import { establishmentService } from "@/app/_services/establishment";
import Image from "next/image";
import { useCartStore } from "../_stores/cartStore";
import { useQuery } from "@tanstack/react-query";
import { TicketProductCard } from "../_components/ticket-product-card";
import { Button } from "../_components/ui/button";
import { formatCurrency } from "../_helpers/price";
import Link from "next/link";
import Footer from "../_components/footer";

export default function TicketPage() {
  const cartStore = useCartStore();

  const establishmentId = cartStore.establishmentId;

  const { data, isLoading } = useQuery({
    queryKey: ["establishment", establishmentId],
    queryFn: () =>
      establishmentService.getEstablishmentById(cartStore.establishmentId),
    enabled: !!establishmentId,
  });

  const establishment = data?.establishment;
  const products = cartStore?.products.filter(
    (product) => product.establishmentId === establishmentId,
  );
  const options = cartStore?.options.filter(
    (option) => option.establishmentId === establishmentId,
  );

  const total = cartStore?.total;

  if (isLoading || !establishment) {
    return (
      <div className="flex h-full flex-col">
        <Header />

        <main className="flex flex-1 flex-col items-center gap-10 py-6">
          <p className="text-light mt-4 text-center text-sm font-semibold italic">
            Nenhum produto adicionado ao carrinho
          </p>

          <Button variant="outline" asChild>
            <Link href="/">Voltar</Link>
          </Button>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <Header />

      <main className="flex-1 py-6 sm:flex sm:flex-col sm:items-center">
        <div className="max-w-[600px] sm:w-[600px]">
          <div className="flex items-center gap-2 px-4">
            <div className="border-neutrals-100 relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-sm border">
              {establishment?.image ? (
                <Image
                  alt={`${establishment.name} Logo`}
                  src={establishment.image}
                  fill
                  sizes="100%"
                  quality={100}
                />
              ) : (
                <Image
                  alt="Estabelecimento sem Logo"
                  src="/aiqfome-logo-roxo.png"
                  width={15}
                  height={15}
                  sizes="100%"
                />
              )}
            </div>

            <div>
              <h2 className="text-light text-sm font-bold">seus itens em</h2>
              <h1 className="text-neutrals-900 text-base font-bold">
                {establishment?.name}
              </h1>
            </div>
          </div>

          <div className="">
            {products.length > 0 ? (
              products?.map((product, index) => {
                return (
                  <div key={product.id}>
                    <TicketProductCard
                      establishment={establishment}
                      product={product}
                      options={options}
                    />
                    {index !== products.length - 1 && (
                      <div className="bg-neutrals-100 h-1" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="w-full">
                <p className="text-light mt-4 text-center text-sm font-semibold italic">
                  Nenhum produto adicionado ao carrinho
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <Button variant="outline" asChild>
            <Link href={`/estabelecimentos/${establishment.tag}`}>
              {products?.length > 0
                ? "adicionar mais produtos"
                : "adicionar produtos"}
            </Link>
          </Button>
        </div>
      </main>

      <footer className="flex items-center justify-center gap-7 rounded-tl-[12px] rounded-tr-[12px] bg-white p-6 text-center font-bold text-purple-700 shadow-2xl shadow-black">
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-neutrals-900 text-sm font-bold">subtotal</span>
          <span className="text-xl font-extrabold text-purple-500">
            {formatCurrency(total)}
          </span>
        </div>

        <Button variant="secondary" className="px-10 py-3.5">
          ir para pagamento
        </Button>
      </footer>
    </div>
  );
}
