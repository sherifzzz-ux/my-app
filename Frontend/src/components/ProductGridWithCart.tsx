import { ProductCard } from "@/components/ui/ProductCard"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "Huile Démaquillante",
    brand: "DHC",
    price: 32000,
    originalPrice: 40000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 89,
    category: "Nettoyant",
    isPromo: true,
    discountPercentage: 20
  },
  {
    id: 2,
    name: "Essence Hydratante",
    brand: "SK-II",
    price: 85000,
    originalPrice: null,
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
    originalPrice: 28000,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 203,
    category: "Teint",
    isPromo: true,
    discountPercentage: 21
  },
  {
    id: 4,
    name: "Masque Tissu Collagène",
    brand: "Tony & Munoz",
    price: 3500,
    originalPrice: null,
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
    originalPrice: 45000,
    image: "https://images.unsplash.com/photo-1556228578-dd49eda9c2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 134,
    category: "Toner",
    isPromo: true,
    discountPercentage: 16
  },
  {
    id: 6,
    name: "Crème Contour Yeux",
    brand: "Kiehl's",
    price: 48000,
    originalPrice: null,
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
    originalPrice: 42000,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 267,
    category: "Lèvres",
    isPromo: true,
    discountPercentage: 17
  },
  {
    id: 8,
    name: "Fond de Teint Liquide",
    brand: "Fenty Beauty",
    price: 42000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 198,
    category: "Teint"
  }
]

export function ProductGridWithCart() {
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
            <ProductCard 
              key={product.id} 
              product={product}
              showWishlist={true}
              showRating={true}
              showDescription={false}
            />
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