import { Button } from '@/components/ui/button';
import { CountdownTimer } from './CountdownTimer';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Gift, Tag } from 'lucide-react';

export function PromoHeroBanner() {
  // Promotion ends in 7 days
  const promotionEndDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] repeat" />
      </div>

      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center space-y-8">
          {/* Flash Sale Badge */}
          <div className="inline-flex items-center gap-2">
            <Badge className="flash-sale-badge">
              <Sparkles className="w-3 h-3 mr-1" />
              FLASH SALE
            </Badge>
            <Badge className="promo-badge">
              <Gift className="w-3 h-3 mr-1" />
              -70%
            </Badge>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-playfair">
              Promotions
              <span className="block text-gold animate-float">Exceptionnelles</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light">
              Découvrez nos offres exclusives sur les plus grandes marques de cosmétiques
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="max-w-md mx-auto">
            <h3 className="text-white text-lg font-medium mb-4 flex items-center justify-center gap-2">
              <Tag className="w-5 h-5" />
              Offre limitée - Dépêchez-vous !
            </h3>
            <CountdownTimer endDate={promotionEndDate} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3 text-lg"
              onClick={() => document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Voir les Offres
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 text-lg"
              onClick={() => document.getElementById('flash-sales')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Flash Sales
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto pt-8">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">150+</div>
              <div className="text-white/80 text-sm">Produits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">-70%</div>
              <div className="text-white/80 text-sm">Max Réduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">24h</div>
              <div className="text-white/80 text-sm">Livraison</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">Gratuit</div>
              <div className="text-white/80 text-sm">Retour</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          className="w-full h-16 text-background" 
          fill="currentColor" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}