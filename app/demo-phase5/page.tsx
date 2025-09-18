'use client'

import { OptimizedImage, ProductImage, HeroImage, AvatarImage } from '@/components/ui/optimized-image'
import { GPUAnimation, ProductCardAnimation, ButtonAnimation } from '@/components/ui/gpu-animation'
import { LazySection, LazyProductGrid, LazyContentSection } from '@/components/ui/lazy-section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductGridSkeleton, CategoryGridSkeleton, FormSkeleton } from '@/components/ui/skeleton-specialized'
import { ImageOptimizationDemo } from '@/components/ui/ImageOptimizationDemo'
import { MicroInteractionsDemo } from '@/components/ui/MicroInteractionsDemo'
import { FormValidationDemo } from '@/components/ui/FormValidationDemo'
import { PerformanceOptimizationDemo } from '@/components/ui/PerformanceOptimizationDemo'
import { FooterNavigationDemo } from '@/components/ui/FooterNavigationDemo'
import { NavigationDemo } from '@/components/navigation/NavigationDemo'
import { useGPUOptimization } from '@/components/ui/gpu-animation'
import { useState, useEffect } from 'react'

export default function DemoPhase5() {
  // Initialiser l'optimisation GPU
  useGPUOptimization()
  
  // État pour démontrer les skeletons
  const [isLoading, setIsLoading] = useState(true)
  
  // Simuler un chargement
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Phase 5: Performance UI</h1>
        <p className="text-lg text-muted-foreground">
          Démonstration des optimisations de performance et d'images
        </p>
        <Button 
          onClick={() => setIsLoading(!isLoading)}
          variant="outline"
        >
          {isLoading ? 'Arrêter le chargement' : 'Démarrer le chargement'}
        </Button>
      </div>

      {/* Section 0: Démonstration des Skeletons */}
      <Card>
        <CardHeader>
          <CardTitle>💀 États de Chargement - Skeletons</CardTitle>
          <CardDescription>
            Démonstration des composants Skeleton pour améliorer l'UX pendant le chargement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {isLoading ? (
            <>
              <div>
                <h3 className="text-lg font-semibold mb-4">Grille de Produits</h3>
                <ProductGridSkeleton count={6} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Grille de Catégories</h3>
                <CategoryGridSkeleton count={4} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Formulaire</h3>
                <FormSkeleton fields={3} />
              </div>
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Contenu chargé ! 🎉</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Section 1: Images Optimisées */}
      <LazyContentSection>
        <ImageOptimizationDemo />
      </LazyContentSection>

      {/* Section 1.5: Micro-interactions */}
      <LazyContentSection>
        <MicroInteractionsDemo />
      </LazyContentSection>

      {/* Section 1.6: Formulaires avec validation */}
      <LazyContentSection>
        <FormValidationDemo />
      </LazyContentSection>

      {/* Section 1.7: Optimisations de performance */}
      <LazyContentSection>
        <PerformanceOptimizationDemo />
      </LazyContentSection>

      {/* Section 1.8: Correction du footer mobile */}
      <LazyContentSection>
        <FooterNavigationDemo />
      </LazyContentSection>

      {/* Section 1.9: Navigation complète */}
      <LazyContentSection>
        <NavigationDemo />
      </LazyContentSection>

      {/* Section 2: Animations GPU-Accelerated */}
      <LazyContentSection>
        <Card>
          <CardHeader>
            <CardTitle>⚡ Animations GPU-Accelerated</CardTitle>
            <CardDescription>
              Animations optimisées pour les performances avec GPU acceleration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GPUAnimation animation="fade" duration={500}>
                <Card className="p-4 text-center">
                  <h4 className="font-semibold mb-2">Fade In</h4>
                  <p className="text-sm text-muted-foreground">Animation fade optimisée</p>
                </Card>
              </GPUAnimation>

              <GPUAnimation animation="slide" duration={600} delay={200}>
                <Card className="p-4 text-center">
                  <h4 className="font-semibold mb-2">Slide Up</h4>
                  <p className="text-sm text-muted-foreground">Animation slide optimisée</p>
                </Card>
              </GPUAnimation>

              <GPUAnimation animation="scale" duration={400} delay={400}>
                <Card className="p-4 text-center">
                  <h4 className="font-semibold mb-2">Scale In</h4>
                  <p className="text-sm text-muted-foreground">Animation scale optimisée</p>
                </Card>
              </GPUAnimation>
            </div>

            <div className="flex space-x-4">
              <ButtonAnimation>
                <Button variant="default">Bouton Animé</Button>
              </ButtonAnimation>
              <ButtonAnimation>
                <Button variant="outline">Hover Effect</Button>
              </ButtonAnimation>
            </div>
          </CardContent>
        </Card>
      </LazyContentSection>

      {/* Section 3: Lazy Loading avec Intersection Observer */}
      <Card>
        <CardHeader>
          <CardTitle>🔍 Lazy Loading Optimisé</CardTitle>
          <CardDescription>
            Chargement différé avec Intersection Observer pour de meilleures performances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LazyProductGrid>
            <div className="product-grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductCardAnimation key={i}>
                  <Card className="overflow-hidden">
                    <ProductImage
                      src={`https://images.unsplash.com/photo-${1596462502278 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80`}
                      alt={`Produit ${i + 1}`}
                      className="w-full h-48"
                    />
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-1">Produit {i + 1}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Description du produit {i + 1}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">En stock</Badge>
                        <span className="font-bold">29.99€</span>
                      </div>
                    </CardContent>
                  </Card>
                </ProductCardAnimation>
              ))}
            </div>
          </LazyProductGrid>
        </CardContent>
      </Card>

      {/* Section 4: Bundle Optimization */}
      <LazyContentSection>
        <Card>
          <CardHeader>
            <CardTitle>📦 Bundle Optimization</CardTitle>
            <CardDescription>
              Optimisations pour réduire la taille du bundle et améliorer les performances
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold">✅ Optimisations Appliquées</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="text-success">✓</span>
                    <span>Images Next.js avec lazy loading</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-success">✓</span>
                    <span>Animations GPU-accelerated</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-success">✓</span>
                    <span>Intersection Observer pour lazy loading</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-success">✓</span>
                    <span>CSS optimisé avec will-change</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">📊 Bénéfices Attendus</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">→</span>
                    <span>+30% vitesse de chargement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">→</span>
                    <span>Meilleur score Lighthouse</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">→</span>
                    <span>Animations plus fluides</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-primary">→</span>
                    <span>Moins d'utilisation mémoire</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </LazyContentSection>

      {/* Section 5: Performance Metrics */}
      <LazyContentSection>
        <Card>
          <CardHeader>
            <CardTitle>📈 Métriques de Performance</CardTitle>
            <CardDescription>
              Indicateurs de performance et optimisations appliquées
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">96s</div>
                <div className="text-sm text-muted-foreground">Build Time</div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-success">0</div>
                <div className="text-sm text-muted-foreground">Erreurs de Build</div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-accent">Phase 5</div>
                <div className="text-sm text-muted-foreground">Performance UI</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </LazyContentSection>
    </div>
  )
}
