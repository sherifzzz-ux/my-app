'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface LazySectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  fallback?: ReactNode
  once?: boolean
  onVisible?: () => void
}

export function LazySection({
  children,
  className,
  threshold = 0.1,
  rootMargin = '50px',
  fallback,
  once = true,
  onVisible,
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (!hasBeenVisible) {
              setHasBeenVisible(true)
              onVisible?.()
            }
            
            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, once, onVisible, hasBeenVisible])

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0",
        className
      )}
    >
      {isVisible ? children : fallback}
    </div>
  )
}

// Composant spécialisé pour les grilles de produits
export function LazyProductGrid({
  children,
  className,
  fallback,
}: {
  children: ReactNode
  className?: string
  fallback?: ReactNode
}) {
  return (
    <LazySection
      className={className}
      threshold={0.1}
      rootMargin="100px"
      fallback={
        fallback || (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg aspect-square mb-2" />
                <div className="bg-muted h-4 rounded mb-1" />
                <div className="bg-muted h-3 rounded w-2/3" />
              </div>
            ))}
          </div>
        )
      }
    >
      {children}
    </LazySection>
  )
}

// Composant pour les sections de contenu
export function LazyContentSection({
  children,
  className,
  fallback,
}: {
  children: ReactNode
  className?: string
  fallback?: ReactNode
}) {
  return (
    <LazySection
      className={className}
      threshold={0.2}
      rootMargin="50px"
      fallback={
        fallback || (
          <div className="animate-pulse space-y-4">
            <div className="bg-muted h-8 rounded w-1/2" />
            <div className="bg-muted h-4 rounded" />
            <div className="bg-muted h-4 rounded w-3/4" />
          </div>
        )
      }
    >
      {children}
    </LazySection>
  )
}

// Hook pour observer la visibilité d'un élément
export function useIntersectionObserver(
  threshold = 0.1,
  rootMargin = '50px'
) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
          if (entry.isIntersecting && !hasBeenVisible) {
            setHasBeenVisible(true)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin, hasBeenVisible])

  return {
    elementRef,
    isVisible,
    hasBeenVisible,
  }
}
