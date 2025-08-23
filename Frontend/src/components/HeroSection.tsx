"use client"

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const heroSlides = [
  {
    id: 1,
    title: "K-Beauty Skincare",
    subtitle: "Découvrez les secrets de beauté coréens",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Korean Beauty"
  },
  {
    id: 2,
    title: "Soin du Visage Premium",
    subtitle: "Révélez votre éclat naturel",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Skincare"
  },
  {
    id: 3,
    title: "Maquillage Professionnel",
    subtitle: "L'art de sublimer votre beauté",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Makeup"
  },
  {
    id: 4,
    title: "Parfums de Luxe",
    subtitle: "Trouvez votre signature olfactive",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Parfums"
  },
  {
    id: 5,
    title: "Soins Corps & Bain",
    subtitle: "Chouchoutez votre peau",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcac6c51a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Body Care"
  },
  {
    id: 6,
    title: "Cheveux Sublimés",
    subtitle: "Des cheveux en pleine santé",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Hair Care"
  },
  {
    id: 7,
    title: "Parapharmacie",
    subtitle: "Votre santé, notre priorité",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031e3a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Parapharmacie"
  },
  {
    id: 8,
    title: "Bébé & Enfant",
    subtitle: "Douceur et protection",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Baby Care"
  },
  {
    id: 9,
    title: "Idées Cadeaux",
    subtitle: "Offrez le meilleur de la beauté",
    image: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Cadeaux"
  },
  {
    id: 10,
    title: "Nouveautés",
    subtitle: "Les dernières tendances beauté",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    brand: "Nouveautés"
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white space-y-4 px-4">
                  <div className="inline-block bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {slide.brand}
                  </div>
                  <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                    {slide.subtitle}
                  </p>
                  <div className="pt-6">
                    <Button size="lg" className="primary-gradient text-white font-semibold px-8 py-3 text-lg">
                      Découvrir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  )
}