'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Progress } from './progress'
import { Separator } from './separator'
import { 
  Zap, 
  Database, 
  Image, 
  Code, 
  Globe, 
  Smartphone, 
  Monitor,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react'

export function PerformanceOptimizationDemo() {
  const performanceMetrics = [
    {
      category: 'Images',
      score: 95,
      status: 'excellent',
      improvements: [
        'Lazy loading implémenté',
        'Images optimisées avec Next.js',
        'Placeholder blur ajouté',
        'Formats WebP supportés'
      ]
    },
    {
      category: 'CSS & JavaScript',
      score: 88,
      status: 'good',
      improvements: [
        'Tree-shaking activé',
        'Code splitting par route',
        'Composants lazy-loaded',
        'Bundle size optimisé'
      ]
    },
    {
      category: 'Réseau',
      score: 92,
      status: 'excellent',
      improvements: [
        'CDN configuré',
        'Compression gzip activée',
        'Cache headers optimisés',
        'HTTP/2 supporté'
      ]
    },
    {
      category: 'Accessibilité',
      score: 85,
      status: 'good',
      improvements: [
        'Focus states visibles',
        'Contrastes WCAG AA',
        'Navigation clavier',
        'Alt texts complets'
      ]
    },
    {
      category: 'Mobile',
      score: 90,
      status: 'excellent',
      improvements: [
        'Responsive design',
        'Touch targets optimisés',
        'Viewport configuré',
        'Performance mobile'
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-success'
      case 'good': return 'text-primary'
      case 'warning': return 'text-accent'
      case 'error': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-success" />
      case 'good': return <CheckCircle className="h-4 w-4 text-primary" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-accent" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-destructive" />
      default: return <Info className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Métriques de performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Métriques de Performance
          </CardTitle>
          <CardDescription>
            Scores de performance Lighthouse et optimisations implémentées
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold">{metric.category}</h4>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Score</span>
                      <span className={`font-bold ${getStatusColor(metric.status)}`}>
                        {metric.score}/100
                      </span>
                    </div>
                    <Progress value={metric.score} className="h-2" />
                    <div className="space-y-1">
                      {metric.improvements.map((improvement, i) => (
                        <div key={i} className="flex items-center text-xs text-muted-foreground">
                          <CheckCircle className="h-3 w-3 text-success mr-2" />
                          {improvement}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Optimisations techniques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2 text-primary" />
            Optimisations Techniques
          </CardTitle>
          <CardDescription>
            Techniques avancées pour améliorer les performances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Images */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Optimisation des Images</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Lazy Loading</span>
                  <Badge variant="secondary">Activé</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">WebP Format</span>
                  <Badge variant="secondary">Supporté</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Placeholder Blur</span>
                  <Badge variant="secondary">Implémenté</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Responsive Images</span>
                  <Badge variant="secondary">Configuré</Badge>
                </div>
              </div>
            </div>

            {/* Bundle */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Optimisation du Bundle</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Tree Shaking</span>
                  <Badge variant="secondary">Activé</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Code Splitting</span>
                  <Badge variant="secondary">Par Route</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Lazy Components</span>
                  <Badge variant="secondary">Implémenté</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm">Minification</span>
                  <Badge variant="secondary">Production</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive et Mobile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Smartphone className="h-5 w-5 mr-2 text-primary" />
            Optimisations Mobile
          </CardTitle>
          <CardDescription>
            Améliorations spécifiques pour les appareils mobiles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Smartphone className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Mobile First</h4>
              <p className="text-sm text-muted-foreground">
                Design optimisé pour mobile avec breakpoints adaptatifs
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">Touch Targets</h4>
              <p className="text-sm text-muted-foreground">
                Boutons et liens optimisés pour la navigation tactile
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold">PWA Ready</h4>
              <p className="text-sm text-muted-foreground">
                Prêt pour les Progressive Web Apps avec service workers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommandations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-accent" />
            Recommandations d'Amélioration
          </CardTitle>
          <CardDescription>
            Actions supplémentaires pour optimiser davantage les performances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 border border-accent/20 bg-accent/5 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-accent">Service Worker</h4>
                <p className="text-sm text-muted-foreground">
                  Implémenter un service worker pour la mise en cache et les fonctionnalités offline
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border border-accent/20 bg-accent/5 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-accent">Critical CSS</h4>
                <p className="text-sm text-muted-foreground">
                  Extraire le CSS critique pour améliorer le First Contentful Paint
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 border border-accent/20 bg-accent/5 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-semibold text-accent">Preloading</h4>
                <p className="text-sm text-muted-foreground">
                  Précharger les ressources critiques et les routes importantes
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
