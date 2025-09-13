'use client'

import { ReactNode, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface GPUAnimationProps {
  children: ReactNode
  className?: string
  animation?: 'fade' | 'slide' | 'scale' | 'rotate' | 'none'
  duration?: number
  delay?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  iterationCount?: number | 'infinite'
  ease?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear'
  willChange?: 'auto' | 'scroll-position' | 'contents' | 'transform' | 'opacity'
}

export function GPUAnimation({
  children,
  className,
  animation = 'fade',
  duration = 300,
  delay = 0,
  direction = 'normal',
  iterationCount = 1,
  ease = 'ease-out',
  willChange = 'transform',
}: GPUAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Optimisation GPU
    element.style.willChange = willChange
    element.style.transform = 'translateZ(0)' // Force GPU layer

    return () => {
      // Nettoyer les propriétés GPU
      element.style.willChange = 'auto'
      element.style.transform = ''
    }
  }, [willChange])

  const animationClasses = {
    fade: 'animate-fade-in',
    slide: 'animate-slide-up',
    scale: 'animate-scale-in',
    rotate: 'animate-rotate-in',
    none: '',
  }

  const style = {
    animationDuration: `${duration}ms`,
    animationDelay: `${delay}ms`,
    animationDirection: direction,
    animationIterationCount: iterationCount,
    animationTimingFunction: ease,
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        'gpu-accelerated',
        animationClasses[animation],
        className
      )}
      style={style}
    >
      {children}
    </div>
  )
}

// Composant spécialisé pour les cartes de produits
export function ProductCardAnimation({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <GPUAnimation
      animation="scale"
      duration={200}
      ease="ease-out"
      willChange="transform"
      className={cn("hover:scale-105 transition-transform duration-200", className)}
    >
      {children}
    </GPUAnimation>
  )
}

// Composant pour les boutons avec animation
export function ButtonAnimation({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <GPUAnimation
      animation="scale"
      duration={150}
      ease="ease-out"
      willChange="transform"
      className={cn("active:scale-95 transition-transform duration-150", className)}
    >
      {children}
    </GPUAnimation>
  )
}

// Composant pour les modales et overlays
export function ModalAnimation({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <GPUAnimation
      animation="fade"
      duration={300}
      ease="ease-out"
      willChange="opacity"
      className={className}
    >
      {children}
    </GPUAnimation>
  )
}

// Hook pour optimiser les animations
export function useGPUOptimization() {
  useEffect(() => {
    // Optimiser les animations CSS
    const style = document.createElement('style')
    style.textContent = `
      .gpu-accelerated {
        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000px;
      }
      
      .animate-fade-in {
        animation-name: fadeIn;
      }
      
      .animate-slide-up {
        animation-name: slideUp;
      }
      
      .animate-scale-in {
        animation-name: scaleIn;
      }
      
      .animate-rotate-in {
        animation-name: rotateIn;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slideUp {
        from { 
          opacity: 0; 
          transform: translateY(20px) translateZ(0); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0) translateZ(0); 
        }
      }
      
      @keyframes scaleIn {
        from { 
          opacity: 0; 
          transform: scale(0.9) translateZ(0); 
        }
        to { 
          opacity: 1; 
          transform: scale(1) translateZ(0); 
        }
      }
      
      @keyframes rotateIn {
        from { 
          opacity: 0; 
          transform: rotate(-10deg) translateZ(0); 
        }
        to { 
          opacity: 1; 
          transform: rotate(0deg) translateZ(0); 
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])
}
