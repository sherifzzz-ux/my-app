// Données de test pour les promotions

export interface Promotion {
  id: string
  title: string
  description: string
  image: string
  discount: number
  originalPrice: number
  salePrice: number
  endDate: string
  category: string
  isActive: boolean
  products?: string[] // IDs des produits concernés
}

export const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Black Friday',
    description: 'Jusqu\'à -70% sur toute la sélection beauté. Ne ratez pas cette occasion unique !',
    image: '/images/promotions/black-friday.jpg',
    discount: 70,
    originalPrice: 100,
    salePrice: 30,
    endDate: '2024-12-31T23:59:59',
    category: 'toutes-categories',
    isActive: true,
    products: ['1', '2', '3', '4', '5']
  },
  {
    id: '2',
    title: 'Soins du Visage',
    description: 'Offre spéciale sur tous les soins du visage. Des produits de qualité à prix réduits.',
    image: '/images/promotions/soins-visage.jpg',
    discount: 50,
    originalPrice: 80,
    salePrice: 40,
    endDate: '2024-12-25T23:59:59',
    category: 'soin-du-visage',
    isActive: true,
    products: ['1', '2', '3']
  },
  {
    id: '3',
    title: 'Maquillage',
    description: 'Collection maquillage à prix cassés. Révélez votre beauté avec nos produits premium.',
    image: '/images/promotions/maquillage.jpg',
    discount: 40,
    originalPrice: 60,
    salePrice: 36,
    endDate: '2024-12-20T23:59:59',
    category: 'maquillage',
    isActive: true,
    products: ['1', '2', '3', '4']
  },
  {
    id: '4',
    title: 'Parfums de Luxe',
    description: 'Découvrez nos parfums de luxe avec une réduction exceptionnelle.',
    image: '/images/promotions/parfums.jpg',
    discount: 30,
    originalPrice: 120,
    salePrice: 84,
    endDate: '2024-12-15T23:59:59',
    category: 'parfumerie',
    isActive: true,
    products: ['1', '2']
  },
  {
    id: '5',
    title: 'Coffrets Cadeaux',
    description: 'Coffrets cadeaux parfaits pour les fêtes. Idéal pour offrir ou se faire plaisir.',
    image: '/images/promotions/coffrets.jpg',
    discount: 25,
    originalPrice: 150,
    salePrice: 112.50,
    endDate: '2024-12-10T23:59:59',
    category: 'idees-cadeaux',
    isActive: true,
    products: ['1', '2', '3']
  }
]

export const promotionCategories = [
  {
    id: 'toutes-categories',
    name: 'Toutes les catégories',
    icon: '🎯',
    count: 1
  },
  {
    id: 'soin-du-visage',
    name: 'Soin du visage',
    icon: '✨',
    count: 1
  },
  {
    id: 'maquillage',
    name: 'Maquillage',
    icon: '💄',
    count: 1
  },
  {
    id: 'parfumerie',
    name: 'Parfumerie',
    icon: '🌸',
    count: 1
  },
  {
    id: 'idees-cadeaux',
    name: 'Idées cadeaux',
    icon: '🎁',
    count: 1
  }
]

// Fonction pour calculer le temps restant
export function getTimeRemaining(endDate: string) {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - now.getTime()

  if (diff <= 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { expired: false, days, hours, minutes, seconds }
}

// Fonction pour formater le temps restant
export function formatTimeRemaining(endDate: string) {
  const time = getTimeRemaining(endDate)
  
  if (time.expired) return 'Expiré'
  
  if (time.days > 0) return `${time.days}j ${time.hours}h`
  if (time.hours > 0) return `${time.hours}h ${time.minutes}m`
  return `${time.minutes}m ${time.seconds}s`
}
