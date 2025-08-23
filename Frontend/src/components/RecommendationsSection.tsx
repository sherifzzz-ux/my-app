"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const recommendations = [
  {
    id: 1,
    name: "Crème Anti-âge Premium",
    brand: "Olay",
    price: 65000,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    reviews: 234
  },
  {
    id: 2,
    name: "Sérum Acide Hyaluronique",
    brand: "The Inkey List",
    price: 28000,
    image: "https://images.unsplash.com/photo-1598662779094-110c2bad80b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
    reviews: 189
  },
  {
    id: 3,
    name: "Huile Nettoyante Douce",
    brand: "Banila Co",
    price: 35000,
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Masque Hydrogel Gold",
    brand: "Petitfée",
    price: 8000,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4.6,
    reviews: 298
  },
  {
    id: 5,
    name: "Essence Fermentée",
    brand: "Missha",
    price: 42000,
    image: "https://images.unsplash.com/photo-1556228578-dd49eda9c2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    reviews: 167
  },
  {
    id: 6,
    name: "Crème Solaire Invisible",
    brand: "Purito",
    price: 22000,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
    reviews: 445
  }
]

function formatPrice(price: number) {
  return `${price.toLocaleString()} FCFA`
}

export function RecommendationsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(4)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(4)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => 
        prev + itemsPerView >= recommendations.length ? 0 : prev + 1
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= recommendations.length ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, recommendations.length - itemsPerView) : prev - 1
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-foreground mb-2">
              Recommandations
            </h2>
            <p className="text-muted-foreground">
              Sélectionnés spécialement pour vous
            </p>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" size="sm" onClick={prevSlide}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextSlide}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
            }}
          >
            {recommendations.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <Card className="group hover-scale cursor-pointer overflow-hidden h-full">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">{product.brand}</div>
                      <h3 className="font-semibold text-foreground line-clamp-2 text-sm">
                        {product.name}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="font-bold text-sm text-foreground">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="flex md:hidden justify-center space-x-2 mt-6">
          <Button variant="outline" size="sm" onClick={prevSlide}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={nextSlide}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}