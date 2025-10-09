/**
 * Checkout Validation Schemas
 * Zod schemas for validating checkout data
 */

import { z } from 'zod'

// Senegalese phone number validation
const senegalPhoneRegex = /^(77|78|76|70|75)[0-9]{7}$/

/**
 * Customer information schema
 */
export const customerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email requis')
    .email('Email invalide')
    .max(255, 'Email trop long'),
  name: z
    .string()
    .min(3, 'Nom complet requis (minimum 3 caractères)')
    .max(255, 'Nom trop long'),
  phone: z
    .string()
    .min(1, 'Téléphone requis')
    .regex(
      senegalPhoneRegex,
      'Numéro de téléphone sénégalais invalide (ex: 77 123 45 67)'
    ),
  isGuest: z.boolean(),
})

/**
 * Shipping information schema
 */
export const shippingSchema = z.object({
  zone: z.enum(['DAKAR', 'THIES', 'AUTRE']),
  address: z
    .string()
    .min(10, 'Adresse trop courte (minimum 10 caractères)')
    .max(500, 'Adresse trop longue'),
  city: z
    .string()
    .min(2, 'Ville requise (minimum 2 caractères)')
    .max(100, 'Nom de ville trop long'),
  fees: z.number().int().nonnegative(),
})

/**
 * Payment information schema
 */
export const paymentSchema = z.object({
  method: z.enum(['ORANGE_MONEY', 'WAVE', 'CARD', 'CASH_ON_DELIVERY']),
})

/**
 * Cart item schema
 */
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID requis'),
  name: z.string().min(1, 'Nom du produit requis'),
  quantity: z
    .number()
    .int('Quantité doit être un entier')
    .positive('Quantité doit être positive')
    .max(100, 'Quantité maximale: 100'),
  priceCents: z
    .number()
    .int('Prix doit être un entier')
    .nonnegative('Prix ne peut pas être négatif'),
})

/**
 * Complete checkout data schema
 */
export const checkoutSchema = z.object({
  customer: customerSchema,
  shipping: shippingSchema,
  payment: paymentSchema,
  termsAccepted: z.literal(true),
  items: z
    .array(cartItemSchema)
    .min(1, 'Le panier ne peut pas être vide')
    .max(50, 'Maximum 50 articles par commande'),
})

/**
 * Order update schema
 */
export const orderUpdateSchema = z.object({
  orderId: z.string().min(1, 'Order ID requis'),
  status: z.enum(['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
})

/**
 * PayTech session request schema
 */
export const paytechSessionSchema = z.object({
  orderId: z.string().min(1, 'Order ID requis'),
})

/**
 * PayTech webhook payload schema
 */
export const paytechWebhookSchema = z.object({
  type_event: z.enum(['sale_complete', 'sale_canceled', 'sale_refund']),
  custom_field: z.string(),
  ref_command: z.string(),
  item_name: z.string(),
  item_price: z.string(),
  currency: z.string(),
  payment_method: z.string(),
  payment_ref: z.string(),
  api_key_sha256: z.string(),
  api_secret_sha256: z.string(),
})

/**
 * Type exports
 */
export type CustomerInput = z.infer<typeof customerSchema>
export type ShippingInput = z.infer<typeof shippingSchema>
export type PaymentInput = z.infer<typeof paymentSchema>
export type CartItemInput = z.infer<typeof cartItemSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type OrderUpdateInput = z.infer<typeof orderUpdateSchema>
export type PaytechSessionInput = z.infer<typeof paytechSessionSchema>
export type PaytechWebhookInput = z.infer<typeof paytechWebhookSchema>

/**
 * Validate checkout data
 */
export function validateCheckoutData(data: unknown) {
  return checkoutSchema.safeParse(data)
}

/**
 * Validate customer data
 */
export function validateCustomerData(data: unknown) {
  return customerSchema.safeParse(data)
}

/**
 * Validate shipping data
 */
export function validateShippingData(data: unknown) {
  return shippingSchema.safeParse(data)
}

/**
 * Validate payment data
 */
export function validatePaymentData(data: unknown) {
  return paymentSchema.safeParse(data)
}
