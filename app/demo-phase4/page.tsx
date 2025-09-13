import { Metadata } from 'next'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Section } from '@/components/ui/section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormField } from '@/components/ui/form-field'
import { FormGroup } from '@/components/ui/form-group'
import { Progress } from '@/components/ui/progress'
import { Skeleton, SkeletonText, SkeletonTitle, SkeletonAvatar } from '@/components/ui/skeleton'
import { ProductCardSkeleton, CategoryCardSkeleton, ListSkeleton } from '@/components/ui/skeleton-specialized'

export const metadata: Metadata = {
  title: 'Démonstration Phase 4 - Formulaires & Interactions',
  description: 'Démonstration des améliorations de la Phase 4 : Formulaires, micro-interactions, états de chargement et notifications.',
}

export default function DemoPhase4Page() {
  return (
    <div className="container-responsive">
      <Section spacing="lg" container={false}>
        <div className="text-center mb-8">
          <Heading level={1}>Phase 4 : Formulaires & Interactions</Heading>
          <Text variant="lead" className="max-w-3xl mx-auto">
            Découvrez les nouvelles améliorations : composants de formulaire, micro-interactions, 
            états de chargement et système de notifications.
          </Text>
        </div>
      </Section>

      {/* Micro-interactions */}
      <Section spacing="default" container={false}>
        <Heading level={2}>Micro-interactions</Heading>
        <Text variant="body" className="mb-6">
          Effets visuels subtils pour améliorer l'expérience utilisateur.
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg text-center hover-lift">
            <Heading level={4}>Hover Lift</Heading>
            <Text variant="body-sm">Effet de soulèvement au survol</Text>
          </div>
          
          <div className="p-6 border rounded-lg text-center hover-glow">
            <Heading level={4}>Hover Glow</Heading>
            <Text variant="body-sm">Effet de lueur au survol</Text>
          </div>
          
          <div className="p-6 border rounded-lg text-center hover-scale">
            <Heading level={4}>Hover Scale</Heading>
            <Text variant="body-sm">Effet d'agrandissement au survol</Text>
          </div>
        </div>
      </Section>

      {/* Composants de formulaire */}
      <Section spacing="default" container={false}>
        <Heading level={2}>Composants de formulaire</Heading>
        <Text variant="body" className="mb-6">
          Formulaires améliorés avec validation visuelle et feedback utilisateur.
        </Text>
        
        <div className="max-w-2xl">
          <FormGroup title="Informations personnelles" description="Remplissez vos informations de base">
            <FormField label="Nom complet" required>
              <Input placeholder="Votre nom complet" className="focus-ring" />
            </FormField>
            
            <FormField label="Email" required>
              <Input type="email" placeholder="votre@email.com" className="focus-ring" />
            </FormField>
            
            <FormField 
              label="Mot de passe" 
              required
              error="Le mot de passe doit contenir au moins 8 caractères"
            >
              <Input type="password" placeholder="••••••••" className="form-field-error focus-ring" />
            </FormField>
            
            <FormField 
              label="Confirmer le mot de passe" 
              success="Les mots de passe correspondent"
            >
              <Input type="password" placeholder="••••••••" className="form-field-success focus-ring" />
            </FormField>
          </FormGroup>
        </div>
      </Section>

      {/* Barres de progression */}
      <Section spacing="default" container={false}>
        <Heading level={2}>Barres de progression</Heading>
        <Text variant="body" className="mb-6">
          Indicateurs visuels pour suivre l'avancement des tâches.
        </Text>
        
        <div className="space-y-6 max-w-2xl">
          <Progress 
            value={75} 
            max={100} 
            label="Progression générale" 
            showValue 
            variant="primary"
          />
          
          <Progress 
            value={100} 
            max={100} 
            label="Profil complété" 
            showValue 
            variant="success"
          />
          
          <Progress 
            value={45} 
            max={100} 
            label="Formation en cours" 
            showValue 
            variant="warning"
          />
        </div>
      </Section>

      {/* États de chargement */}
      <Section spacing="default" container={false}>
        <Heading level={2}>États de chargement</Heading>
        <Text variant="body" className="mb-6">
          Skeletons et animations de chargement pour améliorer la perception de performance.
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeleton basique */}
          <div className="space-y-3">
            <Heading level={4}>Skeleton basique</Heading>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          
          {/* Skeleton avatar */}
          <div className="space-y-3">
            <Heading level={4}>Skeleton avatar</Heading>
            <div className="flex items-center space-x-3">
              <SkeletonAvatar size="md" />
              <div className="space-y-2">
                <SkeletonTitle />
                <SkeletonText lines={2} />
              </div>
            </div>
          </div>
          
          {/* Skeleton carte produit */}
          <div className="space-y-3">
            <Heading level={4}>Skeleton carte produit</Heading>
            <ProductCardSkeleton />
          </div>
        </div>
      </Section>

      {/* Grilles de skeleton */}
      <Section spacing="default" container={false}>
        <Heading level={2}>Grilles de skeleton</Heading>
        <Text variant="body" className="mb-6">
          États de chargement pour les grilles de produits et catégories.
        </Text>
        
        <div className="space-y-8">
          <div>
            <Heading level={4}>Grille de produits</Heading>
            <div className="product-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
          
          <div>
            <Heading level={4}>Grille de catégories</Heading>
            <div className="category-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </div>
          </div>
          
          <div>
            <Heading level={4}>Liste avec avatars</Heading>
            <ListSkeleton count={4} showAvatar />
          </div>
        </div>
      </Section>

      {/* Call to action */}
      <Section background="primary" container={false} className="rounded-lg text-center">
        <Heading level={3} className="mb-4">Phase 4 Terminée !</Heading>
        <Text variant="body" className="mb-6">
          Tous les composants de formulaires et interactions sont maintenant optimisés 
          avec des micro-interactions, états de chargement et feedback utilisateur.
        </Text>
        <Button size="lg" className="hover-scale">
          Continuer vers la Phase 5
        </Button>
      </Section>
    </div>
  )
}
