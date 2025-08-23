import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Building, Mail, Phone } from 'lucide-react'

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Mentions Légales</h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Éditeur du site
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Dénomination sociale</h3>
                  <p>Flawless Beauty SARL</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Forme juridique</h3>
                  <p>Société à Responsabilité Limitée (SARL)</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Capital social</h3>
                  <p>1 000 000 FCFA</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Numéro d&apos;immatriculation</h3>
                  <p>RCCM : SN-DKR-2024-B-12345</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Numéro de TVA</h3>
                  <p>Non applicable (régime de franchise)</p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div>
                    <h3 className="font-semibold mb-1">Adresse du siège social</h3>
                    <p>123 Avenue Bourguiba<br />Dakar, Sénégal<br />BP 1234</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Directeur de publication</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Monsieur/Madame [Nom du gérant]</p>
                <p>Gérant de Flawless Beauty SARL</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nous contacter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@flawlessbeauty.sn</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+221 33 123 45 67</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span>123 Avenue Bourguiba, Dakar, Sénégal</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


