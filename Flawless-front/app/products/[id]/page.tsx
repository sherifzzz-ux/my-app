import { notFound } from "next/navigation"
import { getProductById } from "@/lib/products-data"
import ProductDetail from "@/components/product-detail"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return <ProductDetail product={product} />
}

export async function generateStaticParams() {
  // In a real app, this would fetch from your API/database
  return [{ id: "cerave-gel-moussant-236ml" }, { id: "the-ordinary-niacinamide-10-zinc-1" }]
}
