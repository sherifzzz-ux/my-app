import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePromoCode } from "@/hooks/usePromoCode";
import { Ticket, X, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromoCodeSectionProps {
  orderTotal: number;
  className?: string;
}

export function PromoCodeSection({ orderTotal, className = "" }: PromoCodeSectionProps) {
  const [promoInput, setPromoInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { appliedPromo, applyPromoCode, removePromoCode, calculateDiscount } = usePromoCode();
  const { toast } = useToast();

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;

    setIsLoading(true);
    try {
      const result = await applyPromoCode(promoInput.trim());
      
      if (result.success) {
        toast({
          title: "Code promo appliqué",
          description: result.message,
        });
        setPromoInput("");
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'application du code promo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePromo = () => {
    removePromoCode();
    toast({
      title: "Code promo retiré",
      description: "Le code promo a été retiré de votre commande",
    });
  };

  const discount = calculateDiscount(orderTotal);
  const finalTotal = orderTotal - discount;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('XOF', 'FCFA');
  };

  const checkMinOrderRequirement = () => {
    if (appliedPromo?.minOrderValue && orderTotal < appliedPromo.minOrderValue) {
      return {
        met: false,
        message: `Commande minimum de ${formatPrice(appliedPromo.minOrderValue)} requise pour ce code promo`
      };
    }
    return { met: true, message: "" };
  };

  const minOrderCheck = checkMinOrderRequirement();

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ticket className="h-5 w-5" />
          Code Promo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!appliedPromo ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Entrez votre code promo"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
              />
              <Button 
                onClick={handleApplyPromo}
                disabled={isLoading || !promoInput.trim()}
              >
                {isLoading ? "..." : "Appliquer"}
              </Button>
            </div>
            
            {/* Available Promo Codes Hint */}
            <div className="text-sm text-muted-foreground">
              <p className="font-medium mb-2">Codes disponibles :</p>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">WELCOME10</Badge>
                <Badge variant="outline" className="text-xs">BEAUTY20</Badge>
                <Badge variant="outline" className="text-xs">FIXE5000</Badge>
                <Badge variant="outline" className="text-xs">FLASH50</Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">{appliedPromo.code}</p>
                  <p className="text-sm text-green-600">{appliedPromo.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemovePromo}
                className="text-green-600 hover:text-green-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Order Total Breakdown */}
            <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Sous-total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
              
              {discount > 0 ? (
                <>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Réduction ({appliedPromo.code})</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg border-t pt-2">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </>
              ) : (
                !minOrderCheck.met && (
                  <div className="flex items-start gap-2 text-amber-600 text-sm">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{minOrderCheck.message}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}