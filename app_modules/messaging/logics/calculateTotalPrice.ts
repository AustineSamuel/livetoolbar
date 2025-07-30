/**
 * Calculate the total cost of a rent given start and end times, a price per time unit, and the time unit.
 * @param startTime The start time of the rent period, in ISO string format.
 * @param endTime The end time of the rent period, in ISO string format.
 * @param price The price per time unit. For example, if priceUnit is "hour", this is the price per hour.
 * @param priceUnit The time unit of the price. Can be "hour", "day", "week", or "month".
 * @returns The total cost of the rent period, rounded up to the nearest whole number.
 */
export function calculateTotalCost(
  startTime: string,
  endTime: string,
  price: number,
  priceUnit: "hour" | "day" | "week" | "month"
): number {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationMs = end.getTime() - start.getTime();

  if (durationMs <= 0) return 0;

  const MS_IN_HOUR = 1000 * 60 * 60;
  const MS_IN_DAY = MS_IN_HOUR * 24;
  const MS_IN_WEEK = MS_IN_DAY * 7;
  const MS_IN_MONTH = MS_IN_DAY * 30; // Approximate month as 30 days

  let unitCount: number;

  switch (priceUnit) {
    case "hour":
      unitCount = durationMs / MS_IN_HOUR;
      break;
    case "day":
      unitCount = durationMs / MS_IN_DAY;
      break;
    case "week":
      unitCount = durationMs / MS_IN_WEEK;
      break;
    case "month":
      unitCount = durationMs / MS_IN_MONTH;
      break;
    default:
      unitCount = 0;
  }

  return Math.ceil(unitCount) * price;
}
