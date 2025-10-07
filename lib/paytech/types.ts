/**
 * PayTech API Types
 * Based on PayTech Senegal API documentation
 */

export type PaymentMethod = 'ORANGE_MONEY' | 'WAVE' | 'CARD'

export type PaymentStatus =
  | 'PENDING' // En attente
  | 'PROCESSING' // En cours de traitement
  | 'PAID' // Payé
  | 'FAILED' // Échoué
  | 'CANCELLED' // Annulé
  | 'REFUNDED' // Remboursé

export type OrderStatus =
  | 'PENDING' // En attente de paiement
  | 'CONFIRMED' // Confirmée (payée)
  | 'PROCESSING' // En préparation
  | 'SHIPPED' // Expédiée
  | 'DELIVERED' // Livrée
  | 'CANCELLED' // Annulée

/**
 * PayTech Session Creation Request
 */
export interface PaytechSessionRequest {
  // Required fields
  item_name: string // Nom de l'article
  item_price: number // Prix en centimes (XOF)
  currency: string // XOF
  ref_command: string // Référence de commande unique
  command_name: string // Nom de la commande
  
  // Optional fields
  env: 'test' | 'production'
  ipn_url?: string // URL de notification IPN
  success_url?: string // URL de redirection succès
  cancel_url?: string // URL de redirection annulation
  custom_field?: string // Champ personnalisé (ex: orderId)
}

/**
 * PayTech Session Creation Response
 */
export interface PaytechSessionResponse {
  success: boolean
  token: string // Token de session PayTech
  redirect_url: string // URL de redirection vers PayTech
  ref_command: string // Référence de commande
}

/**
 * PayTech IPN (Instant Payment Notification) Payload
 * Reçu via webhook après paiement
 */
export interface PaytechIPNPayload {
  type_event: 'sale_complete' | 'sale_canceled' | 'sale_refund'
  custom_field: string // Notre orderId
  ref_command: string // Référence commande
  item_name: string
  item_price: string // Prix en centimes
  currency: string
  payment_method: string // orange_money, wave, card
  payment_ref: string // Référence paiement PayTech
  api_key_sha256: string // Signature SHA256
  api_secret_sha256: string // Signature SHA256
}

/**
 * PayTech Payment Verification Response
 */
export interface PaytechVerifyResponse {
  success: boolean
  status: 'success' | 'pending' | 'failed' | 'cancelled'
  ref_command: string
  transaction_id?: string
  payment_method?: string
  amount?: number
}

/**
 * Checkout Customer Information
 */
export interface CheckoutCustomer {
  email: string
  name: string
  phone: string
  isGuest: boolean
}

/**
 * Checkout Shipping Information
 */
export interface CheckoutShipping {
  zone: 'DAKAR' | 'THIES' | 'AUTRE'
  address: string
  city: string
  fees: number
}

/**
 * Checkout Payment Information
 */
export interface CheckoutPayment {
  method: PaymentMethod
}

/**
 * Complete Checkout Data
 */
export interface CheckoutData {
  customer: CheckoutCustomer
  shipping: CheckoutShipping
  payment: CheckoutPayment
  termsAccepted: boolean
  items: {
    productId: string
    name: string
    quantity: number
    priceCents: number
  }[]
}

/**
 * Order Creation Result
 */
export interface OrderCreationResult {
  success: boolean
  orderId?: string
  orderNumber?: string
  error?: string
}

/**
 * PayTech Error Response
 */
export interface PaytechErrorResponse {
  success: false
  error: string
  message: string
}
