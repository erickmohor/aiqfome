import { format } from "date-fns";
import Establishments from "@/app/_mockups/establishments.json";
import { checkIfEstablishmentIsOpenNow, DayOfWeek } from "../_helpers/date";

export interface IEstablishment {
  id: string;
  category: string;
  name: string;
  tag: string;
  image: string;
  rating: number;
  address: string;
  cnpj: string;
  delivery_fees: DeliveryFee[];
  delivery_time_in_minutes: DeliveryTimeInMinutes;
  min_purchase_value: number;
  payment_methods: PaymentMethods;
  delivery_types: string[];
  establishment_hours: EstablishmentHours;
}

export interface DeliveryFee {
  city: string;
  value: number;
}

export interface DeliveryTimeInMinutes {
  min: number;
  max: number;
}

export interface PaymentMethods {
  app: string[];
  cash: string[];
}

export interface EstablishmentHours {
  monday: EstablishmentHoursDetailed;
  tuesday: EstablishmentHoursDetailed;
  wednesday: EstablishmentHoursDetailed;
  thursday: EstablishmentHoursDetailed;
  friday: EstablishmentHoursDetailed;
  saturday: EstablishmentHoursDetailed;
  sunday: EstablishmentHoursDetailed;
}

export interface EstablishmentHoursDetailed {
  opens: string;
  closes: string;
}

export interface IGetEstablishmentRequest {
  tag: string;
}

export interface IGetEstablishmentResponse {
  establishment: IEstablishment;
}

export interface IGetAllGroupedByStatusRequest {
  search?: string;
}

export interface IGetAllGroupedByStatusResponse {
  openEstablishments: IEstablishment[];
  closedEstablishments: IEstablishment[];
}

// This part is just to simulate an API and its logic
async function apiGetAllGroupedByStatus({
  search,
}: IGetAllGroupedByStatusRequest) {
  const openEstablishments = [];
  const closedEstablishments = [];

  const dbEstablishments = Establishments;

  const dayOfWeek: DayOfWeek = format(
    new Date(),
    "eeee",
  ).toLowerCase() as DayOfWeek;

  for (const establishment of dbEstablishments) {
    if (
      search &&
      !establishment.name.toLowerCase().includes(search) &&
      !establishment.category.toLowerCase().includes(search)
    ) {
      continue;
    }

    if (
      !establishment.establishment_hours[dayOfWeek] ||
      !establishment.establishment_hours[dayOfWeek]?.opens ||
      !establishment.establishment_hours[dayOfWeek]?.closes ||
      establishment.establishment_hours[dayOfWeek]?.opens === "closed" ||
      establishment.establishment_hours[dayOfWeek]?.closes === "closed"
    ) {
      closedEstablishments.push(establishment);
      continue;
    }

    const establishmentIsOpen = checkIfEstablishmentIsOpenNow({
      formattedOpeningHours: establishment.establishment_hours[dayOfWeek].opens,
      formattedClosingTime: establishment.establishment_hours[dayOfWeek].closes,
    });

    if (establishmentIsOpen) {
      openEstablishments.push(establishment);
      continue;
    }

    closedEstablishments.push(establishment);
  }

  return {
    openEstablishments,
    closedEstablishments,
  };
}

async function apiGetEstablishment({ tag }: IGetEstablishmentRequest) {
  const dbEstablishments = Establishments;

  const establishment = dbEstablishments.filter(
    (establishment) => establishment.tag === tag,
  );

  return { establishment: establishment[0] };
}

////////////////////////////////////////

async function getAllGroupedByStatus({
  search,
}: IGetAllGroupedByStatusRequest): Promise<IGetAllGroupedByStatusResponse> {
  const data = await apiGetAllGroupedByStatus({ search });

  return data;
}

async function getEstablishment({
  tag,
}: IGetEstablishmentRequest): Promise<IGetEstablishmentResponse> {
  const data = await apiGetEstablishment({ tag });

  return data;
}

export const establishmentService = {
  getAllGroupedByStatus,
  getEstablishment,
};
