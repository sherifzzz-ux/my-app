// Données de test pour la page À Propos

export interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image: string
  expertise: string[]
  socialMedia?: {
    linkedin?: string
    instagram?: string
    twitter?: string
  }
}

export interface CompanyValue {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

export interface CompanyMilestone {
  id: string
  year: string
  title: string
  description: string
  image?: string
}

export interface CompanyStat {
  id: string
  value: string
  label: string
  icon: string
  description: string
}

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Marie Dubois',
    position: 'Fondatrice & CEO',
    bio: 'Passionnée de beauté depuis plus de 15 ans, Marie a créé Mami Shop avec la vision de démocratiser l\'accès aux meilleurs produits de beauté.',
    image: '/team/marie-dubois.jpg',
    expertise: ['Stratégie', 'Innovation', 'Leadership'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/marie-dubois',
      instagram: '@marie_dubois'
    }
  },
  {
    id: '2',
    name: 'Sophie Martin',
    position: 'Directrice Marketing',
    bio: 'Experte en marketing digital et communication, Sophie développe nos stratégies pour toucher et engager notre communauté.',
    image: '/team/sophie-martin.jpg',
    expertise: ['Marketing Digital', 'Communication', 'Branding'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/sophie-martin',
      instagram: '@sophie_martin'
    }
  },
  {
    id: '3',
    name: 'Dr. Claire Lefebvre',
    position: 'Experte Beauté',
    bio: 'Dermatologue et experte en cosmétologie, Claire valide tous nos produits et conseille nos clients sur les meilleures routines.',
    image: '/team/claire-lefebvre.jpg',
    expertise: ['Dermatologie', 'Cosmétologie', 'Conseils'],
    socialMedia: {
      linkedin: 'https://linkedin.com/in/claire-lefebvre'
    }
  },
  {
    id: '4',
    name: 'Emma Rousseau',
    position: 'Responsable Produits',
    bio: 'Spécialiste des tendances beauté, Emma sélectionne les meilleurs produits et négocie avec nos partenaires marques.',
    image: '/team/emma-rousseau.jpg',
    expertise: ['Sourcing', 'Tendances', 'Négociation'],
    socialMedia: {
      instagram: '@emma_rousseau'
    }
  }
]

export const companyValues: CompanyValue[] = [
  {
    id: '1',
    title: 'Qualité',
    description: 'Nous sélectionnons uniquement les meilleurs produits, testés et approuvés par nos experts.',
    icon: '⭐',
    color: 'text-yellow-500'
  },
  {
    id: '2',
    title: 'Transparence',
    description: 'Nous croyons en la transparence totale sur la composition et l\'origine de nos produits.',
    icon: '🔍',
    color: 'text-blue-500'
  },
  {
    id: '3',
    title: 'Innovation',
    description: 'Nous sommes toujours à la pointe des dernières innovations en matière de beauté.',
    icon: '💡',
    color: 'text-purple-500'
  },
  {
    id: '4',
    title: 'Durabilité',
    description: 'Nous privilégions les marques engagées pour une beauté respectueuse de l\'environnement.',
    icon: '🌱',
    color: 'text-green-500'
  },
  {
    id: '5',
    title: 'Accessibilité',
    description: 'Nous rendons la beauté accessible à tous, avec des prix justes et des conseils personnalisés.',
    icon: '🤝',
    color: 'text-pink-500'
  },
  {
    id: '6',
    title: 'Expertise',
    description: 'Notre équipe d\'experts vous accompagne dans vos choix pour une beauté éclairée.',
    icon: '🎓',
    color: 'text-indigo-500'
  }
]

export const companyMilestones: CompanyMilestone[] = [
  {
    id: '1',
    year: '2020',
    title: 'Création de Mami Shop',
    description: 'Marie Dubois fonde Mami Shop avec la vision de démocratiser l\'accès aux meilleurs produits de beauté.',
    image: '/milestones/2020-creation.jpg'
  },
  {
    id: '2',
    year: '2021',
    title: 'Premier Partenariat',
    description: 'Signature de notre premier partenariat avec une marque de luxe française.',
    image: '/milestones/2021-partenariat.jpg'
  },
  {
    id: '3',
    year: '2022',
    title: 'Expansion Internationale',
    description: 'Ouverture de notre marketplace à l\'international avec 5 nouveaux pays.',
    image: '/milestones/2022-expansion.jpg'
  },
  {
    id: '4',
    year: '2023',
    title: 'Innovation Technologique',
    description: 'Lancement de notre application mobile et de notre système de conseils personnalisés.',
    image: '/milestones/2023-innovation.jpg'
  },
  {
    id: '5',
    year: '2024',
    title: 'Engagement Durable',
    description: 'Lancement de notre programme de beauté durable et de nos initiatives écologiques.',
    image: '/milestones/2024-durable.jpg'
  }
]

export const companyStats: CompanyStat[] = [
  {
    id: '1',
    value: '50K+',
    label: 'Clients Satisfaits',
    icon: '👥',
    description: 'Plus de 50 000 clients nous font confiance pour leur beauté'
  },
  {
    id: '2',
    value: '500+',
    label: 'Marques Partenaires',
    icon: '🏷️',
    description: 'Un réseau de plus de 500 marques de beauté de qualité'
  },
  {
    id: '3',
    value: '10K+',
    label: 'Produits Disponibles',
    icon: '💄',
    description: 'Une sélection de plus de 10 000 produits soigneusement choisis'
  },
  {
    id: '4',
    value: '4.9/5',
    label: 'Note Client',
    icon: '⭐',
    description: 'Une satisfaction client exceptionnelle avec une note de 4.9/5'
  },
  {
    id: '5',
    value: '24/7',
    label: 'Support Client',
    icon: '🕒',
    description: 'Un support client disponible 24h/24 et 7j/7'
  },
  {
    id: '6',
    value: '15',
    label: 'Pays Desservis',
    icon: '🌍',
    description: 'Une présence internationale dans 15 pays'
  }
]

export const companyStory = {
  title: 'Notre Histoire',
  content: `Mami Shop est née d'une passion : celle de rendre la beauté accessible à toutes et tous. Fondée en 2020 par Marie Dubois, notre entreprise a grandi avec une vision claire : démocratiser l'accès aux meilleurs produits de beauté tout en offrant des conseils d'experts personnalisés.

Notre aventure a commencé dans un petit bureau parisien, avec une équipe de 3 personnes partageant la même conviction : la beauté ne doit pas être un luxe réservé à quelques-uns. Aujourd'hui, nous sommes fiers de compter plus de 50 000 clients satisfaits et de travailler avec plus de 500 marques partenaires.

Chez Mami Shop, nous croyons que chaque personne mérite de se sentir belle et confiante. C'est pourquoi nous sélectionnons rigoureusement nos produits, testons leur efficacité et offrons des conseils personnalisés adaptés à chaque type de peau et à chaque besoin.

Notre engagement va au-delà de la simple vente de produits. Nous nous efforçons de créer une communauté où la beauté rime avec bien-être, durabilité et innovation. Chaque jour, nous travaillons pour vous offrir une expérience d'achat exceptionnelle et des produits qui vous font du bien.`
}

export const companyMission = {
  title: 'Notre Mission',
  content: `Notre mission est de révolutionner l'expérience beauté en combinant expertise, innovation et accessibilité. Nous nous engageons à :

• **Sélectionner les meilleurs produits** : Notre équipe d'experts teste et valide chaque produit avant de l'ajouter à notre catalogue.

• **Offrir des conseils personnalisés** : Nos dermatologues et experts beauté vous accompagnent dans vos choix pour une routine adaptée à vos besoins.

• **Promouvoir une beauté durable** : Nous privilégions les marques engagées pour l'environnement et les produits respectueux de la planète.

• **Démocratiser l'accès à la beauté** : Nous rendons les meilleurs produits accessibles à tous, avec des prix justes et transparents.

• **Créer une communauté** : Nous construisons un espace où chacun peut partager ses expériences et découvrir de nouveaux produits.

Chez Mami Shop, nous croyons que la beauté est un droit, pas un privilège. C'est pourquoi nous nous efforçons chaque jour de vous offrir le meilleur de la beauté, avec passion et expertise.`
}
