// Données de test pour la page Idées Cadeaux

export interface GiftIdea {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  occasion: string[]
  recipient: string[]
  budget: 'Économique' | 'Modéré' | 'Premium' | 'Luxe'
  rating: number
  reviews: number
  tags: string[]
  inStock: boolean
  isNew?: boolean
  isPopular?: boolean
  isLimited?: boolean
  giftType: 'Produit' | 'Coffret' | 'Abonnement' | 'Expérience'
  size?: string
  brand?: string
  benefits: string[]
  personalization?: string[]
  wrapping?: boolean
  message?: boolean
}

export interface GiftOccasion {
  id: string
  name: string
  description: string
  icon: string
  color: string
  date?: string
  count: number
  popularGifts: string[]
  tips: string[]
}

export interface GiftCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  count: number
  subcategories: string[]
  popularFor: string[]
}

export interface GiftRecipient {
  id: string
  name: string
  description: string
  icon: string
  color: string
  preferences: string[]
  budget: string[]
  popularCategories: string[]
}

export const giftOccasions: GiftOccasion[] = [
  {
    id: 'anniversaire',
    name: 'Anniversaire',
    description: 'Célébrez un autre tour du soleil avec des cadeaux mémorables',
    icon: '🎂',
    color: 'text-pink-500',
    count: 45,
    popularGifts: ['Parfums', 'Coffrets beauté', 'Bijoux', 'Accessoires'],
    tips: [
      'Choisissez selon les goûts de la personne',
      'Considérez l\'âge et les préférences',
      'Ajoutez une touche personnelle'
    ]
  },
  {
    id: 'saint-valentin',
    name: 'Saint-Valentin',
    description: 'Exprimez votre amour avec des cadeaux romantiques',
    icon: '💕',
    color: 'text-red-500',
    date: '14 février',
    count: 32,
    popularGifts: ['Parfums romantiques', 'Coffrets spa', 'Bijoux', 'Lingerie'],
    tips: [
      'Privilégiez les cadeaux intimes',
      'Choisissez des parfums sensuels',
      'Ajoutez une note personnelle'
    ]
  },
  {
    id: 'noel',
    name: 'Noël',
    description: 'Faites plaisir à vos proches avec des cadeaux de Noël',
    icon: '🎄',
    color: 'text-green-500',
    date: '25 décembre',
    count: 58,
    popularGifts: ['Coffrets de Noël', 'Parfums', 'Produits de luxe', 'Accessoires'],
    tips: [
      'Planifiez à l\'avance',
      'Choisissez des coffrets variés',
      'Pensez à l\'emballage cadeau'
    ]
  },
  {
    id: 'fete-des-meres',
    name: 'Fête des Mères',
    description: 'Gâtez votre maman avec des cadeaux attentionnés',
    icon: '👩‍👧‍👦',
    color: 'text-purple-500',
    date: 'Dernier dimanche de mai',
    count: 28,
    popularGifts: ['Soins visage', 'Parfums élégants', 'Coffrets spa', 'Bijoux'],
    tips: [
      'Choisissez des produits de qualité',
      'Privilégiez le confort et le bien-être',
      'Ajoutez une carte personnalisée'
    ]
  },
  {
    id: 'fete-des-peres',
    name: 'Fête des Pères',
    description: 'Honorez votre papa avec des cadeaux masculins',
    icon: '👨‍👧‍👦',
    color: 'text-blue-500',
    date: 'Troisième dimanche de juin',
    count: 22,
    popularGifts: ['Parfums masculins', 'Soins barbe', 'Accessoires', 'Coffrets'],
    tips: [
      'Choisissez des parfums masculins',
      'Privilégiez la praticité',
      'Considérez ses hobbies'
    ]
  },
  {
    id: 'mariage',
    name: 'Mariage',
    description: 'Célébrez l\'union avec des cadeaux de mariage',
    icon: '💍',
    color: 'text-yellow-500',
    count: 35,
    popularGifts: ['Coffrets de mariage', 'Parfums de luxe', 'Bijoux', 'Accessoires'],
    tips: [
      'Choisissez des cadeaux durables',
      'Privilégiez la qualité',
      'Considérez le style du couple'
    ]
  },
  {
    id: 'naissance',
    name: 'Naissance',
    description: 'Accueillez bébé avec des cadeaux tendres',
    icon: '👶',
    color: 'text-cyan-500',
    count: 18,
    popularGifts: ['Soins bébé', 'Parfums doux', 'Accessoires', 'Coffrets'],
    tips: [
      'Choisissez des produits hypoallergéniques',
      'Privilégiez la douceur',
      'Considérez l\'âge de bébé'
    ]
  },
  {
    id: 'diplome',
    name: 'Diplôme',
    description: 'Félicitez le nouveau diplômé avec des cadeaux de réussite',
    icon: '🎓',
    color: 'text-indigo-500',
    count: 15,
    popularGifts: ['Parfums professionnels', 'Accessoires', 'Coffrets', 'Bijoux'],
    tips: [
      'Choisissez des cadeaux professionnels',
      'Privilégiez la qualité',
      'Considérez le domaine d\'études'
    ]
  }
]

export const giftCategories: GiftCategory[] = [
  {
    id: 'coffrets',
    name: 'Coffrets',
    description: 'Sélections soigneusement composées pour tous les goûts',
    icon: '🎁',
    color: 'text-pink-500',
    count: 25,
    subcategories: ['Coffrets beauté', 'Coffrets parfums', 'Coffrets spa', 'Coffrets découverte'],
    popularFor: ['Anniversaire', 'Noël', 'Fête des Mères', 'Saint-Valentin']
  },
  {
    id: 'parfums',
    name: 'Parfums',
    description: 'Fragrances emblématiques pour toutes les occasions',
    icon: '🌸',
    color: 'text-purple-500',
    count: 40,
    subcategories: ['Parfums féminins', 'Parfums masculins', 'Parfums unisexes', 'Eaux de toilette'],
    popularFor: ['Anniversaire', 'Saint-Valentin', 'Noël', 'Mariage']
  },
  {
    id: 'soins',
    name: 'Soins',
    description: 'Produits de beauté pour prendre soin de soi',
    icon: '✨',
    color: 'text-blue-500',
    count: 35,
    subcategories: ['Soins visage', 'Soins corps', 'Soins cheveux', 'Soins mains'],
    popularFor: ['Fête des Mères', 'Anniversaire', 'Noël', 'Naissance']
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    description: 'Produits de maquillage pour sublimer la beauté',
    icon: '💄',
    color: 'text-red-500',
    count: 30,
    subcategories: ['Rouge à lèvres', 'Palettes', 'Fond de teint', 'Accessoires'],
    popularFor: ['Anniversaire', 'Saint-Valentin', 'Noël', 'Mariage']
  },
  {
    id: 'bijoux',
    name: 'Bijoux',
    description: 'Accessoires précieux pour toutes les occasions',
    icon: '💎',
    color: 'text-yellow-500',
    count: 20,
    subcategories: ['Colliers', 'Boucles d\'oreilles', 'Bracelets', 'Montres'],
    popularFor: ['Anniversaire', 'Mariage', 'Noël', 'Diplôme']
  },
  {
    id: 'accessoires',
    name: 'Accessoires',
    description: 'Accessoires de mode et beauté tendance',
    icon: '👜',
    color: 'text-green-500',
    count: 25,
    subcategories: ['Sacs', 'Écharpes', 'Chapeaux', 'Accessoires beauté'],
    popularFor: ['Anniversaire', 'Noël', 'Mariage', 'Diplôme']
  }
]

export const giftRecipients: GiftRecipient[] = [
  {
    id: 'femme',
    name: 'Femme',
    description: 'Cadeaux élégants et raffinés pour elle',
    icon: '👩',
    color: 'text-pink-500',
    preferences: ['Parfums', 'Soins', 'Maquillage', 'Bijoux'],
    budget: ['Modéré', 'Premium', 'Luxe'],
    popularCategories: ['Parfums', 'Coffrets', 'Soins', 'Bijoux']
  },
  {
    id: 'homme',
    name: 'Homme',
    description: 'Cadeaux sophistiqués et masculins',
    icon: '👨',
    color: 'text-blue-500',
    preferences: ['Parfums', 'Soins', 'Accessoires', 'Coffrets'],
    budget: ['Modéré', 'Premium', 'Luxe'],
    popularCategories: ['Parfums', 'Soins', 'Accessoires', 'Coffrets']
  },
  {
    id: 'adolescente',
    name: 'Adolescente',
    description: 'Cadeaux tendance pour les jeunes filles',
    icon: '👧',
    color: 'text-purple-500',
    preferences: ['Maquillage', 'Soins', 'Accessoires', 'Parfums'],
    budget: ['Économique', 'Modéré'],
    popularCategories: ['Maquillage', 'Soins', 'Accessoires', 'Parfums']
  },
  {
    id: 'adolescent',
    name: 'Adolescent',
    description: 'Cadeaux cool pour les jeunes garçons',
    icon: '👦',
    color: 'text-green-500',
    preferences: ['Soins', 'Accessoires', 'Parfums', 'Coffrets'],
    budget: ['Économique', 'Modéré'],
    popularCategories: ['Soins', 'Accessoires', 'Parfums', 'Coffrets']
  },
  {
    id: 'bebe',
    name: 'Bébé',
    description: 'Cadeaux doux et tendres pour bébé',
    icon: '👶',
    color: 'text-cyan-500',
    preferences: ['Soins', 'Accessoires', 'Coffrets'],
    budget: ['Économique', 'Modéré'],
    popularCategories: ['Soins', 'Accessoires', 'Coffrets']
  },
  {
    id: 'senior',
    name: 'Senior',
    description: 'Cadeaux élégants pour les personnes âgées',
    icon: '👴',
    color: 'text-gray-500',
    preferences: ['Parfums', 'Soins', 'Bijoux', 'Accessoires'],
    budget: ['Modéré', 'Premium', 'Luxe'],
    popularCategories: ['Parfums', 'Soins', 'Bijoux', 'Accessoires']
  }
]

export const giftIdeas: GiftIdea[] = [
  {
    id: '1',
    name: 'Coffret Découverte Chanel',
    description: 'Coffret luxueux contenant les parfums iconiques de Chanel',
    price: 89.90,
    originalPrice: 120.00,
    image: '/idees-cadeaux/coffret-chanel.jpg',
    category: 'Coffrets',
    occasion: ['Anniversaire', 'Noël', 'Mariage'],
    recipient: ['Femme', 'Senior'],
    budget: 'Premium',
    rating: 4.8,
    reviews: 156,
    tags: ['Luxe', 'Iconique', 'Chanel'],
    inStock: true,
    isPopular: true,
    giftType: 'Coffret',
    size: '5 x 7.5ml',
    brand: 'Chanel',
    benefits: [
      'Parfums iconiques',
      'Format voyage',
      'Emballage luxueux',
      'Valeur exceptionnelle'
    ],
    personalization: ['Message personnalisé', 'Emballage cadeau'],
    wrapping: true,
    message: true
  },
  {
    id: '2',
    name: 'Parfum Dior Sauvage',
    description: 'Parfum masculin sauvage et moderne',
    price: 95.00,
    image: '/idees-cadeaux/dior-sauvage.jpg',
    category: 'Parfums',
    occasion: ['Anniversaire', 'Saint-Valentin', 'Noël'],
    recipient: ['Homme', 'Adolescent'],
    budget: 'Premium',
    rating: 4.7,
    reviews: 234,
    tags: ['Masculin', 'Moderne', 'Sauvage'],
    inStock: true,
    isPopular: true,
    giftType: 'Produit',
    size: '100ml',
    brand: 'Dior',
    benefits: [
      'Fragrance masculine',
      'Tenue longue',
      'Sillage remarquable',
      'Bouteille élégante'
    ],
    personalization: ['Message personnalisé', 'Emballage cadeau'],
    wrapping: true,
    message: true
  },
  {
    id: '3',
    name: 'Coffret Spa Relaxant',
    description: 'Coffret complet pour un moment de détente absolue',
    price: 45.90,
    image: '/idees-cadeaux/coffret-spa.jpg',
    category: 'Coffrets',
    occasion: ['Fête des Mères', 'Anniversaire', 'Noël'],
    recipient: ['Femme', 'Senior'],
    budget: 'Modéré',
    rating: 4.6,
    reviews: 189,
    tags: ['Spa', 'Relaxant', 'Bien-être'],
    inStock: true,
    giftType: 'Coffret',
    size: 'Coffret complet',
    brand: 'L\'Occitane',
    benefits: [
      'Moment de détente',
      'Produits de qualité',
      'Routine complète',
      'Emballage élégant'
    ],
    personalization: ['Message personnalisé', 'Emballage cadeau'],
    wrapping: true,
    message: true
  },
  {
    'id': '4',
    name: 'Rouge à Lèvres Rouge Passion',
    description: 'Rouge à lèvres rouge intense pour un look glamour',
    price: 28.90,
    image: '/idees-cadeaux/rouge-levres-rouge.jpg',
    category: 'Maquillage',
    occasion: ['Saint-Valentin', 'Anniversaire', 'Noël'],
    recipient: ['Femme', 'Adolescente'],
    budget: 'Modéré',
    rating: 4.5,
    reviews: 167,
    tags: ['Rouge', 'Intense', 'Glamour'],
    inStock: true,
    isNew: true,
    giftType: 'Produit',
    size: '3.5g',
    brand: 'Yves Saint Laurent',
    benefits: [
      'Couleur intense',
      'Tenue longue',
      'Formule hydratante',
      'Finition satinée'
    ],
    personalization: ['Message personnalisé', 'Emballage cadeau'],
    wrapping: true,
    message: true
  },
  {
    id: '5',
    name: 'Coffret Soins Bébé',
    description: 'Coffret doux et tendre pour bébé',
    price: 32.90,
    image: '/idees-cadeaux/coffret-bebe.jpg',
    category: 'Soins',
    occasion: ['Naissance', 'Noël', 'Anniversaire'],
    recipient: ['Bébé'],
    budget: 'Modéré',
    rating: 4.7,
    reviews: 98,
    tags: ['Bébé', 'Doux', 'Hypoallergénique'],
    inStock: true,
    giftType: 'Coffret',
    size: 'Coffret complet',
    brand: 'Mustela',
    benefits: [
      'Produits hypoallergéniques',
      'Formule douce',
      'Routine complète',
      'Emballage adorable'
    ],
    personalization: ['Message personnalisé', 'Emballage cadeau'],
    wrapping: true,
    message: true
  },
  {
    id: '6',
    name: 'Montre Élégante',
    description: 'Montre élégante et raffinée pour toutes les occasions',
    price: 150.00,
    image: '/idees-cadeaux/montre-elegante.jpg',
    category: 'Bijoux',
    occasion: ['Anniversaire', 'Mariage', 'Diplôme'],
    recipient: ['Femme', 'Homme', 'Senior'],
    budget: 'Luxe',
    rating: 4.8,
    reviews: 145,
    tags: ['Élégant', 'Raffiné', 'Luxe'],
    inStock: true,
    isLimited: true,
    giftType: 'Produit',
    size: '38mm',
    brand: 'Fossil',
    benefits: [
      'Design élégant',
      'Qualité supérieure',
      'Polyvalence',
      'Emballage luxueux'
    ],
    personalization: ['Message personnalisé', 'Emballage cadeau'],
    wrapping: true,
    message: true
  }
]

export const giftStats = {
  totalGifts: 120,
  totalOccasions: 8,
  totalCategories: 6,
  totalRecipients: 6,
  averageRating: 4.6,
  totalReviews: 3200,
  popularGifts: 25,
  limitedEditions: 15
}
