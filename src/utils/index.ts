import axios from "axios";

export const customFetch = axios.create({
  baseURL: "https://sandbox.creos.me/api/v1/",
});

// fromat week work
export function getWorkWeekNumber(date: Date): number {
  const referenceDate = new Date(date.getFullYear(), 0, 1);
  const daysOffset = Math.floor(
    (date.getTime() - referenceDate.getTime() + 11 * 60 * 60 * 1000) /
      (1000 * 60 * 60 * 24)
  );
  const weekNumber = Math.ceil((daysOffset + referenceDate.getDay() + 1) / 7);
  return weekNumber;
}

//
