'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Clock, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Promotion {
  id: string
  title: string
  description: string
  image: string
  discount: number
  originalPrice: number
  salePrice: number
  endDate: string
  category: string
  isActive: boolean
}

interface PromotionCarouselProps {
  promotions: Promotion[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function PromotionCarousel({
  promotions,
  autoPlay = true,
  autoPlayInterval = 5000,
  className
}: PromotionCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || promotions.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === promotions.length - 1 ? 0 : prevIndex + 1
      )
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, autoPlayInterval, promotions.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? promotions.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === promotions.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const formatTimeRemaining = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) return 'Expiré'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}j ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  if (promotions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Aucune promotion disponible</p>
      </div>
    )
  }

  const currentPromotion = promotions[currentIndex]

  return (
    <div className={cn('relative w-full', className)}>
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {promotions.map((promotion) => (
            <div key={promotion.id} className="w-full flex-shrink-0">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="relative h-96 md:h-[500px]">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${promotion.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center">
                      <div className="container mx-auto px-4">
                        <div className="max-w-2xl">
                          {/* Badge */}
                          <Badge className="mb-4 bg-red-500 text-white">
                            <Tag className="w-3 h-3 mr-1" />
                            -{promotion.discount}% OFF
                          </Badge>
                          
                          {/* Title */}
                          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {promotion.title}
                          </h2>
                          
                          {/* Description */}
                          <p className="text-xl text-white/90 mb-6">
                            {promotion.description}
                          </p>
                          
                          {/* Price */}
                          <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-white">
                              {promotion.salePrice.toLocaleString()} FCFA
                            </span>
                            <span className="text-xl text-white/70 line-through">
                              {promotion.originalPrice.toLocaleString()} FCFA
                            </span>
                          </div>
                          
                          {/* Timer */}
                          <div className="flex items-center gap-2 mb-6">
                            <Clock className="w-5 h-5 text-white" />
                            <span className="text-white font-medium">
                              Se termine dans: {formatTimeRemaining(promotion.endDate)}
                            </span>
                          </div>
                          
                          {/* CTA Button */}
                          <Button size="lg" className="bg-white text-black hover:bg-white/90">
                            Profiter de l&apos;offre
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        {promotions.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      
      {/* Dots Indicator */}
      {promotions.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {promotions.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                index === currentIndex ? 'bg-primary' : 'bg-muted'
              )}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}
      
      {/* Play/Pause Button */}
      {promotions.length > 1 && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
      )}
    </div>
  )
}
