/**
 * Composant MobileMenu - Menu mobile avec hamburger
 * Utilise Sheet de shadcn/ui pour une expérience mobile optimale
 */

'use client'

import { useState } from 'react'
import { X, Search, Heart, ShoppingBag, User, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useNavigation } from '@/hooks/useNavigation'
import { NavigationItemList } from './NavigationItem'
import { NavigationSkeleton } from './NavigationSkeleton'
import type { MobileMenuProps } from '@/lib/supabase/navigation-types'

export function MobileMenu({ 
  isOpen, 
  onClose, 
  className 
}: MobileMenuProps) {
  const { 
    staticItems, 
    categories, 
    isLoading, 
    error 
  } = useNavigation()
  
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories)
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId)
    } else {
      newOpenCategories.add(categoryId)
    }
    setOpenCategories(newOpenCategories)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className={cn("w-[300px] sm:w-[400px]", className)}>
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">FB</span>
            </div>
            <span>Flawless Beauty</span>
          </SheetTitle>
          <SheetDescription>
            Naviguez dans notre catalogue de produits
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Barre de recherche mobile */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Menu statique */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Navigation
            </h3>
            {staticItems.map((item) => (
              <NavigationItemList 
                key={item.href}
                item={item}
                showIcon={true}
              />
            ))}
          </div>

          {/* Catégories */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Catégories
            </h3>
            
            {isLoading ? (
              <NavigationSkeleton variant="mobile" itemCount={6} />
            ) : error ? (
              <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Erreur de chargement des catégories
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {categories.map((category) => (
                  <Collapsible 
                    key={category.id}
                    open={openCategories.has(category.id)}
                    onOpenChange={() => toggleCategory(category.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-2 h-auto hover:bg-accent hover:text-accent-foreground"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{category.label}</span>
                          {category.productCount !== undefined && category.productCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {category.productCount}
                            </Badge>
                          )}
                        </div>
                        <ChevronRight 
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openCategories.has(category.id) && "rotate-90"
                          )}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="space-y-1">
                      <div className="ml-4 space-y-1">
                        {/* Lien vers la catégorie principale */}
                        <NavigationItemList 
                          item={{
                            label: "Voir tous les produits",
                            href: category.href,
                            icon: "Package"
                          }}
                          showIcon={true}
                        />
                        
                        {/* Sous-catégories */}
                        {category.children && category.children.length > 0 && (
                          <>
                            <div className="border-t pt-2 mt-2">
                              {category.children.map((subcategory) => (
                                <NavigationItemList 
                                  key={subcategory.id}
                                  item={subcategory}
                                  showIcon={false}
                                  showCount={true}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>

          {/* Actions utilisateur */}
          <div className="space-y-1 pt-4 border-t">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Mon compte
            </h3>
            <div className="space-y-1">
              <NavigationItemList 
                item={{
                  label: "Favoris",
                  href: "/favoris",
                  icon: "Heart"
                }}
                showIcon={true}
              />
              <NavigationItemList 
                item={{
                  label: "Panier",
                  href: "/panier",
                  icon: "ShoppingBag"
                }}
                showIcon={true}
              />
              <NavigationItemList 
                item={{
                  label: "Mon compte",
                  href: "/compte",
                  icon: "User"
                }}
                showIcon={true}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

/**
 * Variante simplifiée pour les petits écrans
 */
export function MobileMenuSimple({ 
  isOpen, 
  onClose, 
  className 
}: MobileMenuProps) {
  const { 
    staticItems, 
    categories, 
    isLoading, 
    error 
  } = useNavigation()

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className={cn("w-[280px]", className)}>
        <SheetHeader>
          <SheetTitle className="text-lg">Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Menu statique */}
          <div className="space-y-1">
            {staticItems.map((item) => (
              <NavigationItemList 
                key={item.href}
                item={item}
                showIcon={true}
              />
            ))}
          </div>

          {/* Catégories principales */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Catégories
            </h3>
            {isLoading ? (
              <NavigationSkeleton variant="mobile" itemCount={4} />
            ) : error ? (
              <p className="text-sm text-muted-foreground">
                Erreur de chargement
              </p>
            ) : (
              categories.slice(0, 6).map((category) => (
                <NavigationItemList 
                  key={category.id}
                  item={category}
                  showIcon={false}
                  showCount={true}
                />
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
