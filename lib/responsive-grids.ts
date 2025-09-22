import { cva } from 'class-variance-authority'

// Système de grilles responsive optimisées
export const gridVariants = cva('grid gap-4', {
  variants: {
    variant: {
      // Grille produits - optimisée pour l'e-commerce
      products: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
      // Grille marques - plus compacte
      brands: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8',
      // Grille catégories - équilibrée
      categories: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      // Grille cartes - pour les contenus variés
      cards: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      // Grille navigation - pour les liens
      navigation: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
    },
    gap: {
      sm: 'gap-2',
      default: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
    },
  },
  defaultVariants: {
    variant: 'products',
    gap: 'default',
  },
})

// Classes utilitaires pour les touch targets
export const touchTargetVariants = cva('', {
  variants: {
    size: {
      sm: 'min-h-[36px] min-w-[36px]', // Minimum pour les petits boutons
      default: 'min-h-[44px] min-w-[44px]', // Apple HIG standard
      lg: 'min-h-[48px] min-w-[48px]', // Pour les boutons importants
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

// Classes pour les boutons mobiles optimisés
export const mobileButtonVariants = cva('', {
  variants: {
    size: {
      sm: 'h-10 px-4 text-sm', // Mobile small
      default: 'h-12 px-6 text-base', // Mobile standard
      lg: 'h-14 px-8 text-lg', // Mobile large
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

// Classes pour la typographie mobile
export const mobileTextVariants = cva('', {
  variants: {
    variant: {
      body: 'text-base leading-relaxed', // 16px minimum pour la lisibilité
      heading: 'text-xl font-semibold', // Titres plus lisibles sur mobile
      caption: 'text-sm leading-normal', // Légendes
      small: 'text-xs leading-normal', // Très petit texte
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

// Classes pour les espacements responsive
export const responsiveSpacingVariants = cva('', {
  variants: {
    variant: {
      section: 'py-8 md:py-12 lg:py-16', // Espacement standard entre sections
      sectionSm: 'py-6 md:py-8 lg:py-10', // Espacement réduit
      sectionLg: 'py-12 md:py-16 lg:py-20', // Espacement large
      container: 'px-4 md:px-6 lg:px-8', // Padding horizontal des conteneurs
    },
  },
  defaultVariants: {
    variant: 'section',
  },
})









