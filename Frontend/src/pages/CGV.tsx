import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CreditCard, Truck, RotateCcw, Shield } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const CGV = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Conditions Générales de Vente - Flawless Beauty</title>
        <meta name="description" content="Conditions générales de vente de Flawless Beauty. Informations sur les commandes, paiements, livraisons et retours." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Conditions Générales de Vente</h1>
            <Badge variant="outline" className="text-sm">
              Dernière mise à jour : 21 août 2025
            </Badge>
          </div>
          
          <div className="space-y-8">
            {/* Article 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Objet et champ d&apos;application
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toutes les ventes de produits 
                  cosmétiques et de parapharmacie effectuées par Flawless Beauty SARL sur le site internet 
                  flawlessbeauty.sn.
                </p>
                
                <p>
                  Ces CGV sont applicables aux relations contractuelles entre Flawless Beauty SARL et tout 
                  client particulier ou professionnel passant commande sur le site.
                </p>
                
                <p>
                  Le fait de passer commande implique l&apos;adhésion entière et sans réserve du client aux 
                  présentes CGV.
                </p>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Produits et services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Flawless Beauty propose à la vente des produits cosmétiques, de soins de beauté, de parfumerie 
                  et de parapharmacie de marques reconnues.
                </p>
                
                <div>
                  <h3 className="font-semibold mb-2">Nos catégories de produits :</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Soins du visage et du corps</li>
                    <li>Maquillage et cosmétiques</li>
                    <li>Parfumerie pour homme et femme</li>
                    <li>Produits capillaires</li>
                    <li>Parapharmacie et bien-être</li>
                    <li>Produits pour bébé et maternité</li>
                  </ul>
                </div>
                
                <p>
                  Tous nos produits sont authentiques et proviennent directement des marques ou de leurs 
                  distributeurs officiels.
                </p>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Commandes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">3.1 Processus de commande</h3>
                  <p>
                    Pour passer commande, le client doit suivre le processus d&apos;achat en ligne et valider 
                    sa commande en cliquant sur le bouton prévu à cet effet.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.2 Confirmation de commande</h3>
                  <p>
                    Une fois la commande validée et le paiement effectué, le client recevra un email de 
                    confirmation avec le détail de sa commande et un numéro de suivi.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.3 Modification ou annulation</h3>
                  <p>
                    Toute demande de modification ou d&apos;annulation de commande doit être effectuée dans 
                    les 2 heures suivant la validation de la commande en contactant notre service client.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  Prix et paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">4.1 Prix</h3>
                  <p>
                    Les prix sont indiqués en Francs CFA (FCFA) toutes taxes comprises. Ils incluent la TVA 
                    applicable au jour de la commande.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">4.2 Moyens de paiement acceptés</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Cartes bancaires (Visa, Mastercard)</li>
                    <li>Mobile Money (Orange Money, Wave, Free Money)</li>
                    <li>Virement bancaire</li>
                    <li>Paiement à la livraison (zone Dakar uniquement)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">4.3 Sécurité des paiements</h3>
                  <p>
                    Tous les paiements en ligne sont sécurisés par un système de cryptage SSL. 
                    Flawless Beauty ne conserve aucune donnée bancaire.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 5 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                  Livraison
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">5.1 Zones de livraison</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Dakar et banlieue : livraison en 24h</li>
                    <li>Régions du Sénégal : 2-3 jours ouvrés</li>
                    <li>Afrique de l&apos;Ouest : sur demande</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">5.2 Frais de livraison</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Livraison gratuite pour les commandes de plus de 25 000 FCFA</li>
                    <li>Dakar : 2 500 FCFA</li>
                    <li>Banlieue : 3 500 FCFA</li>
                    <li>Régions : 5 000 FCFA</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">5.3 Modalités de livraison</h3>
                  <p>
                    La livraison s&apos;effectue à l&apos;adresse indiquée par le client lors de la commande. 
                    Le client doit être présent ou désigner une personne habilitée à réceptionner la commande.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 6 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
                  Droit de rétractation et retours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">6.1 Délai de rétractation</h3>
                  <p>
                    Conformément à la législation, le client dispose d&apos;un délai de 14 jours francs pour 
                    exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">6.2 Conditions de retour</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Produits non ouverts et dans leur emballage d&apos;origine</li>
                    <li>Étiquettes et sceaux de sécurité intacts</li>
                    <li>Facture d&apos;achat jointe</li>
                    <li>Retour dans les 14 jours suivant la réception</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">6.3 Produits non retournables</h3>
                  <p>
                    Pour des raisons d&apos;hygiène, certains produits ne peuvent être retournés : 
                    produits de maquillage ouverts, soins intimes, produits personnalisés.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 7 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">7</span>
                  Garanties et responsabilité
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">7.1 Garantie de conformité</h3>
                  <p>
                    Flawless Beauty garantit que tous les produits vendus sont conformes aux descriptions 
                    fournies et aux normes de qualité en vigueur.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">7.2 Limitation de responsabilité</h3>
                  <p>
                    La responsabilité de Flawless Beauty ne saurait être engagée en cas de mauvaise 
                    utilisation des produits ou de réaction allergique non mentionnée sur l&apos;emballage.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">7.3 Force majeure</h3>
                  <p>
                    Flawless Beauty ne peut être tenue responsable en cas d&apos;inexécution de ses 
                    obligations due à un cas de force majeure.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 8 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">8</span>
                  Protection des données personnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Les données personnelles collectées sont traitées conformément à notre Politique de 
                  Confidentialité. Elles sont utilisées uniquement pour le traitement des commandes 
                  et l&apos;amélioration de nos services.
                </p>
              </CardContent>
            </Card>

            {/* Article 9 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">9</span>
                  Litiges et médiation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  En cas de litige, le client peut s&apos;adresser en priorité au service client de 
                  Flawless Beauty pour une résolution amiable.
                </p>
                
                <p>
                  À défaut d&apos;accord amiable, tout litige sera soumis aux tribunaux compétents de Dakar, 
                  conformément au droit sénégalais.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>Contact Service Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Email :</strong> contact@flawlessbeauty.sn</p>
                <p><strong>Téléphone :</strong> +221 33 123 45 67</p>
                <p><strong>Horaires :</strong> Lundi au Vendredi, 8h - 18h</p>
                <p><strong>Adresse :</strong> 123 Avenue Bourguiba, Dakar, Sénégal</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CGV;