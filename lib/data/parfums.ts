// Données de test pour la page Parfums

export interface Parfum {
  id: string
  name: string
  brand: string
  concentration: 'Eau de Cologne' | 'Eau de Toilette' | 'Eau de Parfum' | 'Parfum' | 'Extrait'
  family: 'Floral' | 'Oriental' | 'Boisé' | 'Frais' | 'Gourmand' | 'Chypré' | 'Fougère' | 'Aquatique'
  gender: 'Femme' | 'Homme' | 'Unisexe'
  price: number
  originalPrice?: number
  image: string
  description: string
  notes: {
    top: string[]
    heart: string[]
    base: string[]
  }
  size: number
  inStock: boolean
  isNew?: boolean
  isLimited?: boolean
  rating: number
  reviews: number
  tags: string[]
  year: number
  perfumer: string
  country: string
  intensity: 'Léger' | 'Modéré' | 'Intense' | 'Très Intense'
  longevity: 'Court' | 'Moyen' | 'Long' | 'Très Long'
  sillage: 'Intime' | 'Modéré' | 'Important' | 'Très Important'
}

export interface ParfumCategory {
  id: string
  name: string
  description: string
  icon: string
  count: number
}

export interface OlfactiveFamily {
  id: string
  name: string
  description: string
  characteristics: string[]
  icon: string
  color: string
}

export const parfumCategories: ParfumCategory[] = [
  {
    id: 'femme',
    name: 'Femme',
    description: 'Parfums féminins élégants et raffinés',
    icon: '🌸',
    count: 45
  },
  {
    id: 'homme',
    name: 'Homme',
    description: 'Parfums masculins sophistiqués',
    icon: '🌿',
    count: 38
  },
  {
    id: 'unisexe',
    name: 'Unisexe',
    description: 'Parfums pour tous, sans distinction de genre',
    icon: '⚖️',
    count: 22
  },
  {
    id: 'eau-de-parfum',
    name: 'Eau de Parfum',
    description: 'Concentration élevée pour une tenue longue',
    icon: '💎',
    count: 52
  },
  {
    id: 'eau-de-toilette',
    name: 'Eau de Toilette',
    description: 'Concentration modérée, idéale au quotidien',
    icon: '💧',
    count: 35
  },
  {
    id: 'parfum',
    name: 'Parfum',
    description: 'Concentration maximale, luxe absolu',
    icon: '👑',
    count: 18
  }
]

export const olfactiveFamilies: OlfactiveFamily[] = [
  {
    id: 'floral',
    name: 'Floral',
    description: 'Notes de fleurs fraîches et romantiques',
    characteristics: ['Romantique', 'Féminin', 'Frais', 'Délicat'],
    icon: '🌹',
    color: 'text-pink-500'
  },
  {
    id: 'oriental',
    name: 'Oriental',
    description: 'Notes chaudes et épicées, mystérieuses',
    characteristics: ['Chaud', 'Épicé', 'Mystérieux', 'Sensuel'],
    icon: '🌶️',
    color: 'text-orange-500'
  },
  {
    id: 'boise',
    name: 'Boisé',
    description: 'Notes de bois nobles et chaleureuses',
    characteristics: ['Chaleureux', 'Noble', 'Masculin', 'Sophistiqué'],
    icon: '🌳',
    color: 'text-amber-600'
  },
  {
    id: 'frais',
    name: 'Frais',
    description: 'Notes fraîches et vivifiantes',
    characteristics: ['Frais', 'Vivifiant', 'Pur', 'Énergisant'],
    icon: '🍃',
    color: 'text-green-500'
  },
  {
    id: 'gourmand',
    name: 'Gourmand',
    description: 'Notes sucrées et gourmandes',
    characteristics: ['Sucré', 'Gourmand', 'Réconfortant', 'Délicieux'],
    icon: '🍰',
    color: 'text-yellow-500'
  },
  {
    id: 'chypre',
    name: 'Chypré',
    description: 'Notes de mousse de chêne et bergamote',
    characteristics: ['Élégant', 'Sophistiqué', 'Intemporel', 'Raffiné'],
    icon: '🍂',
    color: 'text-amber-700'
  },
  {
    id: 'fougere',
    name: 'Fougère',
    description: 'Notes de fougère et lavande',
    characteristics: ['Classique', 'Masculin', 'Propre', 'Traditionnel'],
    icon: '🌿',
    color: 'text-green-600'
  },
  {
    id: 'aquatique',
    name: 'Aquatique',
    description: 'Notes marines et aquatiques',
    characteristics: ['Marin', 'Aquatique', 'Frais', 'Moderne'],
    icon: '🌊',
    color: 'text-blue-500'
  }
]

export const parfums: Parfum[] = [
  {
    id: '1',
    name: 'Chanel No. 5',
    brand: 'Chanel',
    concentration: 'Eau de Parfum',
    family: 'Floral',
    gender: 'Femme',
    price: 120,
    originalPrice: 140,
    image: '/parfums/chanel-no5.jpg',
    description: 'Le parfum iconique de Chanel, un bouquet floral sophistiqué et intemporel.',
    notes: {
      top: ['Aldéhydes', 'Ylang-Ylang', 'Néroli'],
      heart: ['Rose', 'Jasmin', 'Lily of the Valley'],
      base: ['Santal', 'Vétiver', 'Vanille', 'Mousse de chêne']
    },
    size: 100,
    inStock: true,
    isNew: false,
    rating: 4.8,
    reviews: 1250,
    tags: ['Iconique', 'Luxe', 'Intemporel'],
    year: 1921,
    perfumer: 'Ernest Beaux',
    country: 'France',
    intensity: 'Intense',
    longevity: 'Long',
    sillage: 'Important'
  },
  {
    id: '2',
    name: 'Dior Sauvage',
    brand: 'Dior',
    concentration: 'Eau de Toilette',
    family: 'Frais',
    gender: 'Homme',
    price: 85,
    image: '/parfums/dior-sauvage.jpg',
    description: 'Un parfum sauvage et moderne, alliant fraîcheur et caractère.',
    notes: {
      top: ['Calabrian Bergamot', 'Pink Pepper'],
      heart: ['Sichuan Pepper', 'Lavender', 'Patchouli', 'Vetiver'],
      base: ['Ambroxan', 'Cedar']
    },
    size: 100,
    inStock: true,
    isNew: false,
    rating: 4.6,
    reviews: 2100,
    tags: ['Moderne', 'Sauvage', 'Masculin'],
    year: 2015,
    perfumer: 'François Demachy',
    country: 'France',
    intensity: 'Intense',
    longevity: 'Long',
    sillage: 'Important'
  },
  {
    id: '3',
    name: 'Tom Ford Black Orchid',
    brand: 'Tom Ford',
    concentration: 'Eau de Parfum',
    family: 'Oriental',
    gender: 'Unisexe',
    price: 180,
    image: '/parfums/tom-ford-black-orchid.jpg',
    description: 'Un parfum mystérieux et sensuel, alliant orchidée noire et épices.',
    notes: {
      top: ['Black Pepper', 'Patchouli', 'Dark Chocolate'],
      heart: ['Black Orchid', 'Fruity Notes'],
      base: ['Sandalwood', 'Vanilla', 'Incense']
    },
    size: 100,
    inStock: true,
    isLimited: true,
    rating: 4.7,
    reviews: 890,
    tags: ['Luxe', 'Mystérieux', 'Sensuel'],
    year: 2006,
    perfumer: 'David Apel',
    country: 'USA',
    intensity: 'Très Intense',
    longevity: 'Très Long',
    sillage: 'Très Important'
  },
  {
    id: '4',
    name: 'Yves Saint Laurent Libre',
    brand: 'Yves Saint Laurent',
    concentration: 'Eau de Parfum',
    family: 'Floral',
    gender: 'Femme',
    price: 95,
    image: '/parfums/ysl-libre.jpg',
    description: 'Un parfum libre et audacieux, célébrant la féminité moderne.',
    notes: {
      top: ['Lavender', 'Black Currant'],
      heart: ['Orange Blossom', 'Jasmine'],
      base: ['Vanilla', 'Ambergris']
    },
    size: 90,
    inStock: true,
    isNew: true,
    rating: 4.5,
    reviews: 1560,
    tags: ['Moderne', 'Audacieux', 'Féminin'],
    year: 2019,
    perfumer: 'Anne Flipo',
    country: 'France',
    intensity: 'Intense',
    longevity: 'Long',
    sillage: 'Important'
  },
  {
    id: '5',
    name: 'Creed Aventus',
    brand: 'Creed',
    concentration: 'Eau de Parfum',
    family: 'Frais',
    gender: 'Homme',
    price: 320,
    image: '/parfums/creed-aventus.jpg',
    description: 'Un parfum légendaire, alliant fraîcheur d\'ananas et noblesse du bois.',
    notes: {
      top: ['Pineapple', 'Black Currant', 'Apple'],
      heart: ['Rose', 'Jasmine', 'Pink Pepper'],
      base: ['Musk', 'Oakmoss', 'Ambergris']
    },
    size: 100,
    inStock: true,
    rating: 4.9,
    reviews: 3200,
    tags: ['Légendaire', 'Luxe', 'Noble'],
    year: 2010,
    perfumer: 'Olivier Creed',
    country: 'France',
    intensity: 'Intense',
    longevity: 'Très Long',
    sillage: 'Très Important'
  },
  {
    id: '6',
    name: 'Maison Margiela Replica Jazz Club',
    brand: 'Maison Margiela',
    concentration: 'Eau de Toilette',
    family: 'Oriental',
    gender: 'Unisexe',
    price: 110,
    image: '/parfums/margiela-jazz-club.jpg',
    description: 'Une évocation olfactive des clubs de jazz des années 50.',
    notes: {
      top: ['Pink Pepper', 'Lemon', 'Neroli'],
      heart: ['Clary Sage', 'Java Vetiver Oil'],
      base: ['Tobacco Leaf', 'Vanilla Bean', 'Styrax']
    },
    size: 100,
    inStock: true,
    rating: 4.4,
    reviews: 980,
    tags: ['Vintage', 'Jazz', 'Tobacco'],
    year: 2013,
    perfumer: 'Marie Salamagne',
    country: 'Belgium',
    intensity: 'Modéré',
    longevity: 'Moyen',
    sillage: 'Modéré'
  },
  {
    id: '7',
    name: 'Le Labo Santal 33',
    brand: 'Le Labo',
    concentration: 'Eau de Parfum',
    family: 'Boisé',
    gender: 'Unisexe',
    price: 280,
    image: '/parfums/le-labo-santal33.jpg',
    description: 'Un parfum iconique, alliant santal et cuir dans une composition unique.',
    notes: {
      top: ['Violet', 'Cardamom'],
      heart: ['Iris', 'Ambrette'],
      base: ['Sandalwood', 'Leather', 'Ambergris']
    },
    size: 100,
    inStock: true,
    rating: 4.6,
    reviews: 1800,
    tags: ['Iconique', 'Santal', 'Cuir'],
    year: 2011,
    perfumer: 'Frank Voelkl',
    country: 'USA',
    intensity: 'Intense',
    longevity: 'Long',
    sillage: 'Important'
  },
  {
    id: '8',
    name: 'Byredo Gypsy Water',
    brand: 'Byredo',
    concentration: 'Eau de Parfum',
    family: 'Boisé',
    gender: 'Unisexe',
    price: 180,
    image: '/parfums/byredo-gypsy-water.jpg',
    description: 'Un parfum nomade et mystérieux, évoquant la liberté et l\'aventure.',
    notes: {
      top: ['Bergamot', 'Juniper Berries', 'Pepper'],
      heart: ['Incense', 'Orris Root'],
      base: ['Vanilla', 'Sandalwood']
    },
    size: 100,
    inStock: true,
    rating: 4.3,
    reviews: 750,
    tags: ['Nomade', 'Mystérieux', 'Liberté'],
    year: 2008,
    perfumer: 'Jerome Epinette',
    country: 'Sweden',
    intensity: 'Modéré',
    longevity: 'Moyen',
    sillage: 'Modéré'
  }
]

export const parfumStats = {
  totalParfums: 105,
  totalBrands: 45,
  averageRating: 4.6,
  totalReviews: 15600,
  newArrivals: 12,
  limitedEditions: 8
}
