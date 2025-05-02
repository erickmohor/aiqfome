import { IGetAllGroupedByStatusResponse } from "../_services/establishment";
import EstablishmentItem from "./establishment-item";

interface EstablishmentListProps {
  establishments: IGetAllGroupedByStatusResponse | undefined;
}

export default function EstablishmentList({
  establishments,
}: EstablishmentListProps) {
  if (!establishments) {
    return (
      <div className="mb-4 px-4 py-6">
        <h1 className="text-light mb-4 text-center text-xl font-semibold">
          nenhum estabelecimento encontrado
        </h1>
      </div>
    );
  }

  return (
    <div className="mb-4 px-4 py-6">
      <h1 className="mb-4 text-xl font-extrabold text-purple-500">abertos</h1>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        {establishments.openEstablishments.length > 0 ? (
          establishments.openEstablishments.map((establishment) => {
            return (
              <EstablishmentItem
                key={establishment.id}
                establishment={establishment}
              />
            );
          })
        ) : (
          <p className="text-light font-semibold italic">
            Nenhum estabelecimento se encontra aberto
          </p>
        )}
      </div>

      <h1 className="mt-6 mb-4 text-xl font-extrabold text-purple-500">
        fechados
      </h1>

      <div className="flex flex-col flex-wrap gap-4 sm:flex-row">
        {establishments.closedEstablishments.length > 0 ? (
          establishments.closedEstablishments.map((establishment) => {
            return (
              <EstablishmentItem
                key={establishment.id}
                establishment={establishment}
                isClosed
              />
            );
          })
        ) : (
          <p className="text-light font-semibold italic">
            Nenhum estabelecimento se encontra fechado
          </p>
        )}
      </div>
    </div>
  );
}
