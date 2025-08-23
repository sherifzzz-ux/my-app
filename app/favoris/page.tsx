import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mes Favoris - FlawlessBeauty',
  description: 'Retrouvez tous vos produits de beauté favoris en un seul endroit.',
}

export default function FavorisPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-playfair mb-8">Mes Favoris</h1>
        
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-muted-foreground mb-6">
            Votre liste de favoris est vide pour le moment.
          </p>
          <p className="text-sm text-muted-foreground">
            Découvrez nos produits et ajoutez-les à vos favoris en cliquant sur le cœur.
          </p>
        </div>
      </div>
    </div>
  )
}
