'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Truck, HelpCircle, RotateCcw, User, CreditCard, MapPin, Phone, MessageCircle, Mail, Clock } from 'lucide-react'
import Link from 'next/link'

export default function AidePage() {
  const quickActions = [
    { title: 'Suivi de commande', description: 'Suivez votre commande en temps réel', icon: <Truck className="h-8 w-8" />, link: '/suivi-commande', color: 'bg-blue-50 text-blue-600' },
    { title: 'Questions fréquentes', description: 'Trouvez rapidement vos réponses', icon: <HelpCircle className="h-8 w-8" />, link: '/faq', color: 'bg-green-50 text-green-600' },
    { title: 'Retours & Échanges', description: 'Politique de retours et échanges', icon: <RotateCcw className="h-8 w-8" />, link: '/retours', color: 'bg-orange-50 text-orange-600' },
    { title: 'Mon compte', description: 'Gérez votre compte client', icon: <User className="h-8 w-8" />, link: '/compte', color: 'bg-purple-50 text-purple-600' },
    { title: 'Méthodes de paiement', description: 'Informations sur les paiements', icon: <CreditCard className="h-8 w-8" />, link: '/faq', color: 'bg-pink-50 text-pink-600' },
    { title: 'Livraison', description: 'Zones et délais de livraison', icon: <MapPin className="h-8 w-8" />, link: '/livraison', color: 'bg-indigo-50 text-indigo-600' },
  ]

  const contactMethods = [
    { title: 'Téléphone', description: 'Appelez-nous directement', icon: <Phone className="h-6 w-6" />, details: '77 123 45 67', hours: 'Lun-Sam: 8h-20h', action: 'Appeler maintenant' },
    { title: 'WhatsApp', description: 'Chattez avec nous', icon: <MessageCircle className="h-6 w-6" />, details: '77 123 45 67', hours: 'Lun-Sam: 8h-20h', action: 'Démarrer le chat' },
    { title: 'Email', description: 'Envoyez-nous un message', icon: <Mail className="h-6 w-6" />, details: 'contact@flawlessbeauty.sn', hours: 'Réponse sous 24h', action: 'Envoyer un email' },
  ]

  const guides = [
    { title: 'Comment passer commande', steps: ['Naviguez dans nos catégories', 'Ajoutez au panier', 'Procédez au checkout', 'Choisissez la livraison', 'Sélectionnez le paiement', 'Confirmez votre commande'] },
    { title: 'Comment suivre ma commande', steps: ['Connectez-vous', "'Mes commandes'", 'Cliquez sur le numéro', 'Consultez le statut', 'Recevez les notifications SMS'] },
    { title: 'Comment retourner un produit', steps: ["Contactez-nous sous 14 jours", 'Obtenez votre numéro de retour', "Emballez dans l'état d'origine", "Joignez la facture d'achat", 'Expédiez', 'Suivez le remboursement'] },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Centre d&apos;Aide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Nous sommes là pour vous aider.</p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Actions Rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((a, i) => (
              <Link key={i} href={a.link} className="block group">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg ${a.color} mb-4`}>{a.icon}</div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{a.title}</h3>
                    <p className="text-muted-foreground text-sm">{a.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((m, i) => (
              <Card key={i}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4"><div className="bg-primary/10 p-3 rounded-full">{m.icon}</div></div>
                  <h3 className="font-semibold text-lg mb-2">{m.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{m.description}</p>
                  <p className="font-medium mb-1">{m.details}</p>
                  <p className="text-sm text-muted-foreground mb-4">{m.hours}</p>
                  <Button className="w-full">{m.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Guides Pratiques</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {guides.map((g, i) => (
              <Card key={i}>
                <CardHeader><CardTitle className="text-lg">{g.title}</CardTitle></CardHeader>
                <CardContent>
                  <ol className="space-y-2">
                    {g.steps.map((s, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">{j + 1}</span>
                        <span className="text-sm text-muted-foreground">{s}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
              <p className="text-muted-foreground">Vous ne trouvez pas ce que vous cherchez ?</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium mb-2 block">Nom complet</label><Input placeholder="Votre nom" /></div>
                <div><label className="text-sm font-medium mb-2 block">Email</label><Input type="email" placeholder="votre@email.com" /></div>
              </div>
              <div><label className="text-sm font-medium mb-2 block">Sujet</label><Input placeholder="De quoi s&apos;agit-il ?" /></div>
              <div><label className="text-sm font-medium mb-2 block">Message</label><Textarea rows={5} placeholder="Décrivez votre question" /></div>
              <Button className="w-full">Envoyer le message</Button>
            </CardContent>
          </Card>
        </section>

        <section className="mt-12">
          <Card className="bg-primary/5">
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-4">Horaires d&apos;ouverture</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Service Client</p>
                  <p className="text-muted-foreground">Lundi - Samedi: 8h00 - 20h00</p>
                  <p className="text-muted-foreground">Dimanche: 10h00 - 18h00</p>
                </div>
                <div>
                  <p className="font-medium">Livraisons</p>
                  <p className="text-muted-foreground">Lundi - Samedi: 9h00 - 19h00</p>
                  <p className="text-muted-foreground">Dimanche: Sur demande</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}


