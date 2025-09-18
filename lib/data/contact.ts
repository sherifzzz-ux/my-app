// Données de test pour la page Contact

export interface ContactInfo {
  id: string
  type: 'phone' | 'email' | 'address' | 'hours' | 'social'
  title: string
  value: string
  icon: string
  description?: string
  link?: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category: 'general' | 'support' | 'sales' | 'partnership' | 'other'
  priority: 'low' | 'medium' | 'high'
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  isPopular: boolean
}

export const contactInfo: ContactInfo[] = [
  {
    id: '1',
    type: 'phone',
    title: 'Téléphone',
    value: '+33 1 23 45 67 89',
    icon: '📞',
    description: 'Du lundi au vendredi de 9h à 18h',
    link: 'tel:+33123456789'
  },
  {
    id: '2',
    type: 'email',
    title: 'Email',
    value: 'contact@mami-shop.fr',
    icon: '📧',
    description: 'Réponse sous 24h',
    link: 'mailto:contact@mami-shop.fr'
  },
  {
    id: '3',
    type: 'address',
    title: 'Adresse',
    value: '123 Rue de la Beauté, 75001 Paris',
    icon: '📍',
    description: 'Boutique physique ouverte du lundi au samedi'
  },
  {
    id: '4',
    type: 'hours',
    title: 'Horaires',
    value: 'Lun-Ven: 9h-18h, Sam: 10h-17h',
    icon: '🕒',
    description: 'Fermé le dimanche'
  },
  {
    id: '5',
    type: 'social',
    title: 'Réseaux Sociaux',
    value: '@mami_shop',
    icon: '📱',
    description: 'Suivez-nous pour les dernières nouveautés',
    link: 'https://instagram.com/mami_shop'
  }
]

export const contactCategories = [
  {
    id: 'general',
    name: 'Question générale',
    description: 'Pour toute question générale sur nos produits ou services',
    icon: '💬'
  },
  {
    id: 'support',
    name: 'Support technique',
    description: 'Aide avec votre commande ou problème technique',
    icon: '🔧'
  },
  {
    id: 'sales',
    name: 'Ventes',
    description: 'Questions sur nos produits, prix ou disponibilité',
    icon: '💰'
  },
  {
    id: 'partnership',
    name: 'Partenariat',
    description: 'Propositions de collaboration ou partenariat',
    icon: '🤝'
  },
  {
    id: 'other',
    name: 'Autre',
    description: 'Autres questions ou demandes',
    icon: '❓'
  }
]

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'Comment passer une commande ?',
    answer: 'Pour passer une commande, ajoutez vos produits au panier, puis procédez au checkout. Vous pouvez payer par carte bancaire, PayPal ou virement bancaire.',
    category: 'general',
    isPopular: true
  },
  {
    id: '2',
    question: 'Quels sont les délais de livraison ?',
    answer: 'Les délais de livraison varient selon votre localisation : 2-3 jours ouvrés pour la France métropolitaine, 5-7 jours pour l\'outre-mer.',
    category: 'general',
    isPopular: true
  },
  {
    id: '3',
    question: 'Puis-je retourner un produit ?',
    answer: 'Oui, vous avez 14 jours pour retourner un produit non utilisé et dans son emballage d\'origine. Les frais de retour sont à votre charge.',
    category: 'support',
    isPopular: true
  },
  {
    id: '4',
    question: 'Comment suivre ma commande ?',
    answer: 'Vous recevrez un email de confirmation avec un numéro de suivi. Vous pouvez également suivre votre commande dans votre espace client.',
    category: 'support',
    isPopular: false
  },
  {
    id: '5',
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal, et les virements bancaires.',
    category: 'general',
    isPopular: false
  },
  {
    id: '6',
    question: 'Proposez-vous des conseils beauté personnalisés ?',
    answer: 'Oui, notre équipe d\'experts beauté peut vous conseiller selon votre type de peau et vos besoins. Contactez-nous pour un conseil personnalisé.',
    category: 'sales',
    isPopular: true
  },
  {
    id: '7',
    question: 'Comment devenir partenaire ?',
    answer: 'Nous sommes toujours à la recherche de nouveaux partenaires. Contactez-nous via le formulaire de contact en sélectionnant "Partenariat".',
    category: 'partnership',
    isPopular: false
  },
  {
    id: '8',
    question: 'Vos produits sont-ils testés sur les animaux ?',
    answer: 'Non, nous ne testons aucun de nos produits sur les animaux. Nous privilégions des méthodes alternatives et des marques cruelty-free.',
    category: 'general',
    isPopular: false
  }
]

export const supportHours = [
  { day: 'Lundi', hours: '9h00 - 18h00' },
  { day: 'Mardi', hours: '9h00 - 18h00' },
  { day: 'Mercredi', hours: '9h00 - 18h00' },
  { day: 'Jeudi', hours: '9h00 - 18h00' },
  { day: 'Vendredi', hours: '9h00 - 18h00' },
  { day: 'Samedi', hours: '10h00 - 17h00' },
  { day: 'Dimanche', hours: 'Fermé' }
]

export const responseTimes = [
  { category: 'Support technique', time: '2-4 heures' },
  { category: 'Questions générales', time: '24 heures' },
  { category: 'Ventes', time: '4-8 heures' },
  { category: 'Partenariat', time: '48-72 heures' }
]
