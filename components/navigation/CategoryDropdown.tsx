/**
 * Composant CategoryDropdown - Dropdown pour les catégories
 * Utilise NavigationMenu de shadcn/ui pour une expérience utilisateur optimale
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, Package } from 'lucide-react'
import type { CategoryDropdownProps } from '@/lib/supabase/navigation-types'

export function CategoryDropdown({ 
  category, 
  className,
  showImage = true,
  showCount = true
}: CategoryDropdownProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn('hover-lift focus-ring', className)}>
        {category.label}
        {showCount && category.productCount !== undefined && category.productCount > 0 && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {category.productCount}
          </Badge>
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 w-[400px]">
          {/* En-tête de la catégorie */}
          <div className="flex items-center space-x-3 pb-3 border-b">
            {showImage && category.imageUrl && (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={category.imageUrl}
                  alt={category.label}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="text-sm font-semibold">{category.label}</h4>
              <p className="text-xs text-muted-foreground">
                {category.productCount !== undefined 
                  ? `${category.productCount} produit${category.productCount > 1 ? 's' : ''}`
                  : 'Découvrez nos produits'
                }
              </p>
            </div>
          </div>

          {/* Lien vers la catégorie principale */}
          <NavigationMenuLink asChild>
            <Link
              href={category.href}
              className={cn(
                'flex items-center space-x-2 p-3 rounded-md transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground'
              )}
            >
              <Package className="h-4 w-4" />
              <span className="text-sm font-medium">
                Voir tous les produits
              </span>
              <ChevronRight className="h-3 w-3 ml-auto" />
            </Link>
          </NavigationMenuLink>

          {/* Sous-catégories */}
          {category.children && category.children.length > 0 && (
            <div className="space-y-1">
              <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Sous-catégories
              </h5>
              <div className="space-y-1">
                {category.children.map((subcategory) => (
                  <NavigationMenuLink key={subcategory.id} asChild>
                    <Link
                      href={subcategory.href}
                      className={cn(
                        'flex items-center justify-between p-2 rounded-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:bg-accent focus:text-accent-foreground'
                      )}
                    >
                      <span className="text-sm">{subcategory.label}</span>
                      {showCount && subcategory.productCount !== undefined && subcategory.productCount > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {subcategory.productCount}
                        </Badge>
                      )}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </div>
          )}

          {/* Message si pas de sous-catégories */}
          {(!category.children || category.children.length === 0) && (
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground">
                Aucune sous-catégorie disponible
              </p>
            </div>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

/**
 * Variante simplifiée pour les petits écrans
 */
export function CategoryDropdownSimple({ 
  category, 
  className,
  showCount = true
}: CategoryDropdownProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className={cn('hover-lift focus-ring', className)}>
        {category.label}
        {showCount && category.productCount !== undefined && category.productCount > 0 && (
          <Badge variant="secondary" className="ml-2 text-xs">
            {category.productCount}
          </Badge>
        )}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-2 p-4 w-[300px]">
          {/* Lien vers la catégorie principale */}
          <NavigationMenuLink asChild>
            <Link
              href={category.href}
              className={cn(
                'flex items-center space-x-2 p-2 rounded-md transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground'
              )}
            >
              <Package className="h-4 w-4" />
              <span className="text-sm">Tous les produits</span>
            </Link>
          </NavigationMenuLink>

          {/* Sous-catégories */}
          {category.children && category.children.length > 0 && (
            <>
              <div className="border-t pt-2">
                {category.children.map((subcategory) => (
                  <NavigationMenuLink key={subcategory.id} asChild>
                    <Link
                      href={subcategory.href}
                      className={cn(
                        'block p-2 rounded-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        'focus:bg-accent focus:text-accent-foreground'
                      )}
                    >
                      <span className="text-sm">{subcategory.label}</span>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </>
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

/**
 * Variante pour les listes (sans dropdown)
 */
export function CategoryList({ 
  category, 
  className,
  showCount = true
}: CategoryDropdownProps) {
  return (
    <div className={cn('space-y-1', className)}>
      <Link
        href={category.href}
        className={cn(
          'flex items-center justify-between p-2 rounded-md transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus:bg-accent focus:text-accent-foreground'
        )}
      >
        <span className="text-sm font-medium">{category.label}</span>
        {showCount && category.productCount !== undefined && category.productCount > 0 && (
          <Badge variant="secondary" className="text-xs">
            {category.productCount}
          </Badge>
        )}
      </Link>
      
      {/* Sous-catégories */}
      {category.children && category.children.length > 0 && (
        <div className="ml-4 space-y-1">
          {category.children.map((subcategory) => (
            <Link
              key={subcategory.id}
              href={subcategory.href}
              className={cn(
                'flex items-center justify-between p-1.5 rounded-sm transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'focus:bg-accent focus:text-accent-foreground'
              )}
            >
              <span className="text-xs">{subcategory.label}</span>
              {showCount && subcategory.productCount !== undefined && subcategory.productCount > 0 && (
                <Badge variant="outline" className="text-xs">
                  {subcategory.productCount}
                </Badge>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
