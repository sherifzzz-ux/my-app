import { Breadcrumb } from '@/components/ui/breadcrumb'

export default function ConditionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6 py-8">
      <Breadcrumb
        items={[{ label: 'Accueil', href: '/' }, { label: 'Conditions d’utilisations' }]}
        className="mb-6"
      />
      <h1 className="text-xl font-semibold mb-4">Conditions d’utilisations</h1>
      <div className="prose prose-zinc max-w-none">
        <h2>Paiements</h2>
        <p>Moyens acceptés: Espèces, Orange Money, Wave, Carte bancaire.</p>
        <h2>Délais</h2>
        <p>Traitement des commandes sous 24h ouvrées, livraison selon zone.</p>
        <h2>Retours</h2>
        <p>Retours possibles sous 7 jours pour produit non ouvert.</p>
      </div>
    </div>
  )
}
