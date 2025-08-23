import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PromoProductCard } from './PromoProductCard';
import { CountdownTimer } from './CountdownTimer';
import { useEffect, useMemo, useState } from 'react';
import { PromoProduct } from '@/types/promo';
import { Clock, Zap, AlertTriangle, ArrowRight } from 'lucide-react';

export function LastChanceSection() {
  const [products, setProducts] = useState<PromoProduct[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetch('/api/promotions')
      .then((r) => r.json())
      .then((d) => { if (!cancelled && Array.isArray(d?.products)) setProducts(d.products as PromoProduct[]); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const urgentProducts = useMemo(() => {
    const base = products.filter((p) => (p.stock && p.stock <= 10) || p.discountPercentage >= 50);
    return Array.from(new Map(base.map((p) => [p.id, p])).values()).slice(0, 4);
  }, [products]);

  if (urgentProducts.length === 0) {
    return null;
  }

  // Create a fake "last chance" deadline (2 hours from now)
  const lastChanceDeadline = new Date(Date.now() + 2 * 60 * 60 * 1000);

  return (
    <section className="py-16 bg-gradient-to-br from-urgent/5 via-background to-urgent/10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Card className="mb-12 border-urgent/20 bg-gradient-to-r from-urgent/10 to-background">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className="promo-badge text-base px-4 py-2">
                <AlertTriangle className="w-4 h-4 mr-2" />
                DERNIÈRES HEURES
              </Badge>
            </div>
            
            <CardTitle className="text-3xl md:text-4xl font-bold font-playfair text-urgent mb-4">
              Dernière Chance !
            </CardTitle>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Ces offres exceptionnelles disparaissent bientôt. Ne les laissez pas passer !
            </p>

            {/* Urgency Countdown */}
            <div className="max-w-md mx-auto">
              <h4 className="text-urgent font-semibold mb-3 flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Fin des promotions dans :
              </h4>
              <CountdownTimer endDate={lastChanceDeadline} />
            </div>
          </CardHeader>
        </Card>

        {/* Urgent Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {urgentProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {/* Urgency Overlay */}
              <div className="absolute -top-2 left-2 right-2 z-10">
                <div className="bg-urgent text-urgent-foreground text-xs font-bold text-center py-1 px-2 rounded-t-lg flex items-center justify-center gap-1">
                  {product.stock && product.stock <= 10 ? (
                    <>
                      <AlertTriangle className="w-3 h-3" />
                      Plus que {product.stock} !
                    </>
                  ) : (
                    <>
                      <Zap className="w-3 h-3" />
                      Offre limitée !
                    </>
                  )}
                </div>
              </div>
              
              <PromoProductCard 
                product={product} 
                className="border-urgent/30 shadow-glow hover:shadow-strong animate-pulse-glow"
              />
            </div>
          ))}
        </div>

        {/* Urgency Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6 border-urgent/20 bg-urgent/5">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-urgent/10 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-urgent" />
              </div>
              <h4 className="text-xl font-semibold text-urgent font-playfair">Temps Limité</h4>
              <p className="text-sm text-muted-foreground">
                Ces offres exceptionnelles ne seront plus disponibles après le délai imparti.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-accent/20 bg-accent/5">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-accent" />
              </div>
              <h4 className="text-xl font-semibold text-accent font-playfair">Stock Très Limité</h4>
              <p className="text-sm text-muted-foreground">
                Quantités limitées disponibles. Une fois épuisés, ils ne reviendront pas.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-primary/20 bg-primary/5">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-primary font-playfair">Réductions Maximales</h4>
              <p className="text-sm text-muted-foreground">
                Les plus grandes réductions de l'année sur ces produits sélectionnés.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Final Call to Action */}
        <Card className="bg-gradient-urgent text-white text-center p-8">
          <CardContent className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold font-playfair">
              Ne Ratez Pas Cette Opportunité !
            </h3>
            
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Ces prix exceptionnels ne reviendront pas de sitôt. 
              Profitez-en maintenant avant qu'il ne soit trop tard !
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-urgent hover:bg-white/90 font-semibold px-8 py-3 text-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Voir Toutes les Promotions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-urgent font-semibold px-8 py-3 text-lg"
                onClick={() => document.getElementById('flash-sales')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Flash Sales
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>✓</span>
                <span>Livraison 24h</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>✓</span>
                <span>Retour gratuit</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>✓</span>
                <span>Produits authentiques</span>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <span>✓</span>
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}