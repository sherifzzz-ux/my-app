"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

const newProducts = [
  {
    id: 11,
    name: "Essence Hydratante Acide Hyaluronique",
    brand: "Hydra Plus",
    price: "16.800 CFA",
    image: "/placeholder.svg?height=300&width=250",
    isNew: true,
    rating: 4.9,
  },
  {
    id: 12,
    name: "Baume Nettoyant Huile de Jojoba",
    brand: "Clean Beauty",
    price: "13.500 CFA",
    image: "/placeholder.svg?height=300&width=250",
    isNew: true,
    rating: 4.7,
  },
  {
    id: 13,
    name: "Sérum Niacinamide 10%",
    brand: "Active Care",
    price: "11.200 CFA",
    image: "/placeholder.svg?height=300&width=250",
    isNew: true,
    rating: 4.8,
  },
  {
    id: 14,
    name: "Crème de Nuit Rétinol",
    brand: "Night Repair",
    price: "24.000 CFA",
    image: "/placeholder.svg?height=300&width=250",
    isNew: true,
    rating: 4.6,
  },
  {
    id: 15,
    name: "Brume Fixatrice Maquillage",
    brand: "Makeup Pro",
    price: "9.800 CFA",
    image: "/placeholder.svg?height=300&width=250",
    isNew: true,
    rating: 4.5,
  },
]

export function NouveautesSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newProducts.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  const visibleProducts = [...newProducts.slice(currentIndex), ...newProducts.slice(0, currentIndex)].slice(0, 4)

  return (
    <section className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Nouveautés</h2>
          <p className="text-gray-600">Découvrez nos derniers produits innovants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProducts.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
            >
              {product.isNew && (
                <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full z-10">
                  NOUVEAU
                </div>
              )}
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
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
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
