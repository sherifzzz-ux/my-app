import { ProductCard } from "@/components/ui/ProductCard"

const featuredProducts = [
  {
    id: 1,
    name: "Sérum Vitamine C",
    brand: "SkinCeuticals",
    price: 45000,
    originalPrice: 60000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.8,
    reviews: 127,
    isNew: false,
    isPromo: true,
    discountPercentage: 25
  },
  {
    id: 2,
    name: "Crème Hydratante",
    brand: "CeraVe",
    price: 28000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1598662779094-110c2bad80b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.9,
    reviews: 89,
    isNew: true,
    isPromo: false
  },
  {
    id: 3,
    name: "Masque à l'Argile",
    brand: "The Ordinary",
    price: 15000,
    originalPrice: 20000,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.6,
    reviews: 203,
    isNew: false,
    isPromo: true,
    discountPercentage: 25
  },
  {
    id: 4,
    name: "Nettoyant Doux",
    brand: "Neutrogena",
    price: 18000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    isPromo: false
  }
]

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
            <ProductCard 
              key={product.id} 
              product={product}
              showWishlist={true}
              showRating={true}
              showDescription={false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}