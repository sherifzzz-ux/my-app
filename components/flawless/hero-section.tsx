'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const heroSlides = [
  {
    id: 1,
    title: 'FLAWLESS BEAUTY',
    subtitle: 'VOTRE BEAUTÉ, NOTRE PASSION',
    description:
      'Découvrez notre sélection premium de cosmétiques et parapharmacie. Livraison gratuite à Dakar dès 25,000 CFA.',
    image: '/skin1004-centella-products.png',
    textPosition: 'right',
  },
  {
    id: 2,
    title: 'KOREAN BEAUTY',
    subtitle: 'LES SECRETS DE LA K-BEAUTY',
    description:
      'Importés directement de Corée du Sud, nos produits K-Beauty révèlent l\'éclat naturel de votre peau.',
    image: '/placeholder-e39dn.png?key=dl16e',
    textPosition: 'left',
  },
  {
    id: 3,
    title: 'NOUVEAUTÉS',
    subtitle: 'DERNIÈRES TENDANCES BEAUTÉ',
    description: 'Soyez la première à découvrir nos dernières collections et innovations cosmétiques.',
    image: '/cosmetic-beauty-trends.png',
    textPosition: 'center',
  },
  {
    id: 4,
    title: 'SOIN ANTI-ÂGE',
    subtitle: 'JEUNESSE ÉTERNELLE',
    description:
      'Nos soins anti-âge haut de gamme redonnent fermeté et éclat à votre peau. Résultats visibles dès 15 jours.',
    image: '/anti-aging-skincare.png',
    textPosition: 'right',
  },
  {
    id: 5,
    title: 'MAQUILLAGE',
    subtitle: 'L\'ART DE SE SUBLIMER',
    description:
      'Gamme complète de maquillage professionnel pour tous les teints et occasions. Qualité française garantie.',
    image: '/placeholder-jnufl.png',
    textPosition: 'left',
  },
  {
    id: 6,
    title: 'HYDRATATION',
    subtitle: 'PEAU ÉCLATANTE AU QUOTIDIEN',
    description:
      "Formules hydratantes avancées pour une peau souple, douce et radieuse toute la journée.",
    image: '/placeholder-gpes1.png',
    textPosition: 'center',
  },
  {
    id: 7,
    title: 'NETTOYAGE',
    subtitle: 'PURETÉ ET DOUCEUR',
    description: 'Nettoyants adaptés à tous types de peau. Éliminez impuretés et maquillage en douceur.',
    image: '/gentle-face-cleansers.png',
    textPosition: 'right',
  },
  {
    id: 8,
    title: 'PROTECTION SOLAIRE',
    subtitle: 'DÉFENSE OPTIMALE UV',
    description: 'Écrans solaires haute protection SPF 50+ pour préserver votre capital jeunesse sous le soleil sénégalais.',
    image: '/placeholder-o31zj.png',
    textPosition: 'left',
  },
  {
    id: 9,
    title: 'SOINS CORPS',
    subtitle: 'DOUCEUR DE LA TÊTE AUX PIEDS',
    description: 'Crèmes, huiles et laits corporels pour une peau de bébé. Texture non grasse, absorption rapide.',
    image: '/body-care-lotions-creams.png',
    textPosition: 'center',
  },
  {
    id: 10,
    title: 'PARFUMS',
    subtitle: 'SIGNATURE OLFACTIVE EXCLUSIVE',
    description:
      'Collection de parfums de luxe français et internationaux. Trouvez votre fragrance signature.',
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
        <picture>
          <img
            src={currentSlideData.image || '/placeholder.svg'}
            alt={currentSlideData.title}
            className="w-full h-full object-cover"
          />
        </picture>
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
          <div className="text-sm text-pink-600 font-medium mb-2 italic">
            {currentSlideData.id === 1 ? 'Livraison gratuite à Dakar' :
             currentSlideData.id === 2 ? 'Import direct de Corée' :
             currentSlideData.id === 3 ? 'Nouveautés exclusives' :
             currentSlideData.id === 4 ? 'Résultats garantis' :
             currentSlideData.id === 5 ? 'Qualité française' :
             currentSlideData.id === 6 ? 'Formules avancées' :
             currentSlideData.id === 7 ? 'Adapté à tous types' :
             currentSlideData.id === 8 ? 'Protection optimale' :
             currentSlideData.id === 9 ? 'Texture non grasse' :
             'Collection exclusive'}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-2 tracking-wider">
            {currentSlideData.title}
          </h1>
          <h2 className="text-lg md:text-xl text-gray-700 font-medium mb-4">
            {currentSlideData.subtitle}
          </h2>
          <p className="text-gray-600 mb-6 max-w-md">{currentSlideData.description}</p>
        </div>
      </div>

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

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-pink-600' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            type="button"
            aria-label={`Aller à la diapositive ${index + 1}`}
            title={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
