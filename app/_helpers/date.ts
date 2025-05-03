import { addDays, isFuture, isPast, set, sub } from "date-fns";

export type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

interface CheckIfEstablishmentIsOpenNowProps {
  /**
   * Time format: HH:mm . Example: 08:00
   */
  formattedOpeningHours: string;
  /**
   * Time format: HH:mm . Example: 08:00
   */
  formattedClosingTime: string;
}

export function checkIfEstablishmentIsOpenNow({
  formattedOpeningHours,
  formattedClosingTime,
}: CheckIfEstablishmentIsOpenNowProps) {
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

  return establishmentIsOpen;
}
