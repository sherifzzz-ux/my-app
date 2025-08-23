import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Lock, UserCheck, Database, Cookie } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Politique de Confidentialité - Flawless Beauty</title>
        <meta name="description" content="Politique de confidentialité de Flawless Beauty. Comment nous collectons, utilisons et protégeons vos données personnelles." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Politique de Confidentialité</h1>
            <Badge variant="outline" className="text-sm">
              Dernière mise à jour : 21 août 2025
            </Badge>
          </div>
          
          <div className="space-y-8">
            {/* Introduction */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700">
                  <Shield className="h-5 w-5" />
                  Notre engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  Flawless Beauty s&apos;engage à protéger votre vie privée et vos données personnelles. 
                  Cette politique explique comment nous collectons, utilisons et protégeons vos informations 
                  lors de votre navigation et vos achats sur notre site.
                </p>
              </CardContent>
            </Card>

            {/* Article 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  Responsable du traitement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Le responsable du traitement des données personnelles est :
                </p>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p><strong>Flawless Beauty SARL</strong></p>
                  <p>123 Avenue Bourguiba</p>
                  <p>Dakar, Sénégal</p>
                  <p>Email : contact@flawlessbeauty.sn</p>
                  <p>Téléphone : +221 33 123 45 67</p>
                </div>
              </CardContent>
            </Card>

            {/* Article 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  Données collectées
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">2.1 Données d&apos;identification</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Date de naissance (optionnelle)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">2.2 Données de livraison</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Adresse de livraison</li>
                    <li>Adresse de facturation</li>
                    <li>Instructions de livraison</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">2.3 Données de navigation</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Adresse IP</li>
                    <li>Type de navigateur</li>
                    <li>Pages visitées</li>
                    <li>Durée de visite</li>
                    <li>Référent</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">2.4 Données de commande</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Historique des achats</li>
                    <li>Montant des commandes</li>
                    <li>Préférences produits</li>
                    <li>Mode de paiement (sans données bancaires)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Article 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  Finalités du traitement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">3.1 Gestion des commandes</h3>
                  <p>
                    Traitement et suivi de vos commandes, gestion des livraisons, facturation et 
                    service après-vente.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.2 Relation client</h3>
                  <p>
                    Communication sur vos commandes, réponse à vos questions, gestion des réclamations 
                    et support technique.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.3 Marketing (avec votre consentement)</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Envoi de newsletters</li>
                    <li>Promotions et offres spéciales</li>
                    <li>Recommandations personnalisées</li>
                    <li>Invitations à des événements</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">3.4 Amélioration de nos services</h3>
                  <p>
                    Analyse statistique de la navigation, optimisation du site web, développement 
                    de nouveaux services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 4 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  Base légale du traitement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">4.1 Exécution du contrat</h3>
                  <p>
                    Le traitement de vos données pour la gestion des commandes et la livraison est 
                    nécessaire à l&apos;exécution du contrat de vente.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">4.2 Consentement</h3>
                  <p>
                    L&apos;envoi de communications marketing nécessite votre consentement explicite, 
                    que vous pouvez retirer à tout moment.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">4.3 Intérêt légitime</h3>
                  <p>
                    L&apos;amélioration de nos services et la sécurité du site sont fondées sur notre 
                    intérêt légitime.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 5 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
                  Partage des données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Vos données peuvent être partagées avec :
                </p>
                
                <div>
                  <h3 className="font-semibold mb-2">5.1 Prestataires de services</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Transporteurs pour la livraison</li>
                    <li>Prestataires de paiement sécurisé</li>
                    <li>Prestataires informatiques (hébergement, maintenance)</li>
                    <li>Prestataires marketing (avec votre consentement)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">5.2 Obligations légales</h3>
                  <p>
                    En cas d&apos;obligation légale ou sur demande des autorités compétentes.
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <p className="text-amber-700">
                    <strong>Important :</strong> Nous ne vendons jamais vos données personnelles à des tiers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 6 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
                  Durée de conservation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Données de compte</h3>
                    <p className="text-sm">Conservées tant que le compte est actif + 3 ans</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Données de commande</h3>
                    <p className="text-sm">10 ans pour les obligations comptables</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Données marketing</h3>
                    <p className="text-sm">3 ans après le dernier contact</p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Données de navigation</h3>
                    <p className="text-sm">13 mois maximum</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article 7 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">7</span>
                  Sécurité des données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                  protéger vos données :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Chiffrement SSL/TLS</li>
                    <li>Accès sécurisé par mot de passe</li>
                    <li>Hébergement sécurisé</li>
                    <li>Sauvegardes régulières</li>
                  </ul>
                  
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Formation du personnel</li>
                    <li>Contrôle d&apos;accès</li>
                    <li>Audit de sécurité</li>
                    <li>Mise à jour des systèmes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Article 8 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">8</span>
                  Vos droits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Vous disposez des droits suivants concernant vos données personnelles :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">✓ Droit d&apos;accès</h3>
                    <p className="text-sm">Connaître les données que nous détenons sur vous</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">✓ Droit de rectification</h3>
                    <p className="text-sm">Corriger vos données inexactes</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">✓ Droit d&apos;effacement</h3>
                    <p className="text-sm">Demander la suppression de vos données</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">✓ Droit d&apos;opposition</h3>
                    <p className="text-sm">Vous opposer au traitement marketing</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">✓ Droit à la portabilité</h3>
                    <p className="text-sm">Récupérer vos données dans un format lisible</p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">✓ Droit de limitation</h3>
                    <p className="text-sm">Limiter le traitement de vos données</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <p className="text-blue-700">
                    <strong>Pour exercer vos droits :</strong> Contactez-nous à l&apos;adresse 
                    contact@flawlessbeauty.sn en joignant une copie de votre pièce d&apos;identité.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Article 9 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="h-5 w-5" />
                  <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">9</span>
                  Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation :
                </p>
                
                <div>
                  <h3 className="font-semibold mb-2">9.1 Cookies nécessaires</h3>
                  <p>
                    Indispensables au fonctionnement du site (panier, session, sécurité). 
                    Ils ne nécessitent pas votre consentement.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">9.2 Cookies analytiques</h3>
                  <p>
                    Nous aident à comprendre comment vous utilisez le site. Soumis à votre consentement.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">9.3 Cookies marketing</h3>
                  <p>
                    Permettent de personnaliser les publicités. Soumis à votre consentement.
                  </p>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  Vous pouvez gérer vos préférences cookies dans les paramètres de votre navigateur.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700">Contact - Protection des données</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-green-700">
                <p><strong>Email :</strong> contact@flawlessbeauty.sn</p>
                <p><strong>Objet :</strong> Protection des données</p>
                <p><strong>Téléphone :</strong> +221 33 123 45 67</p>
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

export default PolitiqueConfidentialite;