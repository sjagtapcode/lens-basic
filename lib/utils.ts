import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeAmp(str?: string | null) {
  return str?.replace('&', '[|]') || ''
}

export function addAmp(str?: string | null) {
  return str?.replace('[|]', '&') || ''
}
