import { Metadata } from 'next'
import { IntegrationTest } from '@/components/test/IntegrationTest'

export const metadata: Metadata = {
  title: 'Test d\'Intégration - FlawlessBeauty',
  description: 'Page de test pour valider l\'intégration Frontend → Next.js',
}

export default function TestIntegrationPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-playfair mb-4">
            🧪 Test d&apos;Intégration
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Validation complète de la migration Frontend Vite → Next.js
          </p>
        </div>
        
        <IntegrationTest />
      </div>
    </div>
  )
}
