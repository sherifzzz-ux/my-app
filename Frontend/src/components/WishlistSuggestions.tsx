import React from 'react';
import { Heart, TrendingUp, Star, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/useWishlist';

interface SuggestionCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    category: string;
    reason: string;
  };
  onAddToWishlist: (product: any) => void;
  isInWishlist: boolean;
}

function SuggestionCard({ product, onAddToWishlist, isInWishlist }: SuggestionCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          
          {/* Reason Badge */}
          <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs">
            {product.reason}
          </Badge>

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <Badge className="absolute top-2 right-2 bg-urgent text-urgent-foreground">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
          <h3 className="font-semibold mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating}
            </span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onAddToWishlist(product)}
              disabled={isInWishlist}
            >
              <Heart className={`w-4 h-4 mr-1 ${isInWishlist ? 'fill-current' : ''}`} />
              {isInWishlist ? 'Déjà ajouté' : 'Ajouter aux favoris'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WishlistSuggestions() {
  const { items, addToWishlist, isInWishlist } = useWishlist();

  // Mock suggestions based on wishlist
  const suggestions = [
    {
      id: '101',
      name: 'Sérum Vitamine C The INKEY List',
      brand: 'The INKEY List',
      price: 8500,
      originalPrice: 12000,
      image: '/placeholder.svg',
      rating: 4.6,
      category: 'Soin du visage',
      reason: 'Populaire'
    },
    {
      id: '102',
      name: 'Crème Hydratante CeraVe PM',
      brand: 'CeraVe',
      price: 15000,
      image: '/placeholder.svg',
      rating: 4.8,
      category: 'Soin du visage',
      reason: 'Recommandé'
    },
    {
      id: '103',
      name: 'Mascara Volume Million Lashes',
      brand: "L'Oréal",
      price: 12000,
      originalPrice: 15000,
      image: '/placeholder.svg',
      rating: 4.7,
      category: 'Maquillage',
      reason: 'Tendance'
    },
    {
      id: '104',
      name: 'Baume Réparateur Nuit Avène',
      brand: 'Avène',
      price: 18500,
      image: '/placeholder.svg',
      rating: 4.9,
      category: 'Soin du visage',
      reason: 'Recommandé'
    }
  ];

  const handleAddToWishlist = (product: any) => {
    const productForWishlist = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      inStock: true,
      category: product.category,
    };
    addToWishlist(productForWishlist);
  };

  if (items.length === 0) {
    return null; // Don't show suggestions if no wishlist items
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground">
              Suggestions pour vous
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Basées sur vos favoris et les tendances actuelles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestions.map((product) => (
            <SuggestionCard
              key={product.id}
              product={product}
              onAddToWishlist={handleAddToWishlist}
              isInWishlist={isInWishlist(product.id)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            <Eye className="w-4 h-4 mr-2" />
            Voir plus de suggestions
          </Button>
        </div>
      </div>
    </section>
  );
}