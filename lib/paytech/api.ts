/**
 * PayTech API Wrapper
 * Handles communication with PayTech Senegal payment gateway
 */

import crypto from 'crypto'
import { paytechConfig } from './config'
import type {
  PaytechSessionRequest,
  PaytechSessionResponse,
  PaytechIPNPayload,
  PaytechVerifyResponse,
  PaytechErrorResponse,
} from './types'

/**
 * Create a PayTech payment session
 * @param data Session creation data
 * @returns Session response with redirect URL
 */
export async function createPaytechSession(
  data: PaytechSessionRequest
): Promise<PaytechSessionResponse> {
  try {
    const response = await fetch(`${paytechConfig.baseUrl}/payment/request-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'API-KEY': paytechConfig.apiKey,
        'API-SECRET': paytechConfig.apiSecret,
      },
      body: JSON.stringify({
        ...data,
        env: paytechConfig.env,
        ipn_url: data.ipn_url || paytechConfig.ipnUrl,
        success_url: data.success_url || paytechConfig.successUrl,
        cancel_url: data.cancel_url || paytechConfig.cancelUrl,
      }),
    })

    if (!response.ok) {
      const error: PaytechErrorResponse = await response.json()
      throw new Error(error.message || 'Failed to create PayTech session')
    }

    const result = await response.json()

    // PayTech returns success:1 or success:0
    if (!result.success || result.success === 0) {
      throw new Error(result.message || 'PayTech session creation failed')
    }

    return {
      success: true,
      token: result.token,
      redirect_url: result.redirect_url || `${paytechConfig.baseUrl}/payment/${result.token}`,
      ref_command: data.ref_command,
    }
  } catch (error) {
    console.error('PayTech session creation error:', error)
    throw error
  }
}

/**
 * Verify PayTech payment signature
 * Used in webhook to ensure request authenticity
 */
export function verifyPaytechSignature(payload: PaytechIPNPayload): boolean {
  try {
    // Create SHA256 hash of API key
    const apiKeyHash = crypto
      .createHash('sha256')
      .update(paytechConfig.apiKey)
      .digest('hex')

    // Create SHA256 hash of API secret
    const apiSecretHash = crypto
      .createHash('sha256')
      .update(paytechConfig.apiSecret)
      .digest('hex')

    // Verify both signatures
    const apiKeyValid = payload.api_key_sha256 === apiKeyHash
    const apiSecretValid = payload.api_secret_sha256 === apiSecretHash

    return apiKeyValid && apiSecretValid
  } catch (error) {
    console.error('Signature verification error:', error)
    return false
  }
}

/**
 * Verify payment status with PayTech
 * @param token PayTech session token
 * @returns Payment verification result
 */
export async function verifyPaytechPayment(
  token: string
): Promise<PaytechVerifyResponse> {
  try {
    const response = await fetch(
      `${paytechConfig.baseUrl}/payment/check-payment?token=${token}`,
      {
        method: 'GET',
        headers: {
          'API-KEY': paytechConfig.apiKey,
          'API-SECRET': paytechConfig.apiSecret,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to verify payment')
    }

    const result = await response.json()

    return {
      success: result.success === 1,
      status: mapPaytechStatus(result.status),
      ref_command: result.ref_command,
      transaction_id: result.transaction_id,
      payment_method: result.payment_method,
      amount: result.amount,
    }
  } catch (error) {
    console.error('Payment verification error:', error)
    return {
      success: false,
      status: 'failed',
      ref_command: '',
    }
  }
}

/**
 * Map PayTech status to our internal status
 */
function mapPaytechStatus(
  status: string
): 'success' | 'pending' | 'failed' | 'cancelled' {
  switch (status) {
    case '1':
    case 'success':
    case 'completed':
      return 'success'
    case '0':
    case 'pending':
      return 'pending'
    case '-1':
    case 'cancelled':
      return 'cancelled'
    case '-2':
    case 'failed':
    default:
      return 'failed'
  }
}

/**
 * Handle PayTech IPN webhook
 * Processes payment notifications from PayTech
 */
export async function handlePaytechWebhook(
  payload: PaytechIPNPayload
): Promise<{
  success: boolean
  orderId?: string
  status?: 'success' | 'cancelled' | 'refunded'
  error?: string
}> {
  try {
    // 1. Verify signature
    const isValid = verifyPaytechSignature(payload)
    if (!isValid) {
      return {
        success: false,
        error: 'Invalid signature',
      }
    }

    // 2. Extract order ID from custom field
    const orderId = payload.custom_field

    // 3. Map event type to status
    let status: 'success' | 'cancelled' | 'refunded'
    switch (payload.type_event) {
      case 'sale_complete':
        status = 'success'
        break
      case 'sale_canceled':
        status = 'cancelled'
        break
      case 'sale_refund':
        status = 'refunded'
        break
      default:
        return {
          success: false,
          error: 'Unknown event type',
        }
    }

    return {
      success: true,
      orderId,
      status,
    }
  } catch (error) {
    console.error('Webhook handling error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Format amount for PayTech (in centimes)
 */
export function formatPaytechAmount(amountCents: number): number {
  // PayTech expects amount in the smallest currency unit (centimes for XOF)
  return amountCents
}

/**
 * Get payment method label
 */
export function getPaymentMethodLabel(method: string): string {
  const labels: Record<string, string> = {
    ORANGE_MONEY: 'Orange Money',
    orange_money: 'Orange Money',
    WAVE: 'Wave',
    wave: 'Wave',
    CARD: 'Carte Bancaire',
    card: 'Carte Bancaire',
    free_money: 'Free Money',
  }
  return labels[method] || method
}
