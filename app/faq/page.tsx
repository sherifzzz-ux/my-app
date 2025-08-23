import { Metadata } from 'next'
import Link from 'next/link'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Truck, CreditCard, RotateCcw, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - Questions Fréquentes - FlawlessBeauty',
  description: 'Trouvez les réponses à vos questions sur la livraison, les retours, les produits et plus encore.',
}

export default function FAQPage() {
  const faqSections = [
    {
      title: "Commandes & Livraison",
      icon: Truck,
      items: [
        {
          question: "Quels sont vos délais de livraison ?",
          answer: "Nous livrons en 24h à Dakar et en 2-3 jours ouvrés dans les autres régions du Sénégal. Les commandes passées avant 15h sont traitées le jour même."
        },
        {
          question: "La livraison est-elle gratuite ?",
          answer: "Oui, la livraison est gratuite pour toute commande de 25,000 CFA et plus. En dessous de ce montant, des frais de livraison de 2,500 CFA s'appliquent."
        },
        {
          question: "Puis-je modifier ma commande ?",
          answer: "Vous pouvez modifier votre commande dans les 2 heures suivant sa validation, à condition qu'elle ne soit pas encore en préparation. Contactez-nous au plus vite."
        },
        {
          question: "Comment suivre ma commande ?",
          answer: "Un email de suivi vous est envoyé avec votre numéro de commande. Vous pouvez également suivre votre commande depuis votre espace client."
        }
      ]
    },
    {
      title: "Paiement",
      icon: CreditCard,
      items: [
        {
          question: "Quels moyens de paiement acceptez-vous ?",
          answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), les paiements mobile (Orange Money, Wave) et les virements bancaires."
        },
        {
          question: "Le paiement est-il sécurisé ?",
          answer: "Absolument ! Tous nos paiements sont sécurisés avec un cryptage SSL 256-bit. Vos données bancaires ne sont jamais stockées sur nos serveurs."
        },
        {
          question: "Puis-je payer à la livraison ?",
          answer: "Le paiement à la livraison est disponible uniquement à Dakar pour les commandes de moins de 50,000 CFA, avec des frais supplémentaires de 1,000 CFA."
        }
      ]
    },
    {
      title: "Retours & Échanges",
      icon: RotateCcw,
      items: [
        {
          question: "Quelle est votre politique de retour ?",
          answer: "Vous pouvez retourner vos produits dans les 30 jours suivant la réception, à condition qu'ils soient non ouverts et dans leur emballage d'origine."
        },
        {
          question: "Comment effectuer un retour ?",
          answer: "Contactez notre service client pour obtenir un numéro de retour. Renvoyez ensuite le produit dans son emballage d'origine avec la facture."
        },
        {
          question: "Quand serai-je remboursé ?",
          answer: "Le remboursement est effectué dans les 5-7 jours ouvrés après réception et vérification du produit retourné."
        }
      ]
    },
    {
      title: "Produits & Authenticité",
      icon: Shield,
      items: [
        {
          question: "Vos produits sont-ils authentiques ?",
          answer: "Oui, tous nos produits sont 100% authentiques et proviennent directement des marques ou de distributeurs officiels agréés."
        },
        {
          question: "Comment vérifier l'authenticité d'un produit ?",
          answer: "Chaque produit est accompagné d'un certificat d'authenticité. Vous pouvez également vérifier les codes-barres et numéros de série sur les sites des marques."
        },
        {
          question: "Que faire si je reçois un produit défectueux ?",
          answer: "Contactez-nous immédiatement avec des photos du produit. Nous procéderons à un échange ou remboursement complet sans frais."
        },
        {
          question: "Puis-je obtenir des conseils produits ?",
          answer: "Bien sûr ! Notre équipe beauté est disponible pour vous conseiller par chat, email ou téléphone. N'hésitez pas à nous contacter."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-playfair mb-4">Questions Fréquentes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions les plus courantes
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqSections.map((section, sectionIndex) => (
            <Card key={sectionIndex}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <section.icon className="w-6 h-6 text-primary" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`item-${sectionIndex}-${itemIndex}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}

          {/* Contact section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vous ne trouvez pas votre réponse ?</h3>
              <p className="text-muted-foreground mb-6">
                Notre équipe est là pour vous aider ! Contactez-nous et nous vous répondrons rapidement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Nous contacter
                </Link>
                <a 
                  href="mailto:contact@flawlessbeauty.sn" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                >
                  Envoyer un email
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
