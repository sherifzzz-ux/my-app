import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, MapPin, Package, CreditCard, Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Livraison = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Informations Livraison - Flawless Beauty</title>
        <meta name="description" content="Découvrez nos options de livraison : délais, zones couvertes, tarifs et modalités. Livraison rapide au Sénégal et en Afrique de l'Ouest." />
        <meta name="keywords" content="livraison, expédition, délais, tarifs, Dakar, Sénégal, transport" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Informations de Livraison</h1>
            <p className="text-lg text-muted-foreground">
              Découvrez toutes nos options de livraison pour recevoir vos produits de beauté rapidement et en toute sécurité
            </p>
          </div>
          
          <div className="space-y-8">
            {/* Livraison Express */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Truck className="h-6 w-6" />
                  Livraison Express Dakar - 24h
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <p className="text-lg font-medium mb-2">
                  🚚 Livraison en moins de 24h dans toute la région de Dakar !
                </p>
                <p>
                  Commandez avant 15h et recevez vos produits le lendemain (hors dimanches et jours fériés).
                </p>
              </CardContent>
            </Card>

            {/* Zones de livraison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Zones de livraison et délais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 bg-green-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-green-600" />
                      <Badge className="bg-green-100 text-green-700">24h</Badge>
                    </div>
                    <h3 className="font-semibold mb-2">Dakar Centre</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Plateau</li>
                      <li>• Médina</li>
                      <li>• Point E</li>
                      <li>• Mermoz</li>
                      <li>• Fann</li>
                    </ul>
                    <p className="text-sm font-medium text-green-600 mt-2">2 500 FCFA</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <Badge className="bg-blue-100 text-blue-700">24-48h</Badge>
                    </div>
                    <h3 className="font-semibold mb-2">Grande Banlieue</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Pikine</li>
                      <li>• Guédiawaye</li>
                      <li>• Parcelles Assainies</li>
                      <li>• Thiaroye</li>
                      <li>• Rufisque</li>
                    </ul>
                    <p className="text-sm font-medium text-blue-600 mt-2">3 500 FCFA</p>
                  </div>
                  
                  <div className="border rounded-lg p-4 bg-orange-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      <Badge className="bg-orange-100 text-orange-700">2-3 jours</Badge>
                    </div>
                    <h3 className="font-semibold mb-2">Régions du Sénégal</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Thiès, Mbour</li>
                      <li>• Saint-Louis</li>
                      <li>• Kaolack</li>
                      <li>• Ziguinchor</li>
                      <li>• Toutes autres régions</li>
                    </ul>
                    <p className="text-sm font-medium text-orange-600 mt-2">5 000 FCFA</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Livraison gratuite */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-700">
                  <Package className="h-5 w-5" />
                  Livraison Gratuite
                </CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700">
                <div className="text-lg font-bold mb-2">
                  🎉 Livraison GRATUITE dès 25 000 FCFA d&apos;achat !
                </div>
                <p>
                  Profitez de la livraison gratuite dans toute la région de Dakar pour toute commande 
                  supérieure à 25 000 FCFA. Une excellente façon d&apos;économiser sur vos produits de beauté préférés.
                </p>
              </CardContent>
            </Card>

            {/* Modalités de livraison */}
            <Card>
              <CardHeader>
                <CardTitle>Modalités de livraison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Horaires de livraison
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Lundi - Vendredi :</strong> 9h - 18h</p>
                      <p><strong>Samedi :</strong> 9h - 16h</p>
                      <p><strong>Dimanche :</strong> Pas de livraison</p>
                    </div>
                    <div>
                      <p><strong>Jours fériés :</strong> Pas de livraison</p>
                      <p><strong>Ramadan :</strong> Horaires adaptés</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Processus de livraison</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <p className="font-medium">Préparation de commande</p>
                        <p className="text-sm text-muted-foreground">Votre commande est préparée avec soin dans nos entrepôts</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <p className="font-medium">Expédition</p>
                        <p className="text-sm text-muted-foreground">Votre colis est confié à notre transporteur avec un numéro de suivi</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <p className="font-medium">Livraison</p>
                        <p className="text-sm text-muted-foreground">Notre livreur vous contacte et livre à l&apos;adresse indiquée</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Options de paiement à la livraison */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Paiement à la livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-700 font-medium mb-2">
                    💳 Paiement à la livraison disponible pour Dakar
                  </p>
                  <p className="text-blue-700 text-sm">
                    Payez votre commande directement au livreur en espèces ou par Mobile Money (Orange Money, Wave, Free Money).
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Conditions pour le paiement à la livraison :</h3>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Disponible uniquement dans la région de Dakar</li>
                    <li>Montant maximum : 50 000 FCFA</li>
                    <li>Frais supplémentaires : 1 000 FCFA</li>
                    <li>Paiement en espèces ou Mobile Money</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Suivi de commande */}
            <Card>
              <CardHeader>
                <CardTitle>Suivi de votre commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Une fois votre commande expédiée, vous recevrez :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">📧 Email de confirmation</h3>
                    <p className="text-sm">Avec votre numéro de suivi et les détails de livraison</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">📱 SMS de suivi</h3>
                    <p className="text-sm">Notifications en temps réel sur l&apos;avancement de votre livraison</p>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>Astuce :</strong> Connectez-vous à votre compte pour suivre toutes vos commandes en temps réel 
                    depuis votre espace personnel.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Livraison internationale */}
            <Card>
              <CardHeader>
                <CardTitle>Livraison Afrique de l&apos;Ouest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nous livrons également dans les pays voisins de l&apos;Afrique de l&apos;Ouest :
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">🇬🇲 Gambie</p>
                    <p>3-5 jours</p>
                  </div>
                  <div>
                    <p className="font-medium">🇬🇳 Guinée</p>
                    <p>5-7 jours</p>
                  </div>
                  <div>
                    <p className="font-medium">🇲🇱 Mali</p>
                    <p>5-7 jours</p>
                  </div>
                  <div>
                    <p className="font-medium">🇧🇫 Burkina Faso</p>
                    <p>7-10 jours</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-amber-700">
                    <strong>Note :</strong> Pour les livraisons internationales, contactez notre service client 
                    pour obtenir un devis personnalisé et connaître les modalités douanières.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact livraison */}
            <Card className="bg-gradient-to-r from-primary/10 to-purple-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Une question sur votre livraison ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-medium">Notre équipe livraison est à votre disposition :</p>
                <div className="space-y-2">
                  <p><strong>📞 Téléphone :</strong> +221 33 123 45 67</p>
                  <p><strong>📧 Email :</strong> livraison@flawlessbeauty.sn</p>
                  <p><strong>💬 WhatsApp :</strong> +221 77 123 45 67</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Horaires : Lundi au Vendredi de 8h à 18h, Samedi de 9h à 16h
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Livraison;