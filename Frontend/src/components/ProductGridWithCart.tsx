import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { toast } from "sonner"
import { Link } from "react-router-dom"

const products = [
  {
    id: 1,
    name: "Huile Démaquillante",
    brand: "DHC",
    price: 32000,
    oldPrice: 40000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 89,
    category: "Nettoyant"
  },
  {
    id: 2,
    name: "Essence Hydratante",
    brand: "SK-II",
    price: 85000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1598662779094-110c2bad80b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 156,
    category: "Essence"
  },
  {
    id: 3,
    name: "BB Cream SPF 30",
    brand: "Missha",
    price: 22000,
    oldPrice: 28000,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 203,
    category: "Teint"
  },
  {
    id: 4,
    name: "Masque Tissu Collagène",
    brand: "Tony & Munoz",
    price: 3500,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 89,
    category: "Masque"
  },
  {
    id: 5,
    name: "Toner BHA",
    brand: "Paula's Choice",
    price: 38000,
    oldPrice: 45000,
    image: "https://images.unsplash.com/photo-1556228578-dd49eda9c2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 134,
    category: "Toner"
  },
  {
    id: 6,
    name: "Crème Contour Yeux",
    brand: "Kiehl's",
    price: 48000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 78,
    category: "Soin yeux"
  },
  {
    id: 7,
    name: "Rouge à Lèvres Mat",
    brand: "MAC",
    price: 35000,
    oldPrice: 42000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 267,
    category: "Lèvres"
  },
  {
    id: 8,
    name: "Fond de Teint Liquide",
    brand: "Fenty Beauty",
    price: 42000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 198,
    category: "Teint"
  }
]

function formatPrice(price: number) {
  return `${price.toLocaleString()} FCFA`
}

export function ProductGridWithCart() {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.price,
      originalPrice: product.oldPrice,
      image: product.image,
    });
    toast.success(`${product.name} ajouté au panier`);
  };

  const handleWishlistToggle = (product: any) => {
    const productForWishlist = {
      id: product.id.toString(),
      name: product.name,
      brand: product.brand,
      price: product.price,
      originalPrice: product.oldPrice,
      image: product.image,
      rating: product.rating,
      inStock: true,
    };

    if (isInWishlist(product.id.toString())) {
      removeFromWishlist(product.id.toString());
      toast.success(`${product.name} retiré des favoris`);
    } else {
      addToWishlist(productForWishlist);
      toast.success(`${product.name} ajouté aux favoris`);
    }
  };
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Nos Produits
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une sélection soignée de produits de beauté de qualité premium
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover-scale cursor-pointer overflow-hidden h-full">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Sale badge */}
                {product.oldPrice && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-3 left-3"
                  >
                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </Badge>
                )}

                {/* Category badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 right-3 bg-primary/90 text-primary-foreground"
                >
                  {product.category}
                </Badge>

                {/* Wishlist button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-3 right-3 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleWishlistToggle(product)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist(product.id.toString()) ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
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
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-foreground">
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>

                  <Button 
                    className="w-full mt-3" 
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Voir tous les produits
          </Button>
        </div>
      </div>
    </section>
  )
}