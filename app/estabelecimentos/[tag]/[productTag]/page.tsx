import { ButtonAddToTicket } from "@/app/_components/button-add-to-ticket";
import Footer from "@/app/_components/footer";
import Header from "@/app/_components/header";
import { ProductItem } from "@/app/_components/product-item";
import { Textarea } from "@/app/_components/ui/textarea";
import Image from "next/image";

interface EstablishmentProductPageProps {
  params: {
    tag: string;
    productTag: string;
  };
}

export default async function EstablishmentProductPage({
  params,
}: EstablishmentProductPageProps) {
  const { tag: establishmentTag, productTag } = await params;

  console.log({ establishmentTag });
  console.log({ productTag });

  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="sm:bg-neutrals-100 sm:flex sm:flex-col sm:items-center">
        <main className="max-w-[700px] flex-1 bg-white sm:w-[700px]">
          <Image
            alt="Imagem da comida japonesa"
            src="/mockups-images/burger.jpg"
            height={0}
            width={0}
            className="object-fit h-[195px] w-full sm:object-cover"
            sizes="100%"
            quality={100}
          />

          <div className="p-4 pb-6">
            <div className="space-y-1.5">
              <h1 className="text-neutrals-700 text-xl font-bold">
                Ceviche de salmão
              </h1>
              <div className="flex items-center gap-2">
                <h2 className="text-light text-sm font-extrabold">
                  a partir de{" "}
                </h2>
                <h2 className="text-lg font-extrabold text-purple-500">
                  R$ 19,90
                </h2>
              </div>
              <p className="text-light text-sm font-semibold">
                salmão temperado com limão, cebola e pimenta
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-neutrals-700 text-base font-bold">
                  quantos?
                </p>
                <div className="mt-1.5 flex items-center gap-1">
                  <span className="text-light text-sm font-semibold">
                    total
                  </span>
                  <span className="text-neutrals-700 text-sm font-bold">
                    R$19,90
                  </span>
                </div>
              </div>
              <ButtonAddToTicket />
            </div>
          </div>

          <div className="bg-neutrals-100 h-1" />

          <ProductItem
            title="qual o tamanho?"
            minQuantity={1}
            type="radio"
            options={[
              {
                name: "médio",
                price: 20.0,
                discountPercentage: 10,
              },
              {
                name: "grande",
                price: 28.9,
              },
            ]}
          />

          <div className="bg-neutrals-100 h-1" />

          <ProductItem
            title="acompanhamentos"
            minQuantity={1}
            maxQuantity={2}
            type="checkbox"
            options={[
              { name: "shoyu" },
              { name: "gengibre" },
              { name: "wasabi" },
              { name: "sem acompanhamentos" },
            ]}
          />

          <div className="bg-neutrals-100 h-1" />

          <ProductItem
            title="vai querer bebida?"
            type="quantity"
            options={[
              { name: "coca-cola", price: 5.0, isAdditionalOption: true },
              { name: "fanta laranja", price: 5.0, isAdditionalOption: true },
              {
                name: "guaraná antárctica",
                price: 5.0,
                isAdditionalOption: true,
              },
              {
                name: "suco prats laranja",
                price: 6.0,
                isAdditionalOption: true,
              },
              { name: "água sem gás", price: 3.0, isAdditionalOption: true },
            ]}
          />

          <div className="bg-neutrals-100 h-1" />

          <ProductItem
            title="precisa de talher?"
            maxQuantity={1}
            type="radio"
            options={[
              {
                name: "hashi",
              },
              {
                name: "garfo e faca descartável",
                price: 1.0,
                isAdditionalOption: true,
              },
            ]}
          />

          <div className="bg-neutrals-100 h-1" />

          <ProductItem
            title="mais alguma coisa?"
            maxQuantity={2}
            type="checkbox"
            options={[
              {
                name: "biscoito da sorte",
                price: 2.0,
                isAdditionalOption: true,
              },
              {
                name: "rolinho primavera",
                price: 8.0,
                isAdditionalOption: true,
              },
              {
                name: "guioza",
                price: 6.0,
                isAdditionalOption: true,
              },
            ]}
          />

          <div className="bg-neutrals-100 h-1" />

          <div className="mb-11 p-4 pb-6">
            <Textarea
              placeholder="alguma observação do item? ex: tirar algum ingrediente, ponto do prato
texto do input (opcional)"
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
