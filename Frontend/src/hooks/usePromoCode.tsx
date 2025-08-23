import { createContext, useContext, useState, ReactNode } from 'react';

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

interface PromoContextType {
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => Promise<{ success: boolean; message: string; promo?: PromoCode }>;
  removePromoCode: () => void;
  calculateDiscount: (orderTotal: number) => number;
}

const PromoContext = createContext<PromoContextType | undefined>(undefined);

export function PromoProvider({ children }: { children: ReactNode }) {
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

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
      description: 'Réduction de 20% sur votre commande (max 10 000 FCFA)',
      expiryDate: new Date('2024-06-30')
    },
    {
      code: 'FIXE5000',
      type: 'fixed',
      value: 5000,
      minOrderValue: 30000,
      description: 'Réduction de 5 000 FCFA sur les commandes de 30 000 FCFA et plus'
    },
    {
      code: 'FLASH50',
      type: 'percentage',
      value: 50,
      minOrderValue: 15000,
      maxDiscount: 15000,
      description: 'Promo flash: 50% de réduction (max 15 000 FCFA)',
      expiryDate: new Date('2024-02-01'),
      usageLimit: 100,
      usedCount: 45
    }
  ];

  const applyPromoCode = async (code: string): Promise<{ success: boolean; message: string; promo?: PromoCode }> => {
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

    setAppliedPromo(promo);
    return { 
      success: true, 
      message: `Code promo "${promo.code}" appliqué avec succès!`,
      promo 
    };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const calculateDiscount = (orderTotal: number): number => {
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
  };

  return (
    <PromoContext.Provider 
      value={{
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        calculateDiscount
      }}
    >
      {children}
    </PromoContext.Provider>
  );
}

export function usePromoCode() {
  const context = useContext(PromoContext);
  if (context === undefined) {
    throw new Error('usePromoCode must be used within a PromoProvider');
  }
  return context;
}