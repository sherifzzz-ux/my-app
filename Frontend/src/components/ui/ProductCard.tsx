import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { toast } from "sonner"

interface ProductCardProps {
  product: {
    id: string | number
    name: string
    brand: string
    price: number
    originalPrice?: number
    currentPrice?: number
    image: string
    rating: number
    reviews: number
    category?: string
    isNew?: boolean
    isPromo?: boolean
    discountPercentage?: number
    inStock?: boolean
    description?: string
  }
  className?: string
  showWishlist?: boolean
  showRating?: boolean
  showDescription?: boolean
}

function formatPrice(price: number) {
  return `${price.toLocaleString()} FCFA`
}

export function ProductCard({ 
  product, 
  className = "", 
  showWishlist = true, 
  showRating = true,
  showDescription = false 
}: ProductCardProps) {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.currentPrice || product.price,
      originalPrice: product.originalPrice,
      image: product.image,
    });
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productForWishlist = {
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.currentPrice || product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      rating: product.rating,
      inStock: product.inStock !== false,
    };

    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
      toast.success(`${product.name} retiré des favoris`);
    } else {
      addToWishlist(productForWishlist);
      toast.success(`${product.name} ajouté aux favoris`);
    }
  };

  const price = product.currentPrice || product.price;
  const originalPrice = product.originalPrice;

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 overflow-hidden h-full ${className}`}>
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          {/* Product Image - Clickable to view product */}
          <Link to={`/product/${product.id}`} className="block">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isNew && (
              <Badge className="bg-success text-success-foreground shadow-md">
                Nouveau
              </Badge>
            )}
            {product.isPromo && product.discountPercentage && (
              <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md">
                -{product.discountPercentage}%
              </Badge>
            )}
            {product.category && (
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground shadow-md">
                {product.category}
              </Badge>
            )}
            {product.inStock === false && (
              <Badge variant="destructive" className="shadow-md">
                Rupture
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          {showWishlist && (
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                className="bg-white/80 hover:bg-white shadow-md"
                onClick={handleWishlistToggle}
              >
                <Heart 
                  className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Brand */}
          <div className="text-sm text-primary font-medium mb-2">
            {product.brand}
          </div>
          
          {/* Product Name - Clickable to view product */}
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>

          {/* Description */}
          {showDescription && product.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
          
          {/* Rating */}
          {showRating && (
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews} avis)
              </span>
            </div>
          )}
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button - Always visible at bottom */}
          <Button 
            className="w-full" 
            size="sm"
            onClick={handleAddToCart}
            disabled={product.inStock === false}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock === false ? 'Indisponible' : 'Ajouter au panier'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
