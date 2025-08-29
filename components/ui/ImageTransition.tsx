"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageTransitionProps {
  images: string[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  transitionType?: 'fade' | 'slide' | 'zoom' | 'flip';
  duration?: number;
}

export function ImageTransition({
  images,
  currentIndex,
  onIndexChange,
  className = "",
  autoPlay = false,
  interval = 3000,
  showControls = true,
  showIndicators = true,
  transitionType = 'fade',
  duration = 0.5
}: ImageTransitionProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play
  useEffect(() => {
    if (autoPlay && isPlaying) {
      intervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % images.length;
        onIndexChange?.(nextIndex);
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isPlaying, currentIndex, interval, images.length, onIndexChange]);

  // Pause auto-play au survol
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(autoPlay);

  // Navigation
  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    onIndexChange?.(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onIndexChange?.(prevIndex);
  };

  const goToIndex = (index: number) => {
    onIndexChange?.(index);
  };

  // Animations selon le type de transition
  const getTransitionVariants = () => {
    switch (transitionType) {
      case 'fade':
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        };
      
      case 'slide':
        return {
          enter: { x: 300, opacity: 0 },
          center: { x: 0, opacity: 1 },
          exit: { x: -300, opacity: 0 }
        };
      
      case 'zoom':
        return {
          enter: { scale: 0.8, opacity: 0 },
          center: { scale: 1, opacity: 1 },
          exit: { scale: 1.2, opacity: 0 }
        };
      
      case 'flip':
        return {
          enter: { rotateY: 90, opacity: 0 },
          center: { rotateY: 0, opacity: 1 },
          exit: { rotateY: -90, opacity: 0 }
        };
      
      default:
        return {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  if (images.length === 0) return null;

  return (
    <div 
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Images avec transitions */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial="enter"
          animate="center"
          exit="exit"
          variants={getTransitionVariants()}
          transition={{ duration }}
        />
      </AnimatePresence>

      {/* Contrôles de navigation */}
      {showControls && images.length > 1 && (
        <>
          {/* Bouton précédent */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Image précédente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Bouton suivant */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            aria-label="Image suivante"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Indicateurs de position */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75 hover:scale-110"
              )}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Informations sur l'image */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Bouton play/pause pour l'auto-play */}
      {autoPlay && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
          aria-label={isPlaying ? "Pause" : "Lecture"}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

// Composant spécialisé pour les galeries de marques
export function BrandImageGallery({
  images,
  currentIndex,
  onIndexChange,
  className = "",
  ...props
}: Omit<ImageTransitionProps, 'transitionType' | 'autoPlay'>) {
  return (
    <ImageTransition
      {...props}
      images={images}
      currentIndex={currentIndex}
      onIndexChange={onIndexChange}
      className={cn("rounded-lg border shadow-lg", className)}
      transitionType="fade"
      duration={0.3}
      showControls={true}
      showIndicators={true}
    />
  );
}

// Composant pour les transitions d'images uniques
export function SingleImageTransition({
  oldImage,
  newImage,
  className = "",
  transitionType = 'fade',
  duration = 0.5,
  onTransitionComplete
}: {
  oldImage?: string;
  newImage: string;
  className?: string;
  transitionType?: 'fade' | 'slide' | 'zoom';
  duration?: number;
  onTransitionComplete?: () => void;
}) {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (oldImage && oldImage !== newImage) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        onTransitionComplete?.();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [oldImage, newImage, duration, onTransitionComplete]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.img
          key={newImage}
          src={newImage}
          alt="Image"
          className="w-full h-full object-cover"
          initial="enter"
          animate="center"
          exit="exit"
          variants={{
            enter: { opacity: 0, scale: 0.95 },
            center: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 1.05 }
          }}
          transition={{ duration }}
        />
      </AnimatePresence>
    </div>
  );
}
