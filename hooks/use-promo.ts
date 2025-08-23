"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderValue?: number;
  maxDiscount?: number;
  expiryDate?: Date;
  usageLimit?: number;
  usedCount?: number;
  description: string;
}

interface PromoState {
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => Promise<{ success: boolean; message: string; promo?: PromoCode }>;
  removePromoCode: () => void;
  calculateDiscount: (orderTotal: number) => number;
}

// Mock promo codes (in real app, these would come from backend)
const availablePromoCodes: PromoCode[] = [
  {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderValue: 10000,
    description: 'Réduction de 10% pour les nouveaux clients',
    expiryDate: new Date('2024-12-31')
  },
  {
    code: 'BEAUTY20',
    type: 'percentage',
    value: 20,
    minOrderValue: 25000,
    maxDiscount: 10000,
    description: 'Réduction de 20% sur votre commande (max 10 000 CFA)',
    expiryDate: new Date('2024-06-30')
  },
  {
    code: 'FIXE5000',
    type: 'fixed',
    value: 5000,
    minOrderValue: 30000,
    description: 'Réduction de 5 000 CFA sur les commandes de 30 000 CFA et plus'
  },
  {
    code: 'FLASH50',
    type: 'percentage',
    value: 50,
    minOrderValue: 15000,
    maxDiscount: 15000,
    description: 'Promo flash: 50% de réduction (max 15 000 CFA)',
    expiryDate: new Date('2025-12-31'),
    usageLimit: 100,
    usedCount: 45
  }
];

export const usePromoCode = create<PromoState>()(
  persist(
    (set, get) => ({
      appliedPromo: null,
      
      applyPromoCode: async (code: string): Promise<{ success: boolean; message: string; promo?: PromoCode }> => {
        const upperCode = code.toUpperCase();
        const promo = availablePromoCodes.find(p => p.code === upperCode);

        if (!promo) {
          return { success: false, message: 'Code promo invalide' };
        }

        // Check expiry date
        if (promo.expiryDate && new Date() > promo.expiryDate) {
          return { success: false, message: 'Ce code promo a expiré' };
        }

        // Check usage limit
        if (promo.usageLimit && promo.usedCount && promo.usedCount >= promo.usageLimit) {
          return { success: false, message: 'Ce code promo a atteint sa limite d\'utilisation' };
        }

        set({ appliedPromo: promo });
        return { 
          success: true, 
          message: `Code promo "${promo.code}" appliqué avec succès!`,
          promo 
        };
      },

      removePromoCode: () => {
        set({ appliedPromo: null });
      },

      calculateDiscount: (orderTotal: number): number => {
        const { appliedPromo } = get();
        if (!appliedPromo) return 0;

        // Check minimum order value
        if (appliedPromo.minOrderValue && orderTotal < appliedPromo.minOrderValue) {
          return 0;
        }

        let discount = 0;
        if (appliedPromo.type === 'percentage') {
          discount = (orderTotal * appliedPromo.value) / 100;
          // Apply max discount limit if specified
          if (appliedPromo.maxDiscount && discount > appliedPromo.maxDiscount) {
            discount = appliedPromo.maxDiscount;
          }
        } else if (appliedPromo.type === 'fixed') {
          discount = appliedPromo.value;
        }

        return Math.min(discount, orderTotal);
      },
    }),
    { name: "mami-shop-promo" }
  )
);
