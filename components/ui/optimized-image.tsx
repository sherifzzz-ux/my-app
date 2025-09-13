'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  sizes?: string
  quality?: number
  fill?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  quality = 75,
  fill = false,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }

  // Image d'erreur par défaut
  if (hasError) {
    return (
      <div className={cn(
        "flex items-center justify-center bg-muted text-muted-foreground",
        fill ? "absolute inset-0" : "",
        className
      )}>
        <div className="text-center p-4">
          <div className="text-sm">Image non disponible</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Loading placeholder */}
      {isLoading && (
        <div className={cn(
          "absolute inset-0 bg-muted animate-pulse",
          fill ? "w-full h-full" : ""
        )} />
      )}
      
      {/* Image optimisée */}
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={cn(
          "object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

// Composant spécialisé pour les images de produits
export function ProductImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height' | 'sizes'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={400}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={cn("rounded-lg", className)}
      priority={priority}
      {...props}
    />
  )
}

// Composant pour les images de héros/bannières
export function HeroImage({
  src,
  alt,
  className,
  priority = true,
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height' | 'sizes' | 'fill'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={1200}
      height={600}
      sizes="100vw"
      className={cn("rounded-xl", className)}
      priority={priority}
      {...props}
    />
  )
}

// Composant pour les avatars
export function AvatarImage({
  src,
  alt,
  size = 40,
  className,
  ...props
}: Omit<OptimizedImageProps, 'width' | 'height' | 'sizes'> & {
  size?: number
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn("rounded-full", className)}
      {...props}
    />
  )
}

// Génération de blur placeholder
export function generateBlurDataURL(width: number, height: number, color = '#f3f4f6'): string {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  
  if (ctx) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)
  }
  
  return canvas.toDataURL()
}
