import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { PromoProductCard } from './PromoProductCard';
import { PromoProduct } from '@/types/promo';
import { useEffect, useMemo, useState } from 'react';
import { Zap, ArrowRight } from 'lucide-react';

export function FlashSalesSection() {
  const [products, setProducts] = useState<PromoProduct[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/promotions')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && Array.isArray(d?.products)) setProducts(d.products as PromoProduct[]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // Heuristique: considérer "flash" = forte remise (>= 40%) et/ou stock faible
  const flashSaleProducts = useMemo(() => {
    const arr = (products || []).filter((p) => p.discountPercentage >= 40 || (p.stock && p.stock <= 10));
    return arr.slice(0, 8);
  }, [products]);

  if (flashSaleProducts.length === 0) return null;

  const nextFlashSaleEnd = null as Date | null;

  return (
    <section id="flash-sales" className="py-16 bg-gradient-to-r from-urgent/5 via-accent/5 to-primary/5">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Card className="mb-8 border-urgent/20 bg-gradient-to-r from-urgent/10 to-accent/10">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="flash-sale-badge text-base px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                FLASH SALES
              </Badge>
            </div>
            
            <CardTitle className="text-3xl md:text-4xl font-bold font-playfair text-urgent mb-2">
              Offres Flash
            </CardTitle>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Profitez de nos réductions exceptionnelles pour une durée limitée !
            </p>

            {/* Global Countdown */}
            {nextFlashSaleEnd && (
              <div className="max-w-md mx-auto">
                <h4 className="text-urgent font-semibold mb-3 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Prochaine fin dans :
                </h4>
                <CountdownTimer endDate={nextFlashSaleEnd} />
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Flash Sale Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {flashSaleProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="relative">
              {/* Individual Product Countdown */}
              {product.flashSaleEndDate && (
                <div className="absolute -top-2 left-2 right-2 z-10">
                  <div className="bg-urgent text-urgent-foreground text-xs font-bold text-center py-1 px-2 rounded-t-lg">
                    <Zap className="w-3 h-3 inline mr-1" />
                    Se termine bientôt !
                  </div>
                </div>
              )}
              
              <PromoProductCard 
                product={product} 
                className="border-urgent/20 shadow-glow hover:shadow-strong"
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {flashSaleProducts.length > 4 && (
          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-urgent hover:bg-urgent/90 text-urgent-foreground font-semibold px-8"
              onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Voir toutes les offres flash
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Flash Sale Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6 border-urgent/20">
            <CardContent className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-urgent/10 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-urgent" />
              </div>
              <h4 className="font-semibold text-urgent">Durée Limitée</h4>
              <p className="text-sm text-muted-foreground">
                Les offres flash disparaissent rapidement
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-accent/20">
            <CardContent className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-accent">-70%</span>
              </div>
              <h4 className="font-semibold text-accent">Réductions Maximales</h4>
              <p className="text-sm text-muted-foreground">
                Jusqu'à 70% de réduction sur une sélection
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-primary/20">
            <CardContent className="space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-primary">🎁</span>
              </div>
              <h4 className="font-semibold text-primary">Stock Limité</h4>
              <p className="text-sm text-muted-foreground">
                Quantités limitées, ne ratez pas l'occasion
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}