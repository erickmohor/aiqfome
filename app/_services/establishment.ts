import { addDays, format, isFuture, isPast, set, sub } from "date-fns";
import Establishments from "@/app/_mockups/establishments.json";
import { DayOfWeek } from "../_helpers/date";

export interface IEstablishment {
  id: string;
  category: string;
  name: string;
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

export interface IEstablishmentRequest {
  search?: string;
}

export interface IEstablishmentResponse {
  openEstablishments: IEstablishment[];
  closedEstablishments: IEstablishment[];
}

// This part is just to simulate an API and its logic
async function apiGetAllGroupedByStatus({ search }: IEstablishmentRequest) {
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

    const formattedOpeningHours =
      establishment.establishment_hours[dayOfWeek].opens;
    const formattedClosingTime =
      establishment.establishment_hours[dayOfWeek].closes;

    const openingHour = Number(formattedOpeningHours.split(":")[0]);
    const openingMinutes = Number(formattedOpeningHours.split(":")[1]);

    const closingHour = Number(formattedClosingTime.split(":")[0]);
    const closingMinutes = Number(formattedClosingTime.split(":")[1]);

    const establishmentOpensAt = set(new Date(), {
      hours: openingHour,
      minutes: openingMinutes,
    });
    let establishmentClosesAt = set(new Date(), {
      hours: closingHour,
      minutes: closingMinutes,
    });

    if (closingHour === 0 && closingMinutes === 0) {
      establishmentClosesAt = addDays(establishmentClosesAt, 1);
    }

    // When it is the same time, that time is neither in the past nor in the future.
    // For this reason, it is necessary to subtract 1 minute
    const opened = isPast(sub(establishmentOpensAt, { minutes: 1 }));
    const isNotClosed = isFuture(sub(establishmentClosesAt, { minutes: 1 }));

    const establishmentIsOpen = opened && isNotClosed;

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

////////////////////////////////////////

async function getAllGroupedByStatus({
  search,
}: IEstablishmentRequest): Promise<IEstablishmentResponse> {
  const data = await apiGetAllGroupedByStatus({ search });

  return data;
}

export const establishment = {
  getAllGroupedByStatus,
};
