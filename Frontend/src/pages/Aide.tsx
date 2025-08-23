import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Search,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  User,
  HelpCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Aide() {
  const quickActions = [
    {
      title: "Suivi de commande",
      description: "Suivez votre commande en temps réel",
      icon: <Truck className="h-8 w-8" />,
      link: "/suivi-commande",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Questions fréquentes",
      description: "Trouvez rapidement vos réponses",
      icon: <HelpCircle className="h-8 w-8" />,
      link: "/faq",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Retours & Échanges",
      description: "Politique de retours et échanges",
      icon: <RotateCcw className="h-8 w-8" />,
      link: "/retours",
      color: "bg-orange-50 text-orange-600"
    },
    {
      title: "Mon compte",
      description: "Gérez votre compte client",
      icon: <User className="h-8 w-8" />,
      link: "/compte",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Méthodes de paiement",
      description: "Informations sur les paiements",
      icon: <CreditCard className="h-8 w-8" />,
      link: "/faq",
      color: "bg-pink-50 text-pink-600"
    },
    {
      title: "Livraison",
      description: "Zones et délais de livraison",
      icon: <MapPin className="h-8 w-8" />,
      link: "/livraison",
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  const contactMethods = [
    {
      title: "Téléphone",
      description: "Appelez-nous directement",
      icon: <Phone className="h-6 w-6" />,
      details: "77 123 45 67",
      hours: "Lun-Sam: 8h-20h",
      action: "Appeler maintenant"
    },
    {
      title: "WhatsApp",
      description: "Chattez avec nous",
      icon: <MessageCircle className="h-6 w-6" />,
      details: "77 123 45 67",
      hours: "Lun-Sam: 8h-20h",
      action: "Démarrer le chat"
    },
    {
      title: "Email",
      description: "Envoyez-nous un message",
      icon: <Mail className="h-6 w-6" />,
      details: "contact@flawlessbeauty.sn",
      hours: "Réponse sous 24h",
      action: "Envoyer un email"
    }
  ];

  const guides = [
    {
      title: "Comment passer commande",
      steps: [
        "Naviguez dans nos catégories de produits",
        "Ajoutez vos articles au panier",
        "Vérifiez votre panier et procédez au checkout",
        "Choisissez votre mode de livraison",
        "Sélectionnez votre méthode de paiement",
        "Confirmez votre commande"
      ]
    },
    {
      title: "Comment suivre ma commande",
      steps: [
        "Connectez-vous à votre compte",
        "Allez dans 'Mes commandes'",
        "Cliquez sur le numéro de commande",
        "Consultez le statut en temps réel",
        "Recevez les notifications SMS"
      ]
    },
    {
      title: "Comment retourner un produit",
      steps: [
        "Contactez notre service client sous 14 jours",
        "Obtenez votre numéro de retour",
        "Emballez le produit dans son état d'origine",
        "Joignez la facture d'achat",
        "Expédiez le colis à l'adresse indiquée",
        "Suivez le processus de remboursement"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Centre d'Aide - Support Client | Flawless Beauty</title>
        <meta 
          name="description" 
          content="Centre d'aide Flawless Beauty. Contactez notre service client, consultez nos guides et trouvez l'assistance dont vous avez besoin." 
        />
        <meta name="keywords" content="aide, support, service client, contact, guides, assistance, Sénégal" />
        <link rel="canonical" href="https://flawlessbeauty.sn/aide" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Centre d'Aide
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nous sommes là pour vous aider. Trouvez des réponses rapides ou contactez notre équipe.
            </p>
          </div>

          {/* Quick Actions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Actions Rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link} className="block group">
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {action.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Contact Methods */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        {method.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{method.description}</p>
                    <p className="font-medium mb-1">{method.details}</p>
                    <p className="text-sm text-muted-foreground mb-4">{method.hours}</p>
                    <Button className="w-full">{method.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Guides */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Guides Pratiques</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {guides.map((guide, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </span>
                          <span className="text-sm text-muted-foreground">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <p className="text-muted-foreground">
                  Vous ne trouvez pas ce que vous cherchez ? Contactez-nous directement.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom complet</label>
                    <Input placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="votre@email.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Sujet</label>
                  <Input placeholder="De quoi s'agit-il ?" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Décrivez votre question ou problème en détail..."
                    rows={5}
                  />
                </div>
                <Button className="w-full">Envoyer le message</Button>
              </CardContent>
            </Card>
          </section>

          {/* Business Hours */}
          <section>
            <Card className="bg-primary/5">
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h2 className="text-2xl font-bold mb-4">Horaires d'ouverture</h2>
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

        <Footer />
      </div>
    </>
  );
}