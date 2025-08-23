import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const faqCategories = [
    {
      title: "Commandes et Livraison",
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          question: "Quels sont vos délais de livraison ?",
          answer: "Nous livrons sous 24-48h à Dakar et banlieue, 3-5 jours en région. Livraison gratuite à partir de 25 000 FCFA."
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Vous recevrez un SMS avec votre numéro de suivi. Vous pouvez aussi utiliser notre page de suivi en ligne avec votre numéro de commande."
        },
        {
          question: "Puis-je modifier ma commande ?",
          answer: "Vous pouvez modifier votre commande dans les 30 minutes suivant sa validation. Contactez-nous rapidement au 77 123 45 67."
        },
        {
          question: "Que faire si je ne suis pas disponible lors de la livraison ?",
          answer: "Notre livreur vous contactera avant la livraison. Vous pouvez reprogrammer ou désigner une personne de confiance pour réceptionner."
        }
      ]
    },
    {
      title: "Produits et Qualité",
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          question: "Vos produits sont-ils authentiques ?",
          answer: "Tous nos produits sont 100% authentiques. Nous nous approvisionnons directement auprès des marques officielles et distributeurs agréés."
        },
        {
          question: "Comment vérifier l'authenticité d'un produit ?",
          answer: "Chaque produit est accompagné de son certificat d'authenticité. Vous pouvez vérifier les codes-barres et hologrammes sur les emballages."
        },
        {
          question: "Quelle est la date de péremption des produits ?",
          answer: "Tous nos produits ont une durée de vie d'au moins 12 mois. Les dates sont clairement indiquées sur chaque article."
        },
        {
          question: "Proposez-vous des échantillons ?",
          answer: "Oui, nous offrons des échantillons gratuits avec certaines commandes et lors d'événements spéciaux."
        }
      ]
    },
    {
      title: "Paiement et Facturation",
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          question: "Quels moyens de paiement acceptez-vous ?",
          answer: "Nous acceptons Orange Money, Wave, Free Money, Visa/Mastercard et le paiement à la livraison."
        },
        {
          question: "Le paiement en ligne est-il sécurisé ?",
          answer: "Oui, toutes les transactions sont cryptées SSL. Nous ne stockons aucune donnée bancaire sur nos serveurs."
        },
        {
          question: "Puis-je payer en plusieurs fois ?",
          answer: "Nous proposons le paiement en 2 ou 3 fois sans frais pour les commandes supérieures à 50 000 FCFA."
        },
        {
          question: "Comment obtenir ma facture ?",
          answer: "Votre facture est envoyée automatiquement par email après validation du paiement. Vous pouvez aussi la télécharger depuis votre compte."
        }
      ]
    },
    {
      title: "Retours et Échanges",
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          question: "Quelle est votre politique de retour ?",
          answer: "Retours gratuits sous 14 jours pour les produits défectueux. Retours payants pour changement d'avis (3 000 FCFA)."
        },
        {
          question: "Comment retourner un produit ?",
          answer: "Contactez notre service client pour obtenir un numéro de retour. Renvoyez le produit dans son emballage d'origine."
        },
        {
          question: "Quand serai-je remboursé ?",
          answer: "Le remboursement est effectué sous 5-7 jours après réception et vérification du produit retourné."
        },
        {
          question: "Puis-je échanger un produit ?",
          answer: "Oui, les échanges sont possibles sous 14 jours. Les frais d'expédition de l'échange sont à votre charge."
        }
      ]
    },
    {
      title: "Compte Client",
      icon: <MessageCircle className="h-5 w-5" />,
      questions: [
        {
          question: "Comment créer un compte ?",
          answer: "Cliquez sur 'Mon Compte' puis 'Créer un compte'. Renseignez vos informations et validez par email."
        },
        {
          question: "J'ai oublié mon mot de passe",
          answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Vous recevrez un lien de réinitialisation par email."
        },
        {
          question: "Comment modifier mes informations ?",
          answer: "Connectez-vous à votre compte et allez dans 'Mes informations' pour modifier vos données personnelles."
        },
        {
          question: "Quels sont les avantages du compte client ?",
          answer: "Suivi de commandes, historique d'achats, liste de souhaits, offres exclusives et livraison plus rapide."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <Helmet>
        <title>FAQ - Questions Fréquentes | Flawless Beauty</title>
        <meta 
          name="description" 
          content="Trouvez rapidement les réponses à vos questions sur nos produits, livraisons, retours et paiements. Service client Flawless Beauty Sénégal." 
        />
        <meta name="keywords" content="FAQ, questions fréquentes, aide, support client, livraison, retours, paiement, Sénégal" />
        <link rel="canonical" href="https://flawlessbeauty.sn/faq" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Questions Fréquemment Posées
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Trouvez rapidement les réponses à vos questions. Notre équipe est là pour vous aider.
            </p>
          </div>

          {/* Search Section */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher dans la FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Content */}
          <div className="grid gap-8">
            {filteredCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {category.icon}
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {searchTerm && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Aucun résultat trouvé pour "{searchTerm}"
              </p>
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Effacer la recherche
              </Button>
            </div>
          )}

          {/* Contact Section */}
          <Card className="mt-12 bg-primary/5">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
              <p className="text-muted-foreground mb-6">
                Notre équipe de service client est là pour vous aider
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  77 123 45 67
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@flawlessbeauty.sn
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </>
  );
}