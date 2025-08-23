/**
 * Format price in CFA francs
 */
export function formatCFA(cents: number): string {
  const amount = cents / 100;
  return new Intl.NumberFormat('fr-SN', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculate discount percentage between two prices
 */
export function calculateDiscountPercentage(originalCents: number, currentCents: number): number {
  if (originalCents <= 0) return 0;
  const discount = ((originalCents - currentCents) / originalCents) * 100;
  return Math.round(discount);
}

/**
 * Calculate savings amount
 */
export function calculateSavings(originalCents: number, currentCents: number): number {
  return Math.max(0, originalCents - currentCents);
}

/**
 * Format discount percentage for display
 */
export function formatDiscountPercentage(percentage: number): string {
  return `-${percentage}%`;
}

/**
 * Get discount color class based on percentage
 */
export function getDiscountColorClass(percentage: number): string {
  if (percentage >= 50) return 'bg-gradient-urgent';
  if (percentage >= 30) return 'bg-gradient-gold';
  return 'bg-gradient-primary';
}