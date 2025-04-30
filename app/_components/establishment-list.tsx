import EstablishmentItem from "./establishment-item";

export default function EstablishmentList() {
  return (
    <div className="mb-4 px-4 py-6">
      <h1 className="mb-4 text-xl font-extrabold text-purple-500">abertos</h1>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        <EstablishmentItem />
      </div>

      <h1 className="mt-6 mb-4 text-xl font-extrabold text-purple-500">
        fechados
      </h1>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        <EstablishmentItem />
      </div>
    </div>
  );
}
