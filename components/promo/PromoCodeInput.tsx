"use client";

import { useState } from 'react';
import { Percent, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { usePromoCode } from '@/hooks/use-promo';
import { toast } from '@/hooks/use-toast';
import { formatCFA } from '@/lib/utils';

interface PromoCodeInputProps {
  orderTotal: number;
  onDiscountChange?: (discount: number) => void;
}

export function PromoCodeInput({ orderTotal, onDiscountChange }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { appliedPromo, applyPromoCode, removePromoCode, calculateDiscount } = usePromoCode();

  const discount = calculateDiscount(orderTotal);

  const handleApply = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    try {
      const result = await applyPromoCode(code.trim());
      
      if (result.success) {
        setCode('');
        toast({
          title: "Code promo appliqué",
          description: result.message,
        });
        onDiscountChange?.(calculateDiscount(orderTotal));
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    removePromoCode();
    toast({
      title: "Code promo retiré",
      description: "Le code promo a été retiré de votre commande",
    });
    onDiscountChange?.(0);
  };

  if (appliedPromo) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-green-600" />
              <div>
                <p className="font-medium text-green-800">
                  Code {appliedPromo.code} appliqué
                </p>
                <p className="text-sm text-green-600">
                  {appliedPromo.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-800">
                -{formatCFA(discount)}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="w-6 h-6 text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Code promo
          </h3>
          
          <div className="flex gap-2">
            <Input
              placeholder="Entrez votre code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleApply()}
            />
            <Button 
              onClick={handleApply} 
              disabled={!code.trim() || isLoading}
              size="sm"
            >
              {isLoading ? 'Application...' : 'Appliquer'}
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Codes disponibles pour test :</p>
            <p>WELCOME10, BEAUTY20, FIXE5000, FLASH50</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
