import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { formatCFA } from '@/lib/utils/price-utils';
import { PromoProduct } from '@/types/promo';
import { useState } from 'react';

interface PromoProductCardProps {
  product: PromoProduct;
  className?: string;
}

export function PromoProductCard({ product, className = '' }: PromoProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart logic would go here
    console.log('Adding to cart:', product.name);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const fallbackImage = `https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&w=300&h=300&fit=crop`;

  return (
    <Card className={`promo-card group cursor-pointer ${className}`}>
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-t-2xl">
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 z-10">
            <div className="discount-badge">
              -{product.discountPercentage}%
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label={isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            title="Favoris"
            type="button"
          >
            <span className="sr-only">{isWishlisted ? 'Retirer des favoris' : 'Ajouter aux favoris'}</span>
            <Heart 
              className={`w-4 h-4 ${isWishlisted ? 'fill-urgent text-urgent' : 'text-muted-foreground'}`} 
              aria-hidden="true"
            />
          </button>

          {/* Product Image */}
          <img
            src={imageError ? fallbackImage : product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {/* Quick Add Button */}
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              size="sm" 
              className="w-full bg-white text-primary hover:bg-primary hover:text-white font-semibold"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            {product.brand && (
              <span className="text-xs text-muted-foreground font-medium">
                {product.brand}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= product.rating!
                        ? 'fill-gold text-gold'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {formatCFA(product.priceCents)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                {formatCFA(product.oldPriceCents)}
              </span>
            </div>
            <p className="text-xs font-medium text-success">
              Économisez {formatCFA(product.savings)}
            </p>
          </div>

          {/* Stock Status */}
          {product.stock && product.stock < 10 && (
            <p className="text-xs text-urgent font-medium">
              Plus que {product.stock} en stock !
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}