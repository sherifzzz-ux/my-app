'use client'

import Image from 'next/image'
import { Carousel, CarouselItem } from '@/components/ui/carousel'
import { CarouselDots } from '@/components/ui/carousel'

const slides = [
  { id: 1, src: '/images/banner1.jpg', alt: 'Promotion 1' },
  { id: 2, src: '/images/banner2.jpg', alt: 'Promotion 2' },
  { id: 3, src: '/images/banner3.jpg', alt: 'Promotion 3' },
]

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
