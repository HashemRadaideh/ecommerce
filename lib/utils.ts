import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const api =
  process.env.NEXT_PUBLIC_API_DOMAIN || "http://localhost:8080/api/v1";
