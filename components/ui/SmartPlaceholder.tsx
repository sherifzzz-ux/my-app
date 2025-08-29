"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import "./SmartPlaceholder.css";

interface SmartPlaceholderProps {
  text?: string;
  type?: 'logo' | 'product' | 'banner' | 'avatar' | 'gallery';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  animated?: boolean;
  showText?: boolean;
  colorScheme?: 'brand' | 'neutral' | 'warm' | 'cool';
}

export function SmartPlaceholder({
  text,
  type = 'logo',
  size = 'md',
  className = "",
  animated = true,
  showText = true,
  colorScheme = 'brand'
}: SmartPlaceholderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Configuration des tailles
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
    full: "w-full h-full"
  };

  // Configuration des couleurs selon le schéma
  const colorSchemes = {
    brand: {
      primary: "from-pink-400 to-purple-500",
      secondary: "from-blue-400 to-cyan-500",
      accent: "from-yellow-400 to-orange-500"
    },
    neutral: {
      primary: "from-gray-300 to-gray-400",
      secondary: "from-gray-400 to-gray-500",
      accent: "from-gray-500 to-gray-600"
    },
    warm: {
      primary: "from-red-300 to-pink-400",
      secondary: "from-orange-300 to-red-400",
      accent: "from-yellow-300 to-orange-400"
    },
    cool: {
      primary: "from-blue-300 to-indigo-400",
      secondary: "from-cyan-300 to-blue-400",
      accent: "from-teal-300 to-cyan-400"
    }
  };

  const colors = colorSchemes[colorScheme];

  // Générer le placeholder selon le type
  const generatePlaceholder = () => {
    switch (type) {
      case 'logo':
        return (
          <div className={cn(
            "relative rounded-lg border-2 border-dashed overflow-hidden",
            sizeClasses[size],
            className
          )}>
            {/* Fond principal */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br",
              colors.primary,
              animated && "animate-pulse"
            )} />
            
            {/* Éléments décoratifs */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-1/2 h-1/2 bg-gradient-to-br rounded-full opacity-20",
                colors.secondary
              )} />
            </div>
            
            {/* Icône centrale */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-1/3 h-1/3 bg-white/80 rounded-full flex items-center justify-center",
                animated && "animate-bounce"
              )}>
                <svg className="w-1/2 h-1/2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        );

      case 'product':
        return (
          <div className={cn(
            "relative rounded-lg border overflow-hidden",
            sizeClasses[size],
            className
          )}>
            {/* Fond principal */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br",
              colors.primary,
              animated && "animate-pulse"
            )} />
            
            {/* Lignes de contenu simulées */}
            <div className="absolute inset-0 p-3 flex flex-col justify-end">
              <div className={cn(
                "w-full h-2 bg-white/60 rounded mb-2",
                animated && "animate-pulse"
              )} />
              <div className={cn(
                "w-3/4 h-2 bg-white/40 rounded",
                animated && "animate-pulse"
              )} />
            </div>
            
            {/* Badge de prix simulé */}
            <div className="absolute top-2 right-2">
              <div className={cn(
                "px-2 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-800",
                animated && "animate-pulse"
              )}>
                €XX
              </div>
            </div>
          </div>
        );

      case 'banner':
        return (
          <div className={cn(
            "relative rounded-lg border overflow-hidden",
            sizeClasses[size],
            className
          )}>
            {/* Fond principal */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r",
              colors.primary,
              animated && "animate-pulse"
            )} />
            
            {/* Motif de fond */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-dot-pattern" />
            </div>
            
            {/* Contenu central */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className={cn(
                  "w-16 h-2 bg-white/60 rounded mb-3 mx-auto",
                  animated && "animate-pulse"
                )} />
                <div className={cn(
                  "w-24 h-1 bg-white/40 rounded mx-auto",
                  animated && "animate-pulse"
                )} />
              </div>
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className={cn(
            "relative rounded-full border-2 border-dashed overflow-hidden",
            sizeClasses[size],
            className
          )}>
            {/* Fond principal */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br",
              colors.primary,
              animated && "animate-pulse"
            )} />
            
            {/* Silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/2 h-1/2 bg-white/80 rounded-full flex items-center justify-center">
                <svg className="w-1/2 h-1/2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className={cn(
            "relative rounded-lg border overflow-hidden",
            sizeClasses[size],
            className
          )}>
            {/* Fond principal */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br",
              colors.primary,
              animated && "animate-pulse"
            )} />
            
            {/* Grille de miniatures */}
            <div className="absolute inset-0 p-2 grid grid-cols-2 gap-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-white/30 rounded",
                    animated && "animate-pulse",
                    `animation-delay-${i * 100}`
                  )}
                />
              ))}
            </div>
            
            {/* Icône de galerie */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/3 bg-white/80 rounded-full flex items-center justify-center">
                <svg className="w-1/2 h-1/2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
                </svg>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Générer le texte du placeholder
  const generatePlaceholderText = () => {
    if (!showText || !text) return null;

    const defaultTexts = {
      logo: "Logo en cours de chargement...",
      product: "Image du produit en cours de chargement...",
      banner: "Bannière en cours de chargement...",
      avatar: "Avatar en cours de chargement...",
      gallery: "Galerie en cours de chargement..."
    };

    return (
      <div className="mt-2 text-center">
        <p className={cn(
          "text-xs text-muted-foreground",
          animated && "animate-pulse"
        )}>
          {text || defaultTexts[type]}
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      {generatePlaceholder()}
      {generatePlaceholderText()}
    </div>
  );
}

// Composant spécialisé pour les logos de marques
export function BrandLogoPlaceholder({
  size = "md",
  className = "",
  ...props
}: Omit<SmartPlaceholderProps, 'type'>) {
  return (
    <SmartPlaceholder
      {...props}
      type="logo"
      size={size}
      className={className}
      colorScheme="brand"
      showText={false}
    />
  );
}

// Composant spécialisé pour les images de produits
export function ProductImagePlaceholder({
  size = "md",
  className = "",
  ...props
}: Omit<SmartPlaceholderProps, 'type'>) {
  return (
    <SmartPlaceholder
      {...props}
      type="product"
      size={size}
      className={className}
      colorScheme="neutral"
      showText={false}
    />
  );
}

// Composant pour les placeholders de galerie
export function GalleryPlaceholder({
  size = "md",
  className = "",
  ...props
}: Omit<SmartPlaceholderProps, 'type'>) {
  return (
    <SmartPlaceholder
      {...props}
      type="gallery"
      size={size}
      className={className}
      colorScheme="cool"
      showText={false}
    />
  );
}
