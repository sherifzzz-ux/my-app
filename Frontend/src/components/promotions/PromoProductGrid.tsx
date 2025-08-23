import { PromoProductCard } from './PromoProductCard';
import { PromoProduct } from '@/types/promo';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import './PromoProductGrid.css';

interface PromoProductGridProps {
  products: PromoProduct[];
  className?: string;
}

const STAGGER_CLASSES = [
  'stagger-0',
  'stagger-1',
  'stagger-2',
  'stagger-3',
  'stagger-4',
  'stagger-5',
  'stagger-6',
  'stagger-7',
];

export function PromoProductGrid({ products, className = '' }: PromoProductGridProps) {
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoading, setIsLoading] = useState(false);

  const displayedProducts = products.slice(0, displayCount);
  const hasMoreProducts = products.length > displayCount;

  const loadMore = async () => {
    setIsLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayCount(prev => prev + 8);
    setIsLoading(false);
  };

  if (products.length === 0) {
    return (
      <Card className="py-16">
        <CardContent className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-muted-foreground">
            Aucun produit trouvé
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Aucun produit ne correspond à vos critères de recherche. 
            Essayez de modifier vos filtres ou explorez d'autres catégories.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Réinitialiser les filtres
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">{products.length}</span> produit{products.length > 1 ? 's' : ''} en promotion
        </p>
        
        {displayedProducts.length < products.length && (
          <p className="text-sm text-muted-foreground">
            Affichage de {displayedProducts.length} sur {products.length} produits
          </p>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedProducts.map((product, index) => (
          <div
            key={product.id}
            className={`animate-fade-in ${STAGGER_CLASSES[index % 8]}`}
          >
            <PromoProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreProducts && (
        <div className="text-center pt-8">
          <Button
            size="lg"
            variant="outline"
            onClick={loadMore}
            disabled={isLoading}
            className="px-8"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Chargement...
              </>
            ) : (
              <>
                Voir plus de produits
                <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                  +{Math.min(8, products.length - displayCount)}
                </span>
              </>
            )}
          </Button>
        </div>
      )}

      {/* Grid Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {Math.round(products.reduce((acc, p) => acc + p.discountPercentage, 0) / products.length)}%
          </div>
          <div className="text-xs text-muted-foreground">Réduction moyenne</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {Math.round(products.reduce((acc, p) => acc + p.savings, 0) / products.length / 100).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Économie moyenne (CFA)</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {products.filter(p => p.discountPercentage >= 50).length}
          </div>
          <div className="text-xs text-muted-foreground">Réductions 50%+</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-urgent">
            {products.filter(p => p.stock && p.stock <= 10).length}
          </div>
          <div className="text-xs text-muted-foreground">Stock limité</div>
        </div>
      </div>
    </div>
  );
}