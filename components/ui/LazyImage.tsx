"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Image as ImageIcon, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./LazyImage.module.css";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  fallback?: string;
  width?: number;
  height?: number;
  priority?: boolean; // Pour les images importantes (above the fold)
  onLoad?: () => void;
  onError?: () => void;
  // Options de placeholder
  showPlaceholder?: boolean;
  placeholderType?: 'blur' | 'skeleton' | 'icon' | 'gradient';
  // Options d'animation
  fadeIn?: boolean;
  scaleIn?: boolean;
  // Options de lazy loading
  threshold?: number; // Distance en pixels avant de charger
  rootMargin?: string; // Marge autour du viewport
}

export function LazyImage({
  src,
  alt,
  className = "",
  placeholder,
  fallback = "/placeholder-image.png",
  width,
  height,
  priority = false,
  onLoad,
  onError,
  showPlaceholder = true,
  placeholderType = 'skeleton',
  fadeIn = true,
  scaleIn = false,
  threshold = 0.1,
  rootMargin = "50px"
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState<string>(priority ? src : '');
  
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer pour le lazy loading
  useEffect(() => {
    if (priority || !showPlaceholder) {
      setIsInView(true);
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current = observer;

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [src, priority, threshold, rootMargin, showPlaceholder]);

  // Gestion du chargement de l'image
  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    setIsError(false);
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setIsError(true);
    setIsLoaded(false);
    onError?.();
  }, [onError]);

  // Générer un placeholder basé sur le type
  const generatePlaceholder = () => {
    switch (placeholderType) {
      case 'blur':
        return (
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300",
              "animate-pulse blur-sm",
              placeholder || fallback ? styles.placeholderBlur : ""
            )}
          />
        );
      
      case 'skeleton':
        return (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        );
      
      case 'icon':
        return (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        );
      
      case 'gradient':
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 animate-pulse" />
        );
      
      default:
        return null;
    }
  };

  // Classes d'animation
  const animationClasses = cn(
    "transition-all duration-500 ease-out",
    {
      "opacity-0 scale-95": !isLoaded,
      "opacity-100 scale-100": isLoaded,
      [styles.animateFadeIn]: fadeIn && isLoaded,
      [styles.animateScaleIn]: scaleIn && isLoaded,
    }
  );

  return (
    <div 
      ref={imgRef}
      className={cn(
        styles.lazyImageContainer,
        "relative overflow-hidden",
        width && styles.wDynamic,
        height && styles.hDynamic,
        className
      )}
    >
      {/* Placeholder */}
      {showPlaceholder && !isLoaded && !isError && (
        <div className="absolute inset-0">
          {generatePlaceholder()}
          
          {/* Indicateur de chargement */}
          {isInView && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
        </div>
      )}

      {/* Image d'erreur */}
      {isError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 border-2 border-red-200 rounded-lg">
          <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
          <span className="text-sm text-red-600 text-center px-2">
            Erreur de chargement
          </span>
        </div>
      )}

      {/* Image principale */}
      {isInView && (
        <img
          src={imageSrc}
          alt={alt}
          className={cn(
            "w-full h-full object-cover",
            animationClasses
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}

      {/* Overlay de chargement */}
      {isInView && !isLoaded && !isError && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3 shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        </div>
      )}
    </div>
  );
}

// Composant spécialisé pour les logos de marques
export function BrandLogo({
  src,
  alt,
  className = "",
  size = "md",
  ...props
}: Omit<LazyImageProps, 'placeholderType'> & {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32"
  };

  return (
    <LazyImage
      {...props}
      src={src}
      alt={alt}
      className={cn(
        "rounded-lg border bg-white",
        sizeClasses[size],
        className
      )}
      placeholderType="icon"
      showPlaceholder={true}
      fadeIn={true}
      scaleIn={false}
    />
  );
}

// Composant spécialisé pour les images de produits
export function ProductImage({
  src,
  alt,
  className = "",
  ...props
}: Omit<LazyImageProps, 'placeholderType'>) {
  return (
    <LazyImage
      {...props}
      src={src}
      alt={alt}
      className={cn(
        "rounded-lg border shadow-sm",
        className
      )}
      placeholderType="skeleton"
      showPlaceholder={true}
      fadeIn={true}
      scaleIn={true}
    />
  );
}
