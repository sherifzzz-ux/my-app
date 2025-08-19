import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCFA } from "@/lib/utils";

export async function RecommendationsSection() {
  const products = await prisma.product.findMany({
    orderBy: { rating: "desc" },
    take: 8,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      priceCents: true,
      oldPriceCents: true,
      rating: true,
      brand: { select: { name: true } },
    },
  });

  const visibleProducts = products.slice(0, 4);

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommandations</h2>
          <p className="text-gray-600">Nos produits les mieux notés</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link href={`/product/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{product.brand?.name ?? ""}</div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm" aria-hidden>
                    {"★".repeat(Math.round(product.rating ?? 0))}
                  </div>
                  {product.rating ? (
                    <span className="text-sm text-gray-500 ml-1">({product.rating.toFixed(1)})</span>
                  ) : null}
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    {product.oldPriceCents ? (
                      <>
                        <span className="text-sm text-gray-500 line-through mr-2">{formatCFA(product.oldPriceCents)}</span>
                        <span className="text-lg font-bold text-gray-900">{formatCFA(product.priceCents)}</span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">{formatCFA(product.priceCents)}</span>
                    )}
                  </div>
                </div>
                <Link href={`/product/${product.id}`} className="w-full inline-block text-center bg-pink-600 hover:bg-pink-700 text-white rounded-md py-2 text-sm">
                  Voir le produit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendationsSection;


