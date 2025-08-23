import { Star, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredProducts = [
  {
    id: 1,
    name: "Sérum Vitamine C",
    brand: "SkinCeuticals",
    price: 45000,
    oldPrice: 60000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 127,
    isNew: false,
    isSale: true
  },
  {
    id: 2,
    name: "Crème Hydratante",
    brand: "CeraVe",
    price: 28000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1598662779094-110c2bad80b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isSale: false
  },
  {
    id: 3,
    name: "Masque à l'Argile",
    brand: "The Ordinary",
    price: 15000,
    oldPrice: 20000,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 203,
    isNew: false,
    isSale: true
  },
  {
    id: 4,
    name: "Nettoyant Doux",
    brand: "Neutrogena",
    price: 18000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isSale: false
  }
]

function formatPrice(price: number) {
  return `${price.toLocaleString()} FCFA`
}

export function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-4">
            Produits Vedettes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Nos meilleures ventes et coups de cœur sélectionnés pour vous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover-scale cursor-pointer overflow-hidden h-full">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge variant="secondary" className="bg-primary text-primary-foreground">
                      NOUVEAU
                    </Badge>
                  )}
                  {product.isSale && (
                    <Badge variant="destructive">
                      -{Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Wishlist button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {product.name}
                  </h3>
                  
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

                  {/* Add to cart button */}
                  <Button className="w-full mt-3" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Ajouter au panier
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}