import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCFA(amountInCents: number): string {
  // XOF (CFA) n'a pas de décimales; on formate en devise locale
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amountInCents / 100);
  } catch {
    const value = Math.round(amountInCents / 100);
    return `${value.toLocaleString("fr-FR")} CFA`;
  }
}
