import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CurrencyCode } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatPrice(amount: number, currency: CurrencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount)
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str
}

export function isLowStock(quantity: number, threshold: number): boolean {
  return quantity > 0 && quantity <= threshold
}

export function isOutOfStock(quantity: number): boolean {
  return quantity === 0
}

export function getDiscountPercentage(price: number, compareAtPrice: number): number {
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
}