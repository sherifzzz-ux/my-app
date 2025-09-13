// Design System Constants - Flawless Beauty
// Système d'espacement cohérent

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const

export const sectionSpacing = {
  sm: 'py-8 md:py-12',      // Sections petites
  md: 'py-12 md:py-16',     // Sections moyennes
  lg: 'py-16 md:py-24',     // Sections grandes
  xl: 'py-20 md:py-32',     // Sections très grandes
} as const

export const containerSpacing = {
  sm: 'px-4 md:px-6',       // Conteneurs petits
  md: 'px-6 md:px-8',       // Conteneurs moyens
  lg: 'px-8 md:px-12',      // Conteneurs grands
} as const

// Classes utilitaires pour les espacements
export const spacingClasses = {
  // Padding
  p: {
    xs: 'p-2',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  },
  // Margin
  m: {
    xs: 'm-2',
    sm: 'm-3',
    md: 'm-4',
    lg: 'm-6',
    xl: 'm-8',
  },
  // Gap
  gap: {
    xs: 'gap-2',
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  },
} as const

// Classes pour les grilles responsive
export const gridClasses = {
  // Grilles produits
  productGrid: 'grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
  // Grilles catégories
  categoryGrid: 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  // Grilles marques
  brandGrid: 'grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  // Grilles cartes
  cardGrid: 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
} as const

// Classes pour les conteneurs
export const containerClasses = {
  // Conteneur principal
  main: 'mx-auto max-w-7xl px-4 md:px-6',
  // Conteneur large
  wide: 'mx-auto max-w-8xl px-4 md:px-8',
  // Conteneur étroit
  narrow: 'mx-auto max-w-4xl px-4 md:px-6',
} as const

// Classes pour les sections
export const sectionClasses = {
  // Section standard
  standard: 'py-12 md:py-16',
  // Section petite
  small: 'py-8 md:py-12',
  // Section grande
  large: 'py-16 md:py-24',
  // Section héro
  hero: 'py-20 md:py-32',
} as const

// Classes pour les boutons
export const buttonClasses = {
  // Boutons principaux
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  // Boutons secondaires
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  // Boutons outline
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  // Boutons ghost
  ghost: 'hover:bg-accent hover:text-accent-foreground',
} as const

// Classes pour les cartes
export const cardClasses = {
  // Carte standard
  standard: 'rounded-lg border bg-card text-card-foreground shadow-sm',
  // Carte interactive
  interactive: 'rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow',
  // Carte produit
  product: 'rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-all duration-200',
} as const

// Classes pour les animations
export const animationClasses = {
  // Transitions douces
  smooth: 'transition-all duration-300 ease-out',
  // Transitions rapides
  fast: 'transition-all duration-200 ease-out',
  // Hover effects
  hover: 'hover:scale-105 hover:shadow-lg transition-transform duration-200',
  // Focus effects
  focus: 'focus:ring-2 focus:ring-primary focus:ring-offset-2',
} as const

// Classes pour les états
export const stateClasses = {
  // États de chargement
  loading: 'animate-pulse',
  // États d'erreur
  error: 'border-destructive text-destructive',
  // États de succès
  success: 'border-success text-success',
  // États d'avertissement
  warning: 'border-gold text-gold',
} as const
