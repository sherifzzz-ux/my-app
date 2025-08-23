import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Building, Mail, Phone, MapPin } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const MentionsLegales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Mentions Légales - Flawless Beauty</title>
        <meta name="description" content="Mentions légales de Flawless Beauty - Informations sur l'éditeur, hébergeur et responsable du site e-commerce." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Mentions Légales</h1>
          
          <div className="space-y-8">
            {/* Éditeur du site */}
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

            {/* Directeur de publication */}
            <Card>
              <CardHeader>
                <CardTitle>Directeur de publication</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Monsieur/Madame [Nom du gérant]</p>
                <p>Gérant de Flawless Beauty SARL</p>
              </CardContent>
            </Card>

            {/* Hébergement */}
            <Card>
              <CardHeader>
                <CardTitle>Hébergement du site</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Hébergeur</h3>
                  <p>Lovable (GPT Engineer, Inc.)</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Adresse</h3>
                  <p>San Francisco, CA, États-Unis</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Site web</h3>
                  <p>https://lovable.dev</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
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

            {/* Propriété intellectuelle */}
            <Card>
              <CardHeader>
                <CardTitle>Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  L&apos;ensemble du contenu de ce site (textes, images, vidéos, graphismes, logos, icônes, sons, logiciels, etc.) 
                  est la propriété exclusive de Flawless Beauty SARL ou de ses partenaires, et est protégé par les lois 
                  sénégalaises et internationales relatives à la propriété intellectuelle.
                </p>
                
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments 
                  du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable 
                  de Flawless Beauty SARL.
                </p>
                
                <p>
                  Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments qu&apos;il contient sera 
                  considérée comme constitutive d&apos;une contrefaçon et poursuivie conformément aux dispositions des 
                  articles L.335-2 et suivants du Code français de la Propriété Intellectuelle.
                </p>
              </CardContent>
            </Card>

            {/* Responsabilité */}
            <Card>
              <CardHeader>
                <CardTitle>Limitation de responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à 
                  différentes périodes de l&apos;année, mais peut toutefois contenir des inexactitudes ou des omissions.
                </p>
                
                <p>
                  Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir 
                  le signaler par email, à l&apos;adresse contact@flawlessbeauty.sn, en décrivant le problème de la 
                  façon la plus précise possible.
                </p>
                
                <p>
                  Flawless Beauty SARL ne pourra être tenue responsable des dommages directs et indirects causés au 
                  matériel de l&apos;utilisateur, lors de l&apos;accès au site flawlessbeauty.sn, et résultant soit de 
                  l&apos;utilisation d&apos;un matériel ne répondant pas aux spécifications indiquées, soit de 
                  l&apos;apparition d&apos;un bug ou d&apos;une incompatibilité.
                </p>
              </CardContent>
            </Card>

            {/* Droit applicable */}
            <Card>
              <CardHeader>
                <CardTitle>Droit applicable et juridiction compétente</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Tout litige en relation avec l&apos;utilisation du site flawlessbeauty.sn est soumis au droit sénégalais. 
                  Il est fait attribution exclusive de juridiction aux tribunaux compétents de Dakar.
                </p>
              </CardContent>
            </Card>

            {/* Date de mise à jour */}
            <Card>
              <CardHeader>
                <CardTitle>Dernière mise à jour</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Ces mentions légales ont été mises à jour le : 21 août 2025</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentionsLegales;