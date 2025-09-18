/**
 * Composant HeaderNavigation - Menu principal desktop
 * Intègre les catégories dynamiques et le menu statique
 */

'use client'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { useNavigation } from '@/hooks/useNavigation'
import { NavigationItemMenu } from './NavigationItem'
import { CategoryDropdown } from './CategoryDropdown'
import { NavigationSkeleton } from './NavigationSkeleton'
import type { HeaderNavigationProps } from '@/lib/supabase/navigation-types'

export function HeaderNavigation({ 
  className,
  showStaticItems = true,
  showCategories = true,
  maxCategories = 6
}: HeaderNavigationProps) {
  const { 
    staticItems, 
    categories, 
    isLoading, 
    error 
  } = useNavigation()

  // Afficher le skeleton pendant le chargement
  if (isLoading) {
    return (
      <NavigationSkeleton 
        variant="desktop" 
        itemCount={showStaticItems && showCategories ? 8 : 4}
        className={className}
      />
    )
  }

  // Afficher un message d'erreur si nécessaire
  if (error) {
    return (
      <div className={cn('flex items-center space-x-4', className)}>
        <span className="text-sm text-muted-foreground">
          Erreur de chargement du menu
        </span>
      </div>
    )
  }

  // Limiter le nombre de catégories affichées
  const displayedCategories = showCategories 
    ? categories.slice(0, maxCategories)
    : []

  return (
    <NavigationMenu className={cn('hidden md:flex', className)}>
      <NavigationMenuList>
        {/* Menu statique */}
        {showStaticItems && staticItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationItemMenu item={item} />
          </NavigationMenuItem>
        ))}
        
        {/* Catégories dynamiques */}
        {showCategories && displayedCategories.map((category) => (
          <CategoryDropdown 
            key={category.id} 
            category={category}
            showCount={true}
          />
        ))}
        
        {/* Lien "Voir plus" si il y a plus de catégories */}
        {showCategories && categories.length > maxCategories && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="hover-lift focus-ring">
              Plus de catégories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-2 p-4 w-[300px]">
                <h4 className="text-sm font-semibold mb-2">Toutes les catégories</h4>
                <div className="space-y-1">
                  {categories.slice(maxCategories).map((category) => (
                    <NavigationMenuLink key={category.id} asChild>
                      <a
                        href={category.href}
                        className="flex items-center justify-between p-2 rounded-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="text-sm">{category.label}</span>
                        {category.productCount !== undefined && category.productCount > 0 && (
                          <span className="text-xs text-muted-foreground">
                            {category.productCount}
                          </span>
                        )}
                      </a>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/**
 * Variante simplifiée pour les petits écrans
 */
export function HeaderNavigationSimple({ 
  className,
  showStaticItems = true,
  showCategories = true,
  maxCategories = 4
}: HeaderNavigationProps) {
  const { 
    staticItems, 
    categories, 
    isLoading, 
    error 
  } = useNavigation()

  if (isLoading) {
    return (
      <NavigationSkeleton 
        variant="desktop" 
        itemCount={maxCategories + (showStaticItems ? 2 : 0)}
        className={className}
      />
    )
  }

  if (error) {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <span className="text-xs text-muted-foreground">
          Menu indisponible
        </span>
      </div>
    )
  }

  const displayedCategories = showCategories 
    ? categories.slice(0, maxCategories)
    : []

  return (
    <NavigationMenu className={cn('hidden lg:flex', className)}>
      <NavigationMenuList>
        {/* Menu statique réduit */}
        {showStaticItems && staticItems.slice(0, 2).map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationItemMenu item={item} />
          </NavigationMenuItem>
        ))}
        
        {/* Catégories principales uniquement */}
        {showCategories && displayedCategories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger className="hover-lift focus-ring">
              {category.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-2 p-4 w-[250px]">
                <NavigationMenuLink asChild>
                  <a
                    href={category.href}
                    className="block p-2 rounded-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <span className="text-sm font-medium">Voir tous les produits</span>
                  </a>
                </NavigationMenuLink>
                {category.children && category.children.length > 0 && (
                  <div className="border-t pt-2">
                    {category.children.slice(0, 3).map((subcategory) => (
                      <NavigationMenuLink key={subcategory.id} asChild>
                        <a
                          href={subcategory.href}
                          className="block p-1.5 rounded-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                          <span className="text-xs">{subcategory.label}</span>
                        </a>
                      </NavigationMenuLink>
                    ))}
                  </div>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

/**
 * Variante pour les écrans très larges
 */
export function HeaderNavigationWide({ 
  className,
  showStaticItems = true,
  showCategories = true
}: HeaderNavigationProps) {
  const { 
    staticItems, 
    categories, 
    isLoading, 
    error 
  } = useNavigation()

  if (isLoading) {
    return (
      <NavigationSkeleton 
        variant="desktop" 
        itemCount={staticItems.length + categories.length}
        className={className}
      />
    )
  }

  if (error) {
    return (
      <div className={cn('flex items-center space-x-4', className)}>
        <span className="text-sm text-muted-foreground">
          Erreur de chargement du menu
        </span>
      </div>
    )
  }

  return (
    <NavigationMenu className={cn('hidden xl:flex', className)}>
      <NavigationMenuList>
        {/* Menu statique complet */}
        {showStaticItems && staticItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationItemMenu item={item} />
          </NavigationMenuItem>
        ))}
        
        {/* Toutes les catégories */}
        {showCategories && categories.map((category) => (
          <CategoryDropdown 
            key={category.id} 
            category={category}
            showCount={true}
            showImage={true}
          />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
