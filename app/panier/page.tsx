import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Panier - FlawlessBeauty',
  description: 'Finalisez votre commande de produits de beauté premium. Livraison rapide au Sénégal.',
}

export default function PanierPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold font-playfair mb-8">Votre panier</h1>
        
        <div className="max-w-4xl mx-auto text-center py-12">
          <p className="text-muted-foreground mb-6">
            La fonctionnalité de panier avancée sera bientôt disponible.
          </p>
          <p className="text-sm text-muted-foreground">
            En attendant, vous pouvez découvrir nos produits et utiliser le panier simple.
          </p>
        </div>
      </div>
    </div>
  )
}
