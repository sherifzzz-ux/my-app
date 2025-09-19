// Données de test pour la page Marques

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

export const brands: Brand[] = [
  {
    id: 'chanel',
    name: 'Chanel',
    description: 'Maison de luxe française iconique, créatrice de parfums et cosmétiques d\'exception depuis 1910.',
    logo: '/images/brands/logos/chanel-logo.png',
    banner: '/images/brands/banners/chanel-banner.jpg',
    country: 'France',
    founded: 1910,
    category: ['parfumerie', 'maquillage', 'soin-visage'],
    specialties: ['parfums', 'maquillage', 'soins anti-âge'],
    rating: 4.9,
    productCount: 45,
    isPremium: true,
    isNew: false,
    isPopular: true,
    website: 'https://www.chanel.com',
    socialMedia: {
      instagram: '@chanelofficial',
      facebook: 'Chanel',
      twitter: '@CHANEL'
    },
    featuredProducts: ['1', '2', '3'],
    tags: ['luxe', 'iconique', 'français', 'premium']
  },
  {
    id: 'dior',
    name: 'Dior',
    description: 'Maison de couture française de renommée mondiale, créatrice de parfums et cosmétiques sophistiqués.',
    logo: '/brands/dior-logo.png',
    banner: '/brands/dior-banner.jpg',
    country: 'France',
    founded: 1946,
    category: ['parfumerie', 'maquillage', 'soin-visage'],
    specialties: ['parfums', 'maquillage', 'soins anti-âge'],
    rating: 4.8,
    productCount: 38,
    isPremium: true,
    isNew: false,
    isPopular: true,
    website: 'https://www.dior.com',
    socialMedia: {
      instagram: '@dior',
      facebook: 'Dior',
      twitter: '@Dior'
    },
    featuredProducts: ['4', '5', '6'],
    tags: ['luxe', 'sophistiqué', 'français', 'premium']
  },
  {
    id: 'lancome',
    name: 'Lancôme',
    description: 'Marque française de cosmétiques de luxe, spécialisée dans les soins et le maquillage pour toutes les femmes.',
    logo: '/brands/lancome-logo.png',
    banner: '/brands/lancome-banner.jpg',
    country: 'France',
    founded: 1935,
    category: ['maquillage', 'soin-visage', 'parfumerie'],
    specialties: ['maquillage', 'soins anti-âge', 'parfums'],
    rating: 4.7,
    productCount: 52,
    isPremium: true,
    isNew: false,
    isPopular: true,
    website: 'https://www.lancome.fr',
    socialMedia: {
      instagram: '@lancomeofficial',
      facebook: 'Lancôme',
      twitter: '@Lancome'
    },
    featuredProducts: ['7', '8', '9'],
    tags: ['luxe', 'français', 'premium', 'sophistiqué']
  },
  {
    id: 'la-roche-posay',
    name: 'La Roche-Posay',
    description: 'Marque dermatologique française, spécialisée dans les soins pour peaux sensibles et problématiques.',
    logo: '/brands/la-roche-posay-logo.png',
    banner: '/brands/la-roche-posay-banner.jpg',
    country: 'France',
    founded: 1975,
    category: ['soin-visage', 'bebe-enfant', 'corps-bain'],
    specialties: ['peaux sensibles', 'dermatologie', 'soins apaisants'],
    rating: 4.6,
    productCount: 67,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.laroche-posay.fr',
    socialMedia: {
      instagram: '@larocheposay',
      facebook: 'La Roche-Posay',
      twitter: '@LRP_France'
    },
    featuredProducts: ['10', '11', '12'],
    tags: ['dermatologique', 'sensible', 'français', 'scientifique']
  },
  {
    id: 'avene',
    name: 'Avène',
    description: 'Marque française de soins dermatologiques, utilisant l\'eau thermale d\'Avène pour des soins apaisants.',
    logo: '/brands/avene-logo.png',
    banner: '/brands/avene-banner.jpg',
    country: 'France',
    founded: 1990,
    category: ['soin-visage', 'bebe-enfant', 'corps-bain'],
    specialties: ['eau thermale', 'peaux sensibles', 'soins apaisants'],
    rating: 4.5,
    productCount: 43,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.eau-thermale-avene.fr',
    socialMedia: {
      instagram: '@avene_official',
      facebook: 'Avène',
      twitter: '@Avene_France'
    },
    featuredProducts: ['13', '14', '15'],
    tags: ['eau-thermale', 'sensible', 'français', 'apaisant']
  },
  {
    id: 'mustela',
    name: 'Mustela',
    description: 'Marque française spécialisée dans les soins pour bébé et enfant, avec des produits doux et sûrs.',
    logo: '/brands/mustela-logo.png',
    banner: '/brands/mustela-banner.jpg',
    country: 'France',
    founded: 1950,
    category: ['bebe-enfant'],
    specialties: ['soins bébé', 'hygiène enfant', 'peaux sensibles'],
    rating: 4.7,
    productCount: 28,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.mustela.fr',
    socialMedia: {
      instagram: '@mustela_official',
      facebook: 'Mustela',
      twitter: '@Mustela_France'
    },
    featuredProducts: ['16', '17', '18'],
    tags: ['bébé', 'enfant', 'sûr', 'français']
  },
  {
    id: 'weleda',
    name: 'Weleda',
    description: 'Marque suisse de cosmétiques naturels et bio, utilisant des ingrédients issus de l\'agriculture biodynamique.',
    logo: '/brands/weleda-logo.png',
    banner: '/brands/weleda-banner.jpg',
    country: 'Suisse',
    founded: 1921,
    category: ['soin-visage', 'corps-bain', 'bebe-enfant'],
    specialties: ['cosmétiques bio', 'ingrédients naturels', 'biodynamique'],
    rating: 4.4,
    productCount: 35,
    isPremium: false,
    isNew: false,
    isPopular: false,
    website: 'https://www.weleda.fr',
    socialMedia: {
      instagram: '@weleda_france',
      facebook: 'Weleda France',
      twitter: '@Weleda_France'
    },
    featuredProducts: ['19', '20', '21'],
    tags: ['bio', 'naturel', 'suisse', 'biodynamique']
  },
  {
    id: 'tom-ford',
    name: 'Tom Ford',
    description: 'Marque de luxe américaine créée par le célèbre designer, spécialisée dans les parfums et cosmétiques sophistiqués.',
    logo: '/brands/tom-ford-logo.png',
    banner: '/brands/tom-ford-banner.jpg',
    country: 'États-Unis',
    founded: 2005,
    category: ['parfumerie', 'maquillage'],
    specialties: ['parfums', 'maquillage', 'luxe'],
    rating: 4.8,
    productCount: 22,
    isPremium: true,
    isNew: false,
    isPopular: true,
    website: 'https://www.tomford.com',
    socialMedia: {
      instagram: '@tomfordbeauty',
      facebook: 'Tom Ford Beauty',
      twitter: '@TomFordBeauty'
    },
    featuredProducts: ['22', '23', '24'],
    tags: ['luxe', 'américain', 'sophistiqué', 'premium']
  },
  {
    id: 'hugo-boss',
    name: 'Hugo Boss',
    description: 'Marque allemande de mode et parfums, créatrice de fragrances masculines et féminines contemporaines.',
    logo: '/brands/hugo-boss-logo.png',
    banner: '/brands/hugo-boss-banner.jpg',
    country: 'Allemagne',
    founded: 1924,
    category: ['parfumerie'],
    specialties: ['parfums masculins', 'parfums féminins', 'mode'],
    rating: 4.3,
    productCount: 31,
    isPremium: false,
    isNew: false,
    isPopular: true,
    website: 'https://www.hugoboss.com',
    socialMedia: {
      instagram: '@hugoboss',
      facebook: 'Hugo Boss',
      twitter: '@HugoBoss'
    },
    featuredProducts: ['25', '26', '27'],
    tags: ['allemand', 'mode', 'contemporain', 'masculin']
  },
  {
    id: 'kenzo',
    name: 'Kenzo',
    description: 'Maison de mode française d\'origine japonaise, créatrice de parfums aux notes exotiques et modernes.',
    logo: '/brands/kenzo-logo.png',
    banner: '/brands/kenzo-banner.jpg',
    country: 'France',
    founded: 1970,
    category: ['parfumerie'],
    specialties: ['parfums', 'notes exotiques', 'mode'],
    rating: 4.2,
    productCount: 18,
    isPremium: false,
    isNew: false,
    isPopular: false,
    website: 'https://www.kenzo.com',
    socialMedia: {
      instagram: '@kenzo',
      facebook: 'Kenzo',
      twitter: '@Kenzo'
    },
    featuredProducts: ['28', '29', '30'],
    tags: ['français', 'japonais', 'exotique', 'moderne']
  }
]

export const brandCategories = [
  { id: 'all', name: 'Toutes les marques', count: brands.length },
  { id: 'luxe', name: 'Marques de luxe', count: brands.filter(b => b.isPremium).length },
  { id: 'francaises', name: 'Marques françaises', count: brands.filter(b => b.country === 'France').length },
  { id: 'bio', name: 'Marques bio', count: brands.filter(b => b.tags.includes('bio')).length },
  { id: 'dermatologiques', name: 'Dermatologiques', count: brands.filter(b => b.tags.includes('dermatologique')).length },
  { id: 'bebe', name: 'Bébé & Enfant', count: brands.filter(b => b.category.includes('bebe-enfant')).length }
]

export const countries = [
  { id: 'france', name: 'France', flag: '🇫🇷', count: brands.filter(b => b.country === 'France').length },
  { id: 'suisse', name: 'Suisse', flag: '🇨🇭', count: brands.filter(b => b.country === 'Suisse').length },
  { id: 'allemagne', name: 'Allemagne', flag: '🇩🇪', count: brands.filter(b => b.country === 'Allemagne').length },
  { id: 'etats-unis', name: 'États-Unis', flag: '🇺🇸', count: brands.filter(b => b.country === 'États-Unis').length }
]

export const specialties = [
  { id: 'parfums', name: 'Parfums', count: brands.filter(b => b.specialties.includes('parfums')).length },
  { id: 'maquillage', name: 'Maquillage', count: brands.filter(b => b.specialties.includes('maquillage')).length },
  { id: 'soins-anti-age', name: 'Soins anti-âge', count: brands.filter(b => b.specialties.includes('soins anti-âge')).length },
  { id: 'peaux-sensibles', name: 'Peaux sensibles', count: brands.filter(b => b.specialties.includes('peaux sensibles')).length },
  { id: 'soins-bebe', name: 'Soins bébé', count: brands.filter(b => b.specialties.includes('soins bébé')).length },
  { id: 'cosmetiques-bio', name: 'Cosmétiques bio', count: brands.filter(b => b.specialties.includes('cosmétiques bio')).length }
]
