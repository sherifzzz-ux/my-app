'use client'

import Image from 'next/image'
import { Carousel, CarouselItem } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel'
import { getAllCarouselImages } from '@/lib/carousel-config'

const slides = getAllCarouselImages()

export function HeroCarousel({ className }: { className?: string }) {
  return (
    <Carousel
      className={`w-full overflow-hidden rounded-xl ${className ?? ''}`}
      autoplayIntervalMs={4500}
      pauseOnHover
    >
      {slides.map((s) => (
        <CarouselItem key={s.id}>
          <div className="relative aspect-[16/6] w-full">
            <Image src={s.src} alt={s.alt} fill className="object-cover" priority />
          </div>
        </CarouselItem>
      ))}
      <CarouselDots />
    </Carousel>
  )
}
