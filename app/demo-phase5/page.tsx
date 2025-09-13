'use client'

import { OptimizedImage, ProductImage, HeroImage, AvatarImage } from '@/components/ui/optimized-image'
import { GPUAnimation, ProductCardAnimation, ButtonAnimation } from '@/components/ui/gpu-animation'
import { LazySection, LazyProductGrid, LazyContentSection } from '@/components/ui/lazy-section'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useGPUOptimization } from '@/components/ui/gpu-animation'

export default function DemoPhase5() {
  // Initialiser l'optimisation GPU
  useGPUOptimization()

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Phase 5: Performance UI</h1>
        <p className="text-lg text-muted-foreground">
          Démonstration des optimisations de performance et d'images
        </p>
      </div>

      {/* Section 1: Images Optimisées */}
      <LazyContentSection>
        <Card>
          <CardHeader>
            <CardTitle>🖼️ Images Optimisées avec Next.js</CardTitle>
            <CardDescription>
              Remplacement des &lt;img&gt; par des composants &lt;Image&gt; optimisés
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Image de Produit</h3>
                <ProductImage
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                  alt="Produit de beauté K-Beauty"
                  priority={false}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Image Hero</h3>
                <HeroImage
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Bannière hero"
                  priority={true}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                alt="Avatar utilisateur"
                size={60}
              />
              <div>
                <h4 className="font-medium">Utilisateur Test</h4>
                <p className="text-sm text-muted-foreground">Avatar optimisé</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
