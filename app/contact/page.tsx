'use client'

import { CategoryHero } from '@/components/category/CategoryHero'
import { CategoryBreadcrumb } from '@/components/category/CategoryBreadcrumb'
import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { FAQ } from '@/components/contact/FAQ'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageCircle, Phone, Mail, MapPin, Clock, Users, Zap, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  const breadcrumbItems = [
    { label: 'Contact' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <CategoryBreadcrumb items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <CategoryHero
        title="Contact"
        description="Nous sommes là pour vous aider ! Contactez-nous pour toute question, demande de conseil ou support. Notre équipe d'experts beauté vous répondra dans les plus brefs délais."
        image="/images/contact-hero.jpg"
        badge="Support 24/7"
        stats={{
          products: 0,
          brands: 0,
          rating: 4.9
        }}
        features={[
          'Réponse sous 24h',
          'Support technique expert',
          'Conseils beauté personnalisés'
        ]}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Options de contact rapide */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Contactez-nous rapidement</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Phone className="h-8 w-8 mx-auto mb-3 text-blue-500" />
                <h3 className="font-semibold mb-2">Appel téléphonique</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Parlez directement à un expert
                </p>
                <Button asChild className="w-full">
                  <Link href="tel:+33123456789">
                    Appeler maintenant
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Mail className="h-8 w-8 mx-auto mb-3 text-green-500" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Réponse sous 24h garantie
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="mailto:contact@mami-shop.fr">
                    Envoyer un email
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <MessageCircle className="h-8 w-8 mx-auto mb-3 text-purple-500" />
                <h3 className="font-semibold mb-2">Chat en ligne</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Support instantané
                </p>
                <Button variant="outline" className="w-full">
                  Démarrer le chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          {/* Informations de contact */}
          <div className="lg:col-span-1">
            <ContactInfo />
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <FAQ />
        </div>

        {/* Section équipe */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Support Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Notre équipe de support client est disponible pour vous aider avec vos commandes et questions générales.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Disponible 9h-18h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span>Réponse sous 2h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  Experts Beauté
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Nos experts beauté certifiés vous conseillent pour trouver les produits parfaits selon vos besoins.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Disponible 9h-18h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span>Conseils personnalisés</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-purple-500" />
                  Support Technique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Pour les problèmes techniques, notre équipe spécialisée vous accompagne dans la résolution.
                </CardDescription>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Disponible 24/7</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span>Résolution rapide</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Prêt à nous contacter ?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Que ce soit pour un conseil beauté, une question sur votre commande ou un partenariat, 
                  nous sommes là pour vous accompagner dans votre parcours beauté.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link href="#contact-form">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Envoyer un message
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="tel:+33123456789">
                      <Phone className="h-5 w-5 mr-2" />
                      Appeler maintenant
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}