import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // Clear any cart data from localStorage after successful order
    // This is a fallback in case the cart wasn't cleared properly
    if (orderId) {
      console.log('Order completed successfully:', orderId);
    }
  }, [orderId]);

  return (
    <>
      <Helmet>
        <title>Commande confirmée - Flawless Beauty</title>
        <meta name="description" content="Votre commande a été confirmée avec succès. Merci pour votre achat chez Flawless Beauty." />
      </Helmet>

      <Header />
      
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold font-playfair mb-4 text-success">
              Commande confirmée !
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Merci pour votre commande. Nous avons bien reçu votre paiement et nous préparons votre commande.
            </p>

            {orderId && (
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">Numéro de commande</p>
                <p className="font-mono text-lg font-semibold">#{orderId}</p>
              </div>
            )}

            {/* Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Préparation</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous préparons votre commande avec soin
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Expédition</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous recevrez un email de suivi
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="font-semibold mb-2">Livraison</h3>
                  <p className="text-sm text-muted-foreground">
                    Réception à l'adresse indiquée
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Confirmation Email */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-center">Confirmation par email</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">
                  Un email de confirmation avec tous les détails de votre commande 
                  vous a été envoyé. Vérifiez également votre dossier spam.
                </p>
                <p className="text-sm text-muted-foreground">
                  Des questions ? Contactez notre service client à{' '}
                  <Link to="/contact" className="text-primary hover:underline">
                    contact@flawlessbeauty.sn
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/compte">
                  Voir mes commandes
                </Link>
              </Button>
              
              <Button variant="outline" asChild size="lg">
                <Link to="/">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Continuer mes achats
                </Link>
              </Button>
            </div>

            {/* Newsletter Signup Prompt */}
            <div className="mt-12 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
              <h3 className="font-semibold mb-2">Restez informée</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Abonnez-vous à notre newsletter pour recevoir nos offres exclusives et nouveautés
              </p>
              <Button variant="outline" asChild>
                <Link to="/#newsletter">S'abonner</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}