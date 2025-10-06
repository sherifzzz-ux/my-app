/**
 * Intégration PayTech pour les paiements mobiles au Sénégal
 * Documentation: https://docs.intech.sn/doc_paytech.php#payementweb
 */

import crypto from 'crypto'

export interface PayTechConfig {
  apiKey: string
  secretKey: string
  env: 'test' | 'prod'
}

export interface PayTechPaymentRequest {
  // Informations du client
  item_name: string
  item_price: number // Montant en FCFA (entier)
  currency: 'XOF' | 'XAF'
  ref_command: string // Référence unique de la commande
  
  // URLs de callback
  success_url: string
  cancel_url: string
  ipn_url: string // URL de notification instantanée
  
  // Informations optionnelles
  custom_field?: Record<string, string | number>
  
  // Méthodes de paiement acceptées
  payment_method?: 'wave' | 'orange_money' | 'free_money' | 'e_money' | 'bank_card' | 'all'
}

export interface PayTechPaymentResponse {
  success: boolean
  token?: string
  redirect_url?: string
  error?: string
}

export interface PayTechIPNData {
  type_event: string
  ref_command: string
  item_name: string
  item_price: string
  devise: string
  payment_method: string
  payment_ref: string
  custom_field?: string
}

export class PayTechClient {
  private config: PayTechConfig
  private baseUrl: string

  constructor(config: PayTechConfig) {
    this.config = config
    this.baseUrl = config.env === 'prod' 
      ? 'https://paytech.sn/api/payment/request-payment'
      : 'https://paytech.sn/api/payment/request-payment' // Même URL pour test
  }

  /**
   * Crée une session de paiement PayTech
   */
  async createPayment(data: PayTechPaymentRequest): Promise<PayTechPaymentResponse> {
    try {
      const payload = {
        item_name: data.item_name,
        item_price: data.item_price,
        currency: data.currency,
        ref_command: data.ref_command,
        command_name: data.item_name,
        env: this.config.env,
        success_url: data.success_url,
        cancel_url: data.cancel_url,
        ipn_url: data.ipn_url,
        custom_field: data.custom_field ? JSON.stringify(data.custom_field) : undefined,
      }

      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API_KEY': this.config.apiKey,
          'API_SECRET': this.config.secretKey,
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.message || 'Erreur lors de la création du paiement',
        }
      }

      // PayTech retourne un token qui permet de générer l'URL de paiement
      if (result.success === 1 && result.token) {
        const redirectUrl = `https://paytech.sn/payment/checkout/${result.token}`
        
        return {
          success: true,
          token: result.token,
          redirect_url: redirectUrl,
        }
      }

      return {
        success: false,
        error: 'Réponse invalide de PayTech',
      }
    } catch (error) {
      console.error('PayTech API Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      }
    }
  }

  /**
   * Vérifie la signature IPN pour sécuriser les notifications
   */
  verifyIPNSignature(data: PayTechIPNData, signature: string): boolean {
    try {
      // Créer la chaîne à signer selon la documentation PayTech
      const signString = `${data.type_event}${data.ref_command}${data.item_price}${data.payment_ref}${this.config.secretKey}`
      
      // Générer le hash SHA256
      const expectedSignature = crypto
        .createHash('sha256')
        .update(signString)
        .digest('hex')

      return signature === expectedSignature
    } catch (error) {
      console.error('Erreur de vérification de signature:', error)
      return false
    }
  }

  /**
   * Vérifie le statut d'un paiement
   */
  async checkPaymentStatus(refCommand: string): Promise<{
    success: boolean
    status?: 'pending' | 'success' | 'failed' | 'cancelled'
    data?: any
    error?: string
  }> {
    try {
      const response = await fetch(
        `https://paytech.sn/api/payment/check/${refCommand}`,
        {
          method: 'GET',
          headers: {
            'API_KEY': this.config.apiKey,
            'API_SECRET': this.config.secretKey,
          },
        }
      )

      const result = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: result.message || 'Erreur lors de la vérification',
        }
      }

      // Mapper le statut PayTech vers notre format
      let status: 'pending' | 'success' | 'failed' | 'cancelled' = 'pending'
      
      if (result.status === 1) {
        status = 'success'
      } else if (result.status === -1) {
        status = 'failed'
      } else if (result.status === -2) {
        status = 'cancelled'
      }

      return {
        success: true,
        status,
        data: result,
      }
    } catch (error) {
      console.error('PayTech Check Status Error:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      }
    }
  }
}

/**
 * Instance globale du client PayTech
 */
export function getPayTechClient(): PayTechClient {
  const apiKey = process.env.PAYTECH_API_KEY
  const secretKey = process.env.PAYTECH_SECRET_KEY
  const env = (process.env.PAYTECH_ENV || 'test') as 'test' | 'prod'

  if (!apiKey || !secretKey) {
    throw new Error('PAYTECH_API_KEY et PAYTECH_SECRET_KEY doivent être définis')
  }

  return new PayTechClient({
    apiKey,
    secretKey,
    env,
  })
}

/**
 * Génère une référence de commande unique
 */
export function generatePaymentReference(orderId?: string): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 10)
  return orderId ? `CMD-${orderId}-${timestamp}` : `CMD-${timestamp}-${random}`
}
