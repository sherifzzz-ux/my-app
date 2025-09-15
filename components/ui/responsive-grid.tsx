import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const gridVariants = cva('grid gap-4', {
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

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, variant, gap, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ variant, gap }), className)}
        {...props}
      />
    )
  }
)
Grid.displayName = 'Grid'

export { Grid, gridVariants }


