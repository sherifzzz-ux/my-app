/**
 * Configuration PayTech
 * Documentation: https://paytech.sn/documentation
 */

export const paytechConfig = {
  // API credentials
  apiKey: process.env.PAYTECH_API_KEY || '',
  apiSecret: process.env.PAYTECH_API_SECRET || '',
  
  // Environment
  env: process.env.PAYTECH_ENV || 'test',
  
  // Base URLs
  baseUrl:
    process.env.PAYTECH_ENV === 'production'
      ? 'https://paytech.sn/api'
      : 'https://paytech.sn/api', // PayTech uses same URL for both
  
  // Callback URLs
  successUrl: process.env.PAYTECH_SUCCESS_URL || 'http://localhost:3000/checkout/success',
  cancelUrl: process.env.PAYTECH_CANCEL_URL || 'http://localhost:3000/checkout',
  ipnUrl: process.env.PAYTECH_IPN_URL || 'http://localhost:3000/api/paytech/webhook',
  
  // Currency
  currency: 'XOF', // Franc CFA
  
  // Shipping zones and fees (in CFA)
  shippingZones: {
    DAKAR: {
      name: 'Dakar',
      delay: 'Livraison en moins de 24h',
      feeCents: 200000, // 2000 CFA
    },
    THIES: {
      name: 'Thiès',
      delay: 'Livraison en 24-48h',
      feeCents: 300000, // 3000 CFA
    },
    AUTRE: {
      name: 'Autres régions',
      delay: 'Livraison en 48-72h',
      feeCents: 500000, // 5000 CFA
    },
  },
} as const

export type ShippingZone = keyof typeof paytechConfig.shippingZones

/**
 * Get shipping fees for a zone
 */
export function getShippingFees(zone: ShippingZone): number {
  return paytechConfig.shippingZones[zone].feeCents
}

/**
 * Get delivery delay for a zone
 */
export function getDeliveryDelay(zone: ShippingZone): string {
  return paytechConfig.shippingZones[zone].delay
}

/**
 * Validate PayTech configuration
 */
export function validatePaytechConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!paytechConfig.apiKey) {
    errors.push('PAYTECH_API_KEY is not set')
  }

  if (!paytechConfig.apiSecret) {
    errors.push('PAYTECH_API_SECRET is not set')
  }

  if (!paytechConfig.successUrl) {
    errors.push('PAYTECH_SUCCESS_URL is not set')
  }

  if (!paytechConfig.cancelUrl) {
    errors.push('PAYTECH_CANCEL_URL is not set')
  }

  if (!paytechConfig.ipnUrl) {
    errors.push('PAYTECH_IPN_URL is not set')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}
