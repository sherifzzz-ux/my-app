/**
 * Composant NavigationDemo - Démonstration complète de la navigation
 * Teste tous les composants de navigation créés
 */

'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HeaderWithNavigation } from './HeaderWithNavigation'
import { HeaderNavigation } from './HeaderNavigation'
import { MobileMenu } from './MobileMenu'
import { CategoryDropdown } from './CategoryDropdown'
import { NavigationItem } from './NavigationItem'
import { NavigationSkeleton } from './NavigationSkeleton'
import { useNavigation } from '@/hooks/useNavigation'
import { 
  Monitor, 
  Smartphone, 
  Menu, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react'

export function NavigationDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { categories, isLoading, error } = useNavigation()

  return (
    <div className="space-y-8">
      {/* En-tête de démonstration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 text-success mr-2" />
            Navigation Complète - Démonstration
          </CardTitle>
          <CardDescription>
            Test de tous les composants de navigation créés
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Types TypeScript</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Fonctions Supabase</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Hooks personnalisés</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Composants de base</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Menu desktop</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm">Menu mobile</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Header complet */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Monitor className="h-5 w-5 mr-2" />
            Header Complet avec Navigation
          </CardTitle>
          <CardDescription>
            Header avec logo, navigation, recherche et actions utilisateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <HeaderWithNavigation />
          </div>
        </CardContent>
      </Card>

      {/* Navigation desktop seule */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Desktop</CardTitle>
          <CardDescription>
            Menu horizontal avec dropdowns pour les catégories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4">
            <HeaderNavigation />
          </div>
        </CardContent>
      </Card>

      {/* Test des catégories */}
      <Card>
        <CardHeader>
          <CardTitle>Test des Catégories</CardTitle>
          <CardDescription>
            Affichage des catégories récupérées depuis Supabase
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Chargement des catégories...</span>
              </div>
              <NavigationSkeleton variant="dropdown" itemCount={3} />
            </div>
          ) : error ? (
            <div className="flex items-center space-x-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Erreur: {error}</span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">
                  {categories.length} catégorie{categories.length > 1 ? 's' : ''} chargée{categories.length > 1 ? 's' : ''}
                </span>
              </div>
              
              {/* Affichage des catégories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.slice(0, 6).map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">{category.label}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {category.href}
                    </p>
                    {category.productCount !== undefined && (
                      <Badge variant="secondary" className="text-xs">
                        {category.productCount} produit{category.productCount > 1 ? 's' : ''}
                      </Badge>
                    )}
                    {category.children && category.children.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground">
                          {category.children.length} sous-catégorie{category.children.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test du menu mobile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2" />
            Menu Mobile
          </CardTitle>
          <CardDescription>
            Menu hamburger avec navigation verticale et accordéons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="hover-lift focus-ring"
            >
              <Menu className="h-4 w-4 mr-2" />
              Ouvrir le menu mobile
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Cliquez sur le bouton pour tester le menu mobile avec accordéons pour les catégories.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Menu mobile */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </div>
  )
}
