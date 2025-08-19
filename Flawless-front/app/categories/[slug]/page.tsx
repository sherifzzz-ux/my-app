import { notFound } from "next/navigation"
import { getProductsByCategory } from "@/lib/products-data"
import CategoryPage from "@/components/category-page"

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    sort?: string
    brand?: string
    minPrice?: string
    maxPrice?: string
    page?: string
  }
}

const categoryNames: Record<string, string> = {
  "soin-du-visage": "Soin du Visage",
  "corps-bain": "Corps & Bain",
  maquillage: "Maquillage",
  cheveux: "Cheveux",
  "korean-beauty": "Korean Beauty",
  "bien-etre-intime": "Bien-être Intime",
  "soins-bebe": "Soins Bébé",
  parfums: "Parfums",
  nouveautes: "Nouveautés",
  promotion: "Promotions",
}

export default function CategoryCollectionPage({ params, searchParams }: CategoryPageProps) {
  const categoryName = categoryNames[params.slug]

  if (!categoryName) {
    notFound()
  }

  const products = getProductsByCategory(params.slug)

  return (
    <CategoryPage
      categorySlug={params.slug}
      categoryName={categoryName}
      products={products}
      searchParams={searchParams}
    />
  )
}

export async function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({
    slug,
  }))
}
