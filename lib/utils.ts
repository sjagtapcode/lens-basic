import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeAmp(str?: string | null) {
  return str?.replaceAll('&', '[|]')?.replaceAll('#', '[||]') || ''
}

export function addAmp(str?: string | null) {
  return str?.replaceAll('[|]', '&')?.replaceAll('[||]', '#') || ''
}

export function imageValidator(image?: string | null) {
  return image?.startsWith('ipfs://') ? image?.replace('ipfs://', 'https://ipfs.io/ipfs/') : image || ''
}
