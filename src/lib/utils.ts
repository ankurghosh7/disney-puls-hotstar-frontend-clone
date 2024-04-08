import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function convertMinutesToHoursAndMinutes(minutes: number) {
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;
  return hours + " hours " + remainingMinutes + " minutes";
}
