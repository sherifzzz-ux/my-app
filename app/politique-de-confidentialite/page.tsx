import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Eye, Lock, UserCheck, Database, Cookie } from 'lucide-react'

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Politique de Confidentialit&eacute;</h1>
            <Badge variant="outline" className="text-sm">Dernière mise à jour : 21 août 2025</Badge>
          </div>

          <div className="space-y-8">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Shield className="h-5 w-5" />
                  Notre engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  Flawless Beauty s&apos;engage &agrave; prot&eacute;ger votre vie priv&eacute;e et vos donn&eacute;es personnelles.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Responsable du traitement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p><strong>Flawless Beauty SARL</strong></p>
                  <p>123 Avenue Bourguiba, Dakar, Sénégal</p>
                  <p>Email : contact@flawlessbeauty.sn</p>
                  <p>Téléphone : +221 33 123 45 67</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Données collectées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Données d&apos;identification</li>
                  <li>Données de livraison</li>
                  <li>Données de navigation</li>
                  <li>Données de commande</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Finalités du traitement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc pl-6 space-y-1">
                  <li>Gestion des commandes et livraisons</li>
                  <li>Relation client et support</li>
                  <li>Marketing (avec consentement)</li>
                  <li>Amélioration des services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Sécurité des données
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Mesures techniques et organisationnelles pour protéger vos données (SSL/TLS, contrôle d&apos;accès, sauvegardes, etc.).</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Gestion des cookies nécessaires, analytiques et marketing selon votre consentement.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


