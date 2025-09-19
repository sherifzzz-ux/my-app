// Données réelles des marques de beauté - Mêmes marques que sur la page d'accueil

export interface Brand {
  id: string
  name: string
  description: string
  logo: string
  banner: string
  country: string
  founded: number
  category: string[]
  specialties: string[]
  rating: number
  productCount: number
  isPremium: boolean
  isNew: boolean
  isPopular: boolean
  website?: string
  socialMedia?: {
    instagram?: string
    facebook?: string
    twitter?: string
  }
  featuredProducts: string[]
  tags: string[]
}

export const realBrands: Brand[] = [
  // MARQUES QUI DÉFILENT SUR LA PAGE D'ACCUEIL
  {
    id: 'cerave',
    name: 'CeraVe',
    description: 'Marque dermatologique américaine, spécialisée dans les soins avec céramides pour tous types de peau.',
    logo: '/images/brands/cerave-logo.png',
    banner: '/images/brands/banners/cerave-banner.jpg',
    country: 'USA',
    founded: 2005,
    category: ['soin-visage', 'parapharmacie'],
    specialties: ['céramides', 'peaux sensibles', 'dermatologie'],
    rating: 4.5,
    productCount: 45,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.cerave.com',
    socialMedia: {
      instagram: '@cerave',
      facebook: 'CeraVe',
      twitter: '@CeraVe'
    },
    featuredProducts: ['1', '2', '3'],
    tags: ['dermatologique', 'céramides', 'peaux sensibles', 'soins']
  },
  {
    id: 'avene',
    name: 'Avène',
    description: 'Marque française de soins dermatologiques, spécialisée dans les peaux sensibles et intolérantes.',
    logo: '/images/brands/avene-logo.png',
    banner: '/images/brands/banners/avene-banner.jpg',
    country: 'France',
    founded: 1990,
    category: ['soin-visage', 'parapharmacie'],
    specialties: ['eau thermale', 'peaux sensibles', 'dermatologie'],
    rating: 4.6,
    productCount: 38,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.eau-thermale-avene.fr',
    socialMedia: {
      instagram: '@avene_official',
      facebook: 'Avène',
      twitter: '@Avene'
    },
    featuredProducts: ['4', '5', '6'],
    tags: ['eau thermale', 'peaux sensibles', 'français', 'dermatologie']
  },
  {
    id: 'nivea',
    name: 'NIVEA',
    description: 'Marque allemande de soins corporels, créatrice de cosmétiques pour toute la famille depuis 1911.',
    logo: '/images/brands/nivea-logo.png',
    banner: '/images/brands/banners/nivea-banner.jpg',
    country: 'Allemagne',
    founded: 1911,
    category: ['corps-bain', 'soin-visage'],
    specialties: ['soins corporels', 'famille', 'accessibilité'],
    rating: 4.3,
    productCount: 67,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.nivea.fr',
    socialMedia: {
      instagram: '@nivea',
      facebook: 'NIVEA',
      twitter: '@NIVEA'
    },
    featuredProducts: ['7', '8', '9'],
    tags: ['soins corporels', 'famille', 'allemand', 'accessible']
  },
  {
    id: 'la-roche-posay',
    name: 'La Roche-Posay',
    description: 'Marque dermatologique française, spécialisée dans les soins pour peaux sensibles et protection solaire.',
    logo: '/images/brands/la-roche-posay-logo.png',
    banner: '/images/brands/banners/la-roche-posay-banner.jpg',
    country: 'France',
    founded: 1975,
    category: ['soin-visage', 'parapharmacie'],
    specialties: ['peaux sensibles', 'dermatologie', 'protection solaire'],
    rating: 4.5,
    productCount: 78,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.laroche-posay.fr',
    socialMedia: {
      instagram: '@larocheposay',
      facebook: 'La Roche-Posay',
      twitter: '@LaRochePosay'
    },
    featuredProducts: ['10', '11', '12'],
    tags: ['dermatologique', 'peaux sensibles', 'français', 'soins']
  },
  {
    id: 'laneige',
    name: 'Laneige',
    description: 'Marque coréenne de soins, pionnière de l\'hydratation et des soins de nuit innovants.',
    logo: '/images/brands/laneige-logo.png',
    banner: '/images/brands/banners/laneige-banner.jpg',
    country: 'Corée du Sud',
    founded: 1994,
    category: ['korean-beauty', 'soin-visage'],
    specialties: ['hydratation', 'soins de nuit', 'k-beauty'],
    rating: 4.7,
    productCount: 34,
    isPremium: true,
    isNew: false,
    isPopular: true,
    website: 'https://www.laneige.com',
    socialMedia: {
      instagram: '@laneige',
      facebook: 'Laneige',
      twitter: '@Laneige'
    },
    featuredProducts: ['13', '14', '15'],
    tags: ['k-beauty', 'hydratation', 'coréen', 'soins de nuit']
  },
  {
    id: 'the-ordinary',
    name: 'The Ordinary',
    description: 'Marque de soins abordable, spécialisée dans les ingrédients actifs purs et efficaces.',
    logo: '/images/brands/the-ordinary-logo.png',
    banner: '/images/brands/banners/the-ordinary-banner.jpg',
    country: 'Canada',
    founded: 2013,
    category: ['soin-visage'],
    specialties: ['ingrédients actifs', 'soins abordables', 'simplicité'],
    rating: 4.3,
    productCount: 67,
    isPremium: false,
    isNew: true,
    isPopular: true,
    website: 'https://www.theordinary.com',
    socialMedia: {
      instagram: '@theordinary',
      facebook: 'The Ordinary',
      twitter: '@TheOrdinary'
    },
    featuredProducts: ['16', '17', '18'],
    tags: ['abordable', 'ingrédients actifs', 'simplicité', 'efficacité']
  },
  {
    id: 'uriage',
    name: 'Uriage',
    description: 'Marque française de soins dermatologiques, spécialisée dans l\'eau thermale d\'Uriage.',
    logo: '/images/brands/uriage-logo.png',
    banner: '/images/brands/banners/uriage-banner.jpg',
    country: 'France',
    founded: 1992,
    category: ['soin-visage', 'parapharmacie'],
    specialties: ['eau thermale', 'dermatologie', 'soins apaisants'],
    rating: 4.4,
    productCount: 42,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.uriage.com',
    socialMedia: {
      instagram: '@uriage_official',
      facebook: 'Uriage',
      twitter: '@Uriage'
    },
    featuredProducts: ['19', '20', '21'],
    tags: ['eau thermale', 'dermatologie', 'français', 'apaisant']
  },
  {
    id: 'klorane',
    name: 'Klorane',
    description: 'Marque française de soins capillaires, spécialisée dans les soins naturels et botaniques.',
    logo: '/images/brands/klorane-logo.png',
    banner: '/images/brands/banners/klorane-banner.jpg',
    country: 'France',
    founded: 1965,
    category: ['cheveux'],
    specialties: ['soins capillaires', 'botanique', 'naturel'],
    rating: 4.2,
    productCount: 56,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.klorane.com',
    socialMedia: {
      instagram: '@klorane',
      facebook: 'Klorane',
      twitter: '@Klorane'
    },
    featuredProducts: ['22', '23', '24'],
    tags: ['cheveux', 'botanique', 'français', 'naturel']
  },
  {
    id: 'loreal',
    name: 'L\'Oréal',
    description: 'Marque de beauté accessible, créatrice de cosmétiques pour toutes les femmes.',
    logo: '/images/brands/loreal-logo.png',
    banner: '/images/brands/banners/loreal-banner.jpg',
    country: 'France',
    founded: 1909,
    category: ['maquillage', 'soin-visage', 'cheveux'],
    specialties: ['maquillage', 'soins', 'coloration cheveux'],
    rating: 4.2,
    productCount: 156,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.loreal-paris.fr',
    socialMedia: {
      instagram: '@lorealparis',
      facebook: 'L\'Oréal Paris',
      twitter: '@LOrealParis'
    },
    featuredProducts: ['25', '26', '27'],
    tags: ['accessible', 'français', 'diversité', 'innovation']
  },
  {
    id: 'vichy',
    name: 'Vichy',
    description: 'Marque française de soins dermatologiques, spécialisée dans les soins anti-âge et la protection solaire.',
    logo: '/images/brands/vichy-logo.png',
    banner: '/images/brands/banners/vichy-banner.jpg',
    country: 'France',
    founded: 1931,
    category: ['soin-visage', 'parapharmacie'],
    specialties: ['anti-âge', 'protection solaire', 'dermatologie'],
    rating: 4.4,
    productCount: 89,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.vichy.fr',
    socialMedia: {
      instagram: '@vichy',
      facebook: 'Vichy',
      twitter: '@Vichy'
    },
    featuredProducts: ['28', '29', '30'],
    tags: ['anti-âge', 'protection solaire', 'français', 'dermatologie']
  },
  {
    id: 'bioderma',
    name: 'Bioderma',
    description: 'Marque française de soins dermatologiques, pionnière de la dermocosmétique et des soins respectueux.',
    logo: '/images/brands/bioderma-logo.png',
    banner: '/images/brands/banners/bioderma-banner.jpg',
    country: 'France',
    founded: 1977,
    category: ['soin-visage', 'parapharmacie'],
    specialties: ['dermocosmétique', 'soins respectueux', 'dermatologie'],
    rating: 4.5,
    productCount: 73,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.bioderma.fr',
    socialMedia: {
      instagram: '@bioderma',
      facebook: 'Bioderma',
      twitter: '@Bioderma'
    },
    featuredProducts: ['31', '32', '33'],
    tags: ['dermocosmétique', 'respectueux', 'français', 'dermatologie']
  },
  {
    id: 'eucerin',
    name: 'Eucerin',
    description: 'Marque allemande de soins dermatologiques, spécialisée dans les soins pour peaux sèches et sensibles.',
    logo: '/images/brands/eucerin-logo.png',
    banner: '/images/brands/banners/eucerin-banner.jpg',
    country: 'Allemagne',
    founded: 1900,
    category: ['soin-visage', 'parapharmacie'],
    specialties: ['peaux sèches', 'dermatologie', 'soins apaisants'],
    rating: 4.3,
    productCount: 61,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.eucerin.fr',
    socialMedia: {
      instagram: '@eucerin',
      facebook: 'Eucerin',
      twitter: '@Eucerin'
    },
    featuredProducts: ['34', '35', '36'],
    tags: ['peaux sèches', 'dermatologie', 'allemand', 'apaisant']
  },
  {
    id: 'garnier',
    name: 'Garnier',
    description: 'Marque française de beauté accessible, spécialisée dans les soins naturels et la coloration.',
    logo: '/images/brands/garnier-logo.png',
    banner: '/images/brands/banners/garnier-banner.jpg',
    country: 'France',
    founded: 1904,
    category: ['cheveux', 'soin-visage'],
    specialties: ['coloration', 'soins naturels', 'accessibilité'],
    rating: 4.1,
    productCount: 98,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.garnier.fr',
    socialMedia: {
      instagram: '@garnier',
      facebook: 'Garnier',
      twitter: '@Garnier'
    },
    featuredProducts: ['37', '38', '39'],
    tags: ['coloration', 'naturel', 'français', 'accessible']
  },
  {
    id: 'maybelline',
    name: 'Maybelline',
    description: 'Marque de maquillage accessible, créatrice de cosmétiques colorés et tendance.',
    logo: '/images/brands/maybelline-logo.png',
    banner: '/images/brands/banners/maybelline-banner.jpg',
    country: 'USA',
    founded: 1915,
    category: ['maquillage'],
    specialties: ['maquillage', 'couleurs tendance', 'accessibilité'],
    rating: 4.1,
    productCount: 89,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.maybelline.com',
    socialMedia: {
      instagram: '@maybelline',
      facebook: 'Maybelline',
      twitter: '@Maybelline'
    },
    featuredProducts: ['40', '41', '42'],
    tags: ['accessible', 'tendance', 'couleurs', 'maquillage']
  },
  {
    id: 'revlon',
    name: 'Revlon',
    description: 'Marque américaine de maquillage, créatrice de cosmétiques audacieux et colorés.',
    logo: '/images/brands/revlon-logo.png',
    banner: '/images/brands/banners/revlon-banner.jpg',
    country: 'USA',
    founded: 1932,
    category: ['maquillage'],
    specialties: ['maquillage', 'couleurs audacieuses', 'innovation'],
    rating: 4.0,
    productCount: 67,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.revlon.com',
    socialMedia: {
      instagram: '@revlon',
      facebook: 'Revlon',
      twitter: '@Revlon'
    },
    featuredProducts: ['43', '44', '45'],
    tags: ['maquillage', 'audacieux', 'américain', 'couleurs']
  },
  {
    id: 'mac',
    name: 'MAC',
    description: 'Marque de maquillage professionnel, créatrice de cosmétiques haute performance pour tous les tons de peau.',
    logo: '/images/brands/mac-logo.png',
    banner: '/images/brands/banners/mac-banner.jpg',
    country: 'Canada',
    founded: 1984,
    category: ['maquillage'],
    specialties: ['maquillage professionnel', 'fond de teint', 'rouge à lèvres'],
    rating: 4.5,
    productCount: 89,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.maccosmetics.com',
    socialMedia: {
      instagram: '@maccosmetics',
      facebook: 'MAC Cosmetics',
      twitter: '@MACcosmetics'
    },
    featuredProducts: ['46', '47', '48'],
    tags: ['maquillage', 'professionnel', 'diversité', 'performance']
  }
]

export const brandCategories = [
  {
    id: 'soin-visage',
    name: 'Soin du Visage',
    description: 'Marques spécialisées en soins dermatologiques',
    icon: '✨',
    color: 'text-blue-500',
    count: 8
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    description: 'Marques spécialisées en cosmétiques',
    icon: '💄',
    color: 'text-pink-500',
    count: 4
  },
  {
    id: 'cheveux',
    name: 'Cheveux',
    description: 'Marques spécialisées en soins capillaires',
    icon: '💇‍♀️',
    color: 'text-purple-500',
    count: 2
  },
  {
    id: 'parapharmacie',
    name: 'Parapharmacie',
    description: 'Marques dermatologiques et santé',
    icon: '🏥',
    color: 'text-green-500',
    count: 8
  },
  {
    id: 'korean-beauty',
    name: 'K-Beauty',
    description: 'Marques coréennes de beauté',
    icon: '🇰🇷',
    color: 'text-red-500',
    count: 1
  },
  {
    id: 'corps-bain',
    name: 'Corps & Bain',
    description: 'Marques de soins corporels',
    icon: '🛁',
    color: 'text-indigo-500',
    count: 1
  }
]

export const countries = [
  { name: 'France', count: 8, flag: '🇫🇷' },
  { name: 'USA', count: 3, flag: '🇺🇸' },
  { name: 'Allemagne', count: 2, flag: '🇩🇪' },
  { name: 'Canada', count: 2, flag: '🇨🇦' },
  { name: 'Corée du Sud', count: 1, flag: '🇰🇷' }
]

export const specialties = [
  'Dermatologie',
  'Peaux sensibles',
  'Céramides',
  'Eau thermale',
  'Soins corporels',
  'Hydratation',
  'Ingrédients actifs',
  'Soins capillaires',
  'Maquillage professionnel',
  'Anti-âge',
  'Protection solaire',
  'Dermocosmétique',
  'Coloration',
  'K-Beauty'
]