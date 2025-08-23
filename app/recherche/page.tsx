import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recherche - FlawlessBeauty',
  description: 'Recherchez parmi notre large sélection de produits de beauté premium.',
}

export default function RecherchePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-playfair mb-8">Recherche</h1>
        
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-muted-foreground mb-6">
            Fonctionnalité de recherche avancée en cours de développement.
          </p>
          <p className="text-sm text-muted-foreground">
            Utilisez le menu de navigation pour découvrir nos catégories de produits.
          </p>
        </div>
      </div>
    </div>
  )
}
