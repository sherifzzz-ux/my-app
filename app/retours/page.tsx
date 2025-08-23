import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RotateCcw, Clock, CheckCircle } from 'lucide-react'

export default function RetoursPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Politique de Retours &amp; Remboursements</h1>
            <p className="text-lg text-muted-foreground">Nous nous engageons à votre satisfaction.</p>
          </div>

          <div className="space-y-8">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-6 w-6" />
                  Satisfaction Garantie
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <p className="text-lg font-medium mb-2">✅ 14 jours pour changer d&apos;avis - Retours gratuits - Remboursement intégral</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Délais et conditions de retour
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-green-700 mb-2">✅ Produits retournables</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Produits non ouverts et non utilisés</li>
                      <li>• Emballage d&apos;origine intact</li>
                      <li>• Étiquettes et sceaux non endommagés</li>
                      <li>• Retour sous 14 jours</li>
                      <li>• Facture d&apos;achat jointe</li>
                    </ul>
                  </div>
                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-semibold text-red-700 mb-2">❌ Produits non retournables</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Produits ouverts ou utilisés</li>
                      <li>• Maquillage testé ou applicé</li>
                      <li>• Produits d&apos;hygiène intime</li>
                      <li>• Articles personnalisés</li>
                      <li>• Produits périssables</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Comment effectuer un retour ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3"><span className="text-primary font-bold text-xl">1</span></div>
                    <h3 className="font-semibold mb-2">Demandez un retour</h3>
                    <p className="text-sm text-muted-foreground">Contactez le support avec votre numéro de commande</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3"><span className="text-primary font-bold text-xl">2</span></div>
                    <h3 className="font-semibold mb-2">Recevez l&apos;étiquette</h3>
                    <p className="text-sm text-muted-foreground">Étiquette prépayée envoyée par email</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3"><span className="text-primary font-bold text-xl">3</span></div>
                    <h3 className="font-semibold mb-2">Expédiez le colis</h3>
                    <p className="text-sm text-muted-foreground">Déposez dans un point relais</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-primary/10 to-purple-100">
              <CardHeader>
                <CardTitle>Service Retours &amp; Échanges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Email :</strong> retours@flawlessbeauty.sn</p>
                    <p><strong>Téléphone :</strong> +221 33 123 45 67</p>
                    <p><strong>WhatsApp :</strong> +221 77 123 45 67</p>
                  </div>
                  <div>
                    <p><strong>Horaires :</strong> Lun - Ven: 8h - 18h, Sam: 9h - 16h</p>
                  </div>
                </div>
                <div className="flex gap-4 pt-2">
                  <Button>Demander un retour</Button>
                  <Button variant="outline">Suivre mon retour</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


