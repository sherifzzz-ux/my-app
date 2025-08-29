import { ProductCard } from "@/components/ui/ProductCard"
import { PromoProduct } from "@/types/promo"

interface PromoProductCardProps {
  product: PromoProduct
  className?: string
}

export function PromoProductCard({ product, className = '' }: PromoProductCardProps) {
  // Transform the product data to match ProductCard interface
  const transformedProduct = {
    id: product.id,
    name: product.name,
    category: { name: product.category },
    priceCents: product.priceCents,
    oldPriceCents: product.oldPriceCents,
    imageUrl: product.imageUrl,
    stock: product.stock || 0,
    isNew: false, // Promo products are not new
    isPromo: true,
    discountPercentage: product.discountPercentage
  };

  return (
    <ProductCard 
      product={transformedProduct}
      className={className}
      showWishlist={true}
      showRating={true}
      showDescription={false}
    />
  );
}