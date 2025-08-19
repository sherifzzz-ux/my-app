"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

const recommendedProducts = [
  {
    id: 1,
    name: "Sérum Vitamine C Éclat",
    brand: "Flawless Beauty",
    price: "15.500 CFA",
    originalPrice: "18.000 CFA",
    image: "/vitamin-c-serum.png",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Crème Hydratante 24h",
    brand: "Pure Glow",
    price: "12.000 CFA",
    image: "/placeholder-rr5r7.png",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Masque Purifiant Argile",
    brand: "Natural Care",
    price: "8.500 CFA",
    originalPrice: "10.000 CFA",
    image: "/clay-mask-tube.png",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Huile Démaquillante Douce",
    brand: "Gentle Touch",
    price: "14.200 CFA",
    image: "/placeholder.svg?height=300&width=250",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Contour des Yeux Anti-Âge",
    brand: "Youth Restore",
    price: "22.000 CFA",
    image: "/placeholder.svg?height=300&width=250",
    rating: 4.8,
  },
]

export function RecommendationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendedProducts.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const visibleProducts = [
    ...recommendedProducts.slice(currentIndex),
    ...recommendedProducts.slice(0, currentIndex),
  ].slice(0, 4)

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommandations</h2>
          <p className="text-gray-600">Nos produits les plus appréciés par nos clients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{product.brand}</div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 text-sm">{"★".repeat(Math.floor(product.rating))}</div>
                  <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
                <Button onClick={() => addToCart(product)} className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                  Ajouter au panier
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
