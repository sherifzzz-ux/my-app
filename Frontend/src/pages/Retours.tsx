import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, Clock, CheckCircle, XCircle, AlertTriangle, Package } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Retours = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Politique de Retours - Flawless Beauty</title>
        <meta name="description" content="Politique de retours et remboursements Flawless Beauty. Conditions, délais et procédure pour retourner vos produits cosmétiques." />
        <meta name="keywords" content="retours, remboursement, échange, politique retour, garantie, cosmétiques" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Politique de Retours & Remboursements</h1>
            <p className="text-lg text-muted-foreground">
              Nous nous engageons à votre satisfaction. Découvrez comment retourner ou échanger vos produits facilement.
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Satisfaction garantie */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-6 w-6" />
                  Satisfaction Garantie
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <p className="text-lg font-medium mb-2">
                  ✅ 14 jours pour changer d&apos;avis - Retours gratuits - Remboursement intégral
                </p>
                <p>
                  Votre satisfaction est notre priorité. Si un produit ne vous convient pas, nous facilitons les retours et échanges.
                </p>
              </CardContent>
            </Card>

            {/* Délais et conditions */}
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
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-700">
                    <strong>Important :</strong> Pour des raisons d&apos;hygiène et de sécurité, les produits cosmétiques 
                    ouverts ne peuvent être retournés, sauf en cas de défaut de fabrication avéré.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Procédure de retour */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Comment effectuer un retour ?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold text-xl">1</span>
                      </div>
                      <h3 className="font-semibold mb-2">Demandez un retour</h3>
                      <p className="text-sm text-muted-foreground">
                        Contactez notre service client par email ou téléphone avec votre numéro de commande
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold text-xl">2</span>
                      </div>
                      <h3 className="font-semibold mb-2">Recevez l&apos;étiquette</h3>
                      <p className="text-sm text-muted-foreground">
                        Nous vous envoyons une étiquette de retour prépayée par email sous 24h
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary font-bold text-xl">3</span>
                      </div>
                      <h3 className="font-semibold mb-2">Expédiez le colis</h3>
                      <p className="text-sm text-muted-foreground">
                        Emballez soigneusement vos produits et déposez le colis dans un point relais
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Informations à fournir :</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Numéro de commande</li>
                      <li>• Produit(s) à retourner</li>
                      <li>• Motif du retour</li>
                      <li>• Souhait d&apos;échange ou de remboursement</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Types de retours */}
            <Card>
              <CardHeader>
                <CardTitle>Types de retours et délais de traitement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h3 className="font-semibold">Remboursement</h3>
                    </div>
                    <ul className="text-sm space-y-2">
                      <li><strong>Délai :</strong> 5-7 jours ouvrés</li>
                      <li><strong>Méthode :</strong> Mode de paiement initial</li>
                      <li><strong>Frais :</strong> Retour gratuit</li>
                      <li><strong>Condition :</strong> Produit en parfait état</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <RotateCcw className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">Échange</h3>
                    </div>
                    <ul className="text-sm space-y-2">
                      <li><strong>Délai :</strong> 3-5 jours ouvrés</li>
                      <li><strong>Options :</strong> Autre produit, taille, couleur</li>
                      <li><strong>Frais :</strong> Gratuit si même valeur</li>
                      <li><strong>Différence :</strong> Remboursée ou facturée</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cas particuliers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Cas particuliers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h3 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4" />
                      Produit défectueux
                    </h3>
                    <p className="text-sm text-red-700 mb-2">
                      Si vous recevez un produit défectueux ou endommagé :
                    </p>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Contactez-nous immédiatement</li>
                      <li>• Envoyez des photos du défaut</li>
                      <li>• Remboursement ou échange prioritaire</li>
                      <li>• Frais de retour pris en charge</li>
                    </ul>
                  </div>
                  
                  <div className="border border-amber-200 rounded-lg p-4 bg-amber-50">
                    <h3 className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Erreur de commande
                    </h3>
                    <p className="text-sm text-amber-700 mb-2">
                      Si nous avons commis une erreur :
                    </p>
                    <ul className="text-sm text-amber-700 space-y-1">
                      <li>• Échange immédiat garanti</li>
                      <li>• Frais de retour et renvoi gratuits</li>
                      <li>• Livraison prioritaire</li>
                      <li>• Geste commercial possible</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-700 mb-2">Allergie ou réaction cutanée</h3>
                  <p className="text-sm text-blue-700">
                    En cas de réaction allergique à un produit, arrêtez immédiatement l&apos;utilisation et consultez 
                    un dermatologue si nécessaire. Contactez-nous pour un retour exceptionnel du produit entamé 
                    (sur présentation d&apos;un certificat médical).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Frais de retour */}
            <Card>
              <CardHeader>
                <CardTitle>Frais de retour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center border rounded-lg p-4 bg-green-50">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-green-700">Retours gratuits</h3>
                      <ul className="text-sm text-green-700 mt-2 space-y-1">
                        <li>• Produit défectueux</li>
                        <li>• Erreur de notre part</li>
                      <li>• Commande &gt; 25 000 FCFA</li>
                    </ul>
                  </div>
                    
                    <div className="text-center border rounded-lg p-4 bg-blue-50">
                      <Badge className="mb-2 bg-blue-500">2 500 FCFA</Badge>
                      <h3 className="font-semibold text-blue-700">Retours payants</h3>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• Changement d&apos;avis</li>
                      <li>• Commande &lt; 25 000 FCFA</li>
                      <li>• Échange de convenance</li>
                    </ul>
                    </div>
                    
                    <div className="text-center border rounded-lg p-4 bg-purple-50">
                      <RotateCcw className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-purple-700">Échanges</h3>
                      <ul className="text-sm text-purple-700 mt-2 space-y-1">
                        <li>• Gratuit si même prix</li>
                        <li>• Différence facturée/remboursée</li>
                        <li>• Une seule fois par commande</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suivi de retour */}
            <Card>
              <CardHeader>
                <CardTitle>Suivi de votre retour</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Une fois votre retour initié, vous pouvez suivre son avancement :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-medium">Demande acceptée</p>
                      <p className="text-sm text-muted-foreground">Étiquette de retour envoyée par email</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-medium">Colis expédié</p>
                      <p className="text-sm text-muted-foreground">Votre retour est en transit vers nos entrepôts</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-medium">Colis reçu</p>
                      <p className="text-sm text-muted-foreground">Inspection et validation du retour en cours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                    <div>
                      <p className="font-medium">Remboursement traité</p>
                      <p className="text-sm text-muted-foreground">Votre remboursement est en cours de traitement</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact retours */}
            <Card className="bg-gradient-to-r from-primary/10 to-purple-100">
              <CardHeader>
                <CardTitle>Service Retours & Échanges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-medium">Notre équipe dédiée aux retours est là pour vous aider :</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>📧 Email :</strong> retours@flawlessbeauty.sn</p>
                    <p><strong>📞 Téléphone :</strong> +221 33 123 45 67</p>
                    <p><strong>💬 WhatsApp :</strong> +221 77 123 45 67</p>
                  </div>
                  <div>
                    <p><strong>⏰ Horaires :</strong></p>
                    <p className="text-sm">Lundi - Vendredi : 8h - 18h</p>
                    <p className="text-sm">Samedi : 9h - 16h</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button>
                    Demander un retour
                  </Button>
                  <Button variant="outline">
                    Suivre mon retour
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Retours;