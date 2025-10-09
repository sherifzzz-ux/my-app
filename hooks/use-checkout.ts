/**
 * Checkout State Management Hook
 * Manages the entire checkout flow with 4 steps
 */

'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CheckoutCustomer, CheckoutShipping, CheckoutPayment } from '@/lib/paytech/types'

export type CheckoutStep = 1 | 2 | 3 | 4

interface CheckoutState {
  // Current step
  step: CheckoutStep

  // Customer information
  customer: CheckoutCustomer

  // Shipping information
  shipping: CheckoutShipping

  // Payment information
  payment: CheckoutPayment

  // Terms acceptance
  termsAccepted: boolean

  // Actions
  goToStep: (step: CheckoutStep) => void
  nextStep: () => void
  previousStep: () => void
  updateCustomer: (data: Partial<CheckoutCustomer>) => void
  updateShipping: (data: Partial<CheckoutShipping>) => void
  selectPaymentMethod: (method: CheckoutPayment['method']) => void
  acceptTerms: (value: boolean) => void
  reset: () => void
  
  // Validation
  isStepValid: (step: CheckoutStep) => boolean
}

const initialCustomer: CheckoutCustomer = {
  email: '',
  name: '',
  firstName: '',
  lastName: '',
  phone: '',
  ville: '',
  quartier: '',
  adresseDetaillee: '',
  orderNote: '',
  isGuest: true,
}

const initialShipping: CheckoutShipping = {
  zone: 'DAKAR',
  address: '',
  city: '',
  fees: 200000, // 2000 CFA par défaut (Dakar)
}

const initialPayment: CheckoutPayment = {
  method: 'ORANGE_MONEY',
}

export const useCheckout = create<CheckoutState>()(
  persist(
    (set, get) => ({
      // Initial state
      step: 1,
      customer: initialCustomer,
      shipping: initialShipping,
      payment: initialPayment,
      termsAccepted: false,

      // Navigation actions
      goToStep: (step) => {
        set({ step })
      },

      nextStep: () => {
        const { step } = get()
        if (step < 4) {
          set({ step: (step + 1) as CheckoutStep })
        }
      },

      previousStep: () => {
        const { step } = get()
        if (step > 1) {
          set({ step: (step - 1) as CheckoutStep })
        }
      },

      // Data update actions
      updateCustomer: (data) => {
        set((state) => ({
          customer: { ...state.customer, ...data },
        }))
      },

      updateShipping: (data) => {
        set((state) => ({
          shipping: { ...state.shipping, ...data },
        }))
      },

      selectPaymentMethod: (method) => {
        set((state) => ({
          payment: { ...state.payment, method },
        }))
      },

      acceptTerms: (value) => {
        set({ termsAccepted: value })
      },

      // Reset checkout
      reset: () => {
        set({
          step: 1,
          customer: initialCustomer,
          shipping: initialShipping,
          payment: initialPayment,
          termsAccepted: false,
        })
      },

      // Validation
      isStepValid: (step) => {
        const state = get()

        switch (step) {
          case 1:
            // Cart step - always valid if there are items (checked elsewhere)
            return true

          case 2:
            // Customer info step
            return !!(
              state.customer.email &&
              state.customer.name &&
              state.customer.firstName &&
              state.customer.lastName &&
              state.customer.phone &&
              state.customer.ville &&
              state.customer.quartier &&
              state.customer.adresseDetaillee &&
              state.customer.email.includes('@') &&
              state.customer.name.length >= 3 &&
              state.customer.firstName.length >= 2 &&
              state.customer.lastName.length >= 2 &&
              state.customer.phone.length >= 9 &&
              state.customer.ville.length >= 2 &&
              state.customer.quartier.length >= 2 &&
              state.customer.adresseDetaillee.length >= 5 &&
              state.customer.adresseDetaillee.length <= 60
            )

          case 3:
            // Shipping step
            return !!(
              state.shipping.address &&
              state.shipping.city &&
              state.shipping.zone &&
              state.shipping.address.length >= 10 &&
              state.shipping.city.length >= 2
            )

          case 4:
            // Payment step - requires all previous steps + terms
            return (
              get().isStepValid(2) &&
              get().isStepValid(3) &&
              !!state.payment.method &&
              state.termsAccepted
            )

          default:
            return false
        }
      },
    }),
    {
      name: 'checkout-storage',
      // Only persist certain fields
      partialize: (state) => ({
        customer: state.customer,
        shipping: state.shipping,
        payment: state.payment,
        // Don't persist step, termsAccepted
      }),
    }
  )
)

/**
 * Hook to get checkout summary
 */
export function useCheckoutSummary() {
  const { customer, shipping, payment } = useCheckout()
  
  return {
    customer,
    shipping,
    payment,
  }
}

/**
 * Hook to check if checkout is ready to submit
 */
export function useCheckoutValidation() {
  const { isStepValid, termsAccepted } = useCheckout()
  
  const isValid = isStepValid(4)
  const canSubmit = isValid && termsAccepted
  
  return {
    isValid,
    canSubmit,
  }
}
