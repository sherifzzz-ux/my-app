'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroSlides = [
  {
    id: 1,
    title: 'SKIN1004',
    subtitle: 'THE UNTOUCHED NATURE',
    description:
      'Ampoules ultra-concentrées à la Centella exclusive, pour une peau visiblement plus lisse et affinée.',
    image: '/skin1004-centella-products.png',
    textPosition: 'right',
  },
  {
    id: 2,
    title: 'KOREAN BEAUTY',
    subtitle: 'K-BEAUTY ESSENTIALS',
    description:
      'Découvrez les secrets de beauté coréens avec notre sélection exclusive de produits K-Beauty.',
    image: '/placeholder-e39dn.png?key=dl16e',
    textPosition: 'left',
  },
  {
    id: 3,
    title: 'NOUVEAUTÉS',
    subtitle: 'DERNIÈRES TENDANCES',
    description: 'Explorez nos dernières nouveautés en cosmétiques et soins de beauté.',
    image: '/cosmetic-beauty-trends.png',
    textPosition: 'center',
  },
  {
    id: 4,
    title: 'SOIN ANTI-ÂGE',
    subtitle: 'JEUNESSE ÉTERNELLE',
    description:
      'Redécouvrez une peau jeune et éclatante avec nos soins anti-âge révolutionnaires.',
    image: '/anti-aging-skincare.png',
    textPosition: 'right',
  },
  {
    id: 5,
    title: 'MAQUILLAGE',
    subtitle: 'BEAUTÉ PARFAITE',
    description:
      'Sublimez votre beauté naturelle avec notre gamme complète de maquillage professionnel.',
    image: '/placeholder-jnufl.png',
    textPosition: 'left',
  },
  {
    id: 6,
    title: 'HYDRATATION',
    subtitle: 'PEAU ÉCLATANTE',
    description:
      "Offrez à votre peau l'hydratation intense qu'elle mérite avec nos formules innovantes.",
    image: '/placeholder-gpes1.png',
    textPosition: 'center',
  },
  {
    id: 7,
    title: 'NETTOYAGE',
    subtitle: 'PURETÉ ABSOLUE',
    description: 'Purifiez votre peau en douceur avec nos nettoyants adaptés à tous types de peau.',
    image: '/gentle-face-cleansers.png',
    textPosition: 'right',
  },
  {
    id: 8,
    title: 'PROTECTION SOLAIRE',
    subtitle: 'DÉFENSE NATURELLE',
    description: 'Protégez votre peau des rayons UV avec nos écrans solaires haute protection.',
    image: '/placeholder-o31zj.png',
    textPosition: 'left',
  },
  {
    id: 9,
    title: 'SOINS CORPS',
    subtitle: 'DOUCEUR TOTALE',
    description: 'Chouchoutez votre corps avec nos soins nourrissants et apaisants.',
    image: '/body-care-lotions-creams.png',
    textPosition: 'center',
  },
  {
    id: 10,
    title: 'PARFUMS',
    subtitle: 'ÉLÉGANCE RAFFINÉE',
    description:
      'Découvrez notre collection exclusive de parfums pour une signature olfactive unique.',
    image: '/placeholder-wo0xm.png',
    textPosition: 'right',
  },
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

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-pink-50 to-rose-50">
      <div className="absolute inset-0">
        <img
          src={currentSlideData.image || '/placeholder.svg'}
          alt={currentSlideData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div
          className={`max-w-lg ${
            currentSlideData.textPosition === 'right'
              ? 'ml-auto text-right'
              : currentSlideData.textPosition === 'center'
                ? 'mx-auto text-center'
                : 'text-left'
          }`}
        >
          <div className="text-sm text-pink-600 font-medium mb-2 italic">en exclusivité !</div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 tracking-wider">
            {currentSlideData.title}
          </h1>
          <h2 className="text-lg md:text-xl text-gray-700 font-medium mb-4">
            {currentSlideData.subtitle}
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">{currentSlideData.description}</p>
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            title={`Aller à la diapositive ${index + 1}`}
            aria-label={`Aller à la diapositive ${index + 1}`}
            type="button"
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-pink-600' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
